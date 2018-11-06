const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create user schema

const UserSchema = new Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    dateAdded: {
        type: Date,
        default: Date.now
    }

});

module.exports = User = mongoose.model('user', UserSchema);