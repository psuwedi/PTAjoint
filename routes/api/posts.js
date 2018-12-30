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

router.put('/:id/like',(req,res) => {
  let updatedPost = req.body; 
  Post.findOneAndUpdate(req.body.id, updatedPost, { new:true }, (err,post) => {
    if(err){
    return res.json({'success':false,'message':'Something went wrong','error':err});
    }
    // console.log(post);
    return res.json({'success':true,'message':'Post updated successfully', post});
  })
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

