const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const User = require('./User');

// Create Post schema

const PostSchema = new Schema({
    postId: {
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    userId:{
         type: String, 
         required: true
    },
    viewCount: {
        type: Number,
        default: 0
    }
},
{
    // For createdAt and updatedAt timestamps
    timestamps: true
  });


module.exports = Post = mongoose.model('post', PostSchema);