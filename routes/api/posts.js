const express = require('express');

const router = express.Router();

// User model
const Post = require('../../models/Post');

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

    // Create new user in memory
    const newPost = new Post({
        title: req.body.title,
        content: req.body.content
    });

    // Save newly created post in the DB
    newPost.save().then( post => res.json(post));
});

// @route PUT api/post
// @desc Update post
// @access public

router.put('/:id',(req,res) => {
    let updatedPost = req.body; 
    Post.findOneAndUpdate(req.body.id, updatedPost, { new:true }, (err,post) => {
      if(err){
      return res.json({'success':false,'message':'Something went wrong','error':err});
      }
      console.log(post);
      return res.json({'success':true,'message':'Post updated successfully', post});
    })
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

module.exports = router;

