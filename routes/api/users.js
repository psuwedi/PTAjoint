const express = require('express');

const router = express.Router();

// User model
const User = require('../../models/User');

// @route GET api/users
// @desc Get all users

// TODO
// @access Auth

router.get('/', (req, res) => {
    User.find()
        .sort({ date: -1 })
        .then( users => res.json(users))
});

// @route POST api/users
// @desc Create new user
// @access public

router.post('/', (req, res) => {

    // Create new user in memory
    const newUser = new User({
        name: req.body.name
    });

    // Save newly created user in the DB
    newUser.save().then( user => res.json(user));
});

// @route DELETE api/users
// @desc Delete a user

// TODO 
// @access Auth

router
.delete('/:id', (req, res) => {

    // find and delete user
    User.findById(req.params.id)
     .then( user => user.remove().then( () => res.json({success: true})))
     .catch( err => res.status(404).json({ success: false}));
});

module.exports = router;

