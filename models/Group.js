const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Group schema

const GroupSchema = new Schema({
    groupId: {
        type: String,
    
    },
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    creatorId:{
         type: String, 
         
    },
    posts: {
        type: Array,
    },
    members:{
        type: Array
    }
},
{
    // For createdAt and updatedAt timestamps
    timestamps: true
  });


module.exports = Group = mongoose.model('group', GroupSchema);