const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const User = require('./User');

// Create Post schema

const PostSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    author:[{ type: Schema.Types.ObjectId, ref: 'User' }]
    ,
  

    // comments  : [Comments], 
    // meta      : {
    //       votes : Number
    // }
},
{
    timestamps: true
  });


module.exports = Post = mongoose.model('post', PostSchema);