const express = require('express');

const router = express.Router();

// Post model
const Post = require('../../models/Post');

const Group = require('../../models/Group');

// @route GET api/posts
// @desc Get all posts

// TODO
// @access Auth

router.get('/', (req, res) => {
    Post.find()
    .sort({ createdAt: -1 })
    .then( posts => res.json(posts))
});


// @route GET api/posts/:id
// @desc Get single post

// TODO
// @access Auth

router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then( post => res.json(post))
});


// @route POST api/post
// @desc Create new post
// @access public

router.post('/', (req, res) => {

    // Create new post in memory

    let tags = req.body.tags;

    const newPost = new Post({
        title: req.body.title,
        content: req.body.content,
        tags,
        userId: req.body.userId
    });

    // Save newly created post in the DB
    newPost.save().then( post => res.json(post)).catch(err => console.log("Error saving post, please try again"));
    if(tags.length>0){

        tags.forEach((tag, index) => {
            Group.findById(tag)
            .then( group => {
              // if(group.posts){
                
                group.posts.push(newPost._id);
                group.save()
                .catch( err => console.log("Error saving tag"));

                return res.send({
                  success: true,
                  message: "post tags successfully  saved",
                  posts: newPost
                });

              // } else{
                return res.send({
                  success: false,
                  message: "Something went wrong, please try again."
                });
              // }
            }).catch( err => console.log("Error fecthing group data"))
        });
    }
});



// @route PUT api/post
// @desc Like post
// @access Auth



router.put('/:id/like', (req, res, next) => {
  const { body } = req;
  

  // Steps:
  // 1. Verify email doesn't exist
  // 2. Save
Post.findByIdAndUpdate(
  // the id of the item to find
  req.params.id,
  
  // the change to be made. Mongoose will smartly combine your existing 
  // document with this change, which allows for partial updates too
  body,
  
  // an option that asks mongoose to return the updated version 
  // of the document instead of the pre-updated one.
  {new: true},
  
  // the callback function
  (err, post) => {
  // Handle any possible database errors
      if (err) return res.status(500).send(err);
      return res.send({
        success: true,
        post
      });
  }
)

}); // end of update endpoint





// @route PUT api/post
// @desc Update post
// @access public

router.put('/:id',(req,res) => {
    let updatedPost = req.body; 



  Post.findByIdAndUpdate(

  // the id of the item to find
  req.params.id,
  
  // the change to be made. Mongoose will smartly combine the existing 
  // post with this change, which allows for partial updates too
  updatedPost,
  
  // an option that asks mongoose to return the updated version 
  // of the post instead of the pre-updated one.
  {new: true},
  
  // the callback function
  (err, post) => {
  // Handle any possible database errors
      if (err) return res.status(500).send(err);
      return res.send({
        success: true,
        post
      });
  }
)
});


// @route DELETE api/posts
// @desc Delete a post

// TODO 
// @access Auth

router
.delete('/:id', (req, res) => {

    // find and delete post
    Post.findById(req.params.id)
     .then( post => post.remove().then( () => res.json({success: true})))
     .catch( err => res.status(404).json({ success: false}));
});




router.put('/:id/comment', (req, res, next) => {
  const { body } = req;

 

Post.findByIdAndUpdate(
  // the id of the item to find
  req.params.id,
  
  // the change to be made. Mongoose will smartly combine your existing 
  // document with this change, which allows for partial updates too
  body,
  
  // an option that asks mongoose to return the updated version 
  // of the document instead of the pre-updated one.
  {new: true},
  
  // the callback function
  (err, post) => {
  // Handle any possible database errors
      if (err) return res.status(500).send(err);
      return res.send({
        success: true,
        post
      });
  }
)

}); // end of update endpoint

module.exports = router;

