const express = require('express');
const router = express.Router();

// User model
const User = require('../../models/User');

// UserSession model
const UserSession = require('../../models/UserSession');

    /*
     * Sign up
     * @route POST api/users/account/signup
     * @desc Create new user
     * @access public
     */
    router.post('/account/signup', (req, res, next) => {
      const { body } = req;
      const {
        password,
        firstName,
        lastName,
        role

      } = body;
      let {
        email
      } = body;
      
      if (!email) {
        return res.send({
          success: false,
          message: 'Error: Email cannot be blank.'
        });
      }
      if (!password) {
        return res.send({
          success: false,
          message: 'Error: Password cannot be blank.'
        });
      }
      email = email.toLowerCase();
      email = email.trim();

      // Steps:
      // 1. Verify email doesn't exist
      // 2. Save

      User.find({
        email: email
      }, (err, previousUsers) => {
        if (err) {
          return res.send({
            success: false,
            message: 'Error: Server error'
          });
        } else if (previousUsers.length > 0) {
          return res.send({
            success: false,
            message: 'Error: Account already exist.'
          });
        }

        // Save the new user
        const newUser = new User();
        newUser.email = email;
        newUser.firstName = firstName;
        newUser.lastName = lastName;
        newUser.role = role;
        newUser.password = newUser.generateHash(password);
        newUser.save((err, user) => {
          if (err) {
            return res.send({
              success: false,
              message: err

            });
          }
          return res.send({
            success: true,
            message: 'Signed up',
            user: newUser
          });
        });
      });
    }); // end of sign up endpoint


        /*
     * Get all Staff members
     * @route GET api/users/staff
     * @desc Get all staff
     * @access public
     */


    router.get('/staff', (req, res) => {
      User.find()
      .sort({ createdAt: -1 })
      .then( users => {
      
        res.json(users)
      })
  });
  




        /*
     * Sign up
     * @route POST api/users/account/signup
     * @desc Create new user
     * @access public
     */
    router.put('/account/update_profile/:id', (req, res, next) => {
      const { body } = req;
      
      let {
        email
      } = body;
      

      if(email){

        email = email.toLowerCase();
        email = email.trim();
      


      // Steps:
      // 1. Verify email doesn't exist
      // 2. Save

      User.find({
        email: email
      }, (err, previousUsers) => {
        if (err) {
          return res.send({
            success: false,
            message: 'Error: Server error'
          });
        } else if (previousUsers.length > 0 && previousUsers._id != req.params.id) {
          return res.send({
            success: false,
            message: 'Error: Email is already taken.'
          });
        }

 

 
      });
    }


    User.findByIdAndUpdate(
      // the id of the item to find
      req.params.id,
      
      // the change to be made. Mongoose will smartly combine your existing 
      // document with this change, which allows for partial updates too
      body,
      
      // an option that asks mongoose to return the updated version 
      // of the document instead of the pre-updated one.
      {new: true},
      
      // the callback function
      (err, user) => {
      // Handle any possible database errors
          if (err) return res.status(500).send(err);
          return res.send({
            success: true,
            user
          });
      }
  )

    }); // end of update endpoint


    /*
     * Sign in
     * @route POST api/users/account/signin
     * @desc Login in to an existing account
     * @access public
     */

    router.post('/account/signin', (req, res, next) => {
        const { body } = req;
        const {
          password
        } = body;
        let {
          email
        } = body;
        if (!email) {
          return res.send({
            success: false,
            message: 'Error: Email cannot be blank.'
          });
        }
        if (!password) {
          return res.send({
            success: false,
            message: 'Error: Password cannot be blank.'
          });
        }
        email = email.toLowerCase();
        email = email.trim();
        User.find({
          email
        }, (err, users) => {
          if (err) {
            console.log('err 2:', err);
            return res.send({
              success: false,
              message: 'Error: server error'
            });
          }
          if (users.length != 1) {
            return res.send({
              success: false,
              message: 'Error: Invalid'
            });
          }

          // Invalid password
          const user = users[0];
          if (!user.validPassword(password)) {
            return res.send({
              success: false,
              message: 'Error: Invalid password'
            });
          }
          // Otherwise correct user
          const userSession = new UserSession();
          userSession.userId = user._id;
          userSession.save((err, session) => {
            if (err) {
              console.log(err);
              return res.send({
                success: false,
                message: 'Error: server error'
              });
            }

            const{ firstName, lastName, _id, role} = user;

            let name = firstName+' '+lastName;
            let userId = _id;
            // Valid email and password
            return res.send({
              success: true,
              message: 'Valid sign in',
              name,
              role,
              userId,
              token: session._id
            });
          });
        });
      }); // end of sign in endpoint


    /*
     * Log out
     * @route POST api/users/account/logout
     * @desc Log out and destroy current session
     * @access Auth
     */

      router.get('/account/logout', (req, res, next) => {
        // Get the token
        const { query } = req;
        const { token } = query;
        // ?token=test
        // Verify the token is one of a kind and it's not deleted.
        UserSession.findOneAndUpdate({
          _id: token,
          isDeleted: false
        }, {
          $set: {
            isDeleted:true
          }
        }, null, (err, sessions) => {
          if (err) {
            console.log(err);
            return res.send({
              success: false,
              message: 'Error: Server error'
            });
          }
          return res.send({
            success: true,
            message: 'Logout successful'
          });
        });
      }); // end of logout endpoint


    /*
     * Verify token
     * @route GET api/users/account/verify
     * @desc verify token
     * @access Public/Auth
     */

      router.get('/account/verify', (req, res, next) => {
        // Get the token
        const { query } = req;
        const { token } = query;

        // ?token=test
        // Verify the token is one of a kind and it's not deleted.
        UserSession.find({
          _id: token,
          isDeleted: false
        }, (err, sessions) => {
          if (err) {
            console.log(err);
            return res.send({
              success: false,
              message: 'Error: Server error'
            });
          }
          if (sessions.length != 1) {
            return res.send({
              success: false,
              message: 'Error: Invalid'
            });
          } else {
            // DO ACTION
            return res.send({
              success: true,
              message: 'Good'
            });
          }
        });
      }); // end of verify token endpoint


      // @route GET api/users/:id
      // @desc Get single user

      // TODO
      // @access Auth

      router.get('/:id', (req, res) => {
        User.findById(req.params.id)
            .then( user => res.json(user))
      }); // end of get user endpoint


      //@route G

      router.get('/register/:userId/redirect',(req, res) =>{

        const userSession = new UserSession();
        userSession.userId = req.params.userId;
        userSession.save((err, session) => {
          if (err) {
            console.log(err);
            return res.send({
              success: false,
              message: 'Error: server error'
            });
        }
        return res.send({
          success: true,
          token: session._id
        });
      }
    )});


    module.exports = router;