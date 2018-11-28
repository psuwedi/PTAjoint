const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Create Post schema

const PostSchema = new Schema({
    postId: {
        type: String,
    
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