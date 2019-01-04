const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
  name: {
    type: String
  },
  path:{
      type: String
  },
  timestamp: {
    type: Date,
    default: Date.now()
  }
})
module.exports = mongoose.model('file', FileSchema);