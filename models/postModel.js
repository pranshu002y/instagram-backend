
const mongoose = require('mongoose');
const userModel = require("../models/userModel")

// Define the Post Schema
const postModel = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userModel', // Reference to the User model
  },

  image_url: {
    type: String,
    
  }
  ,
  userName:{
    type:String
  },
})

const post = mongoose.model('post', postModel);
module.exports = post;
