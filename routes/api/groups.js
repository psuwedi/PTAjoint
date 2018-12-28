const express = require('express');
const router = express.Router();

// Group model
const Group = require('../../models/Group');


//Post model

const Post = require('../../models/Post');



    /*
     * Create Group
     * @route POST api/groups
     * @desc Create new group
     * @access Auth - Admin
     */
    router.post('/', (req, res, next) => {
      const { body } = req;
      const {
        description,
      } = body;

     let { name } = body;
      
      if (!name) {
        return res.send({
          success: false,
          message: 'Error: Group name cannot be blank.'
        });
      }
      if (!description) {
        return res.send({
          success: false,
          message: 'Error: Group description cannot be blank.'
        });
      }
      

      // Steps:
      // 1. Verify group with similar name doesn't already exist
      // 2. Save

      Group.find({
        name
      }, (err, previousGroup) => {
        if (err) {
          return res.send({
            success: false,
            message: 'Error: Server error'
          });
        } else if (previousGroup.length > 0) {
          return res.send({
            success: false,
            message: 'Error: Another group with the exact same name already exists.'
          });
        }

        // persist the new group
        const group = new Group();
        group.name = name;
        group.description = description;
        
        group.save((err, newGroup) => {
          if (err) {
            return res.send({
              success: false,
              message: err
            });
          }
          return res.send({
            success: true,
            message: 'Group created successfully',
            newGroup
          });
        });
      });
    }); // end of create group endpoint


    /*
     * Retrieve posts in group
     * @route GET api/groups/:id/posts
     * @desc retrieve posts in a group
     * @access Public/Auth
     */

        router.get('/:id/posts', (req, res) => {

            let groupIds = [];
            let groupPosts = [];

            Group.findById(req.params.id)
                .then( group => {
                  
                  // if(group.posts.length>0){

                  groupIds = group.posts;
                  

                  groupIds.forEach((postId, i) => {
   
                    Post.findById( postId, (err, post) => { 
                    // console.log("Post to be pushed: "+ post);
                    groupPosts.push(post); 
                    
                    console.log("Group posts after pushing new post: "+groupPosts.length);
 
                    });
                  });
                  
                  return res.send({
                    success: true,
                    groupPosts,
                    groupIds,
                   
                    
                  });
                
                      
                })

          }); // end of get group endpoint 


        /*
     * Retrieve all groups
     * @route GET api/groups
     * @desc retrieve all groups
     * @access Public/Auth
     */

    router.get('/', (req, res) => {
        Group.find()
        .sort({ createdAt: -1 })
        .then( groups => res.json(groups))
    });
     // end of get groups endpoint 

          
    /*
     * Retrieve members in group
     * @route GET api/groups/:id/members
     * @desc retrieve members in a group
     * @access Public/Auth
     */

        router.get('/:id/members', (req, res) => {
            Group.findById(req.params.id)
                .then( group => res.json(group.members))
          }); // end of get group members endpoint 


      // @route GET api/groups/:id/posts
      // @desc Get single group

      // TODO
      // @access Auth

      router.get('/:id', (req, res) => {
        Group.findById(req.params.id)
            .then( group => res.json(group))
      }); // end of get group endpoint

            
      //Sub to a specific group

      router.post('/:id/sub/:userId', (req, res) =>{

        const { id, userId } = req.params;
         if(id && userId){
           Group.findById(id)
             .then( group => {
                group.members.push(userId); 

                group.save((err, newGroup) => {
                    if (err) {
                      return res.send({
                        success: false,
                        message: err
                      });
                    }
                return res.json(group);
            })
         }
             )}});

    module.exports = router;