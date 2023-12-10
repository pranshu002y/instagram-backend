const AuthService = require('../services/auth.service')
const AuthServiceInstance = new AuthService()
const postModel = require("../models/postModel")
const userModel = require("../models/userModel")
const upload = async (req,res) =>{
    const {image_url,userName} = req.body;
    try{
      const image = await AuthServiceInstance.
      upload(image_url,userName);
      res.json(image);
    }
    catch (err) {
      console.log(err.message);
      res.status(500).send("Error in creating image");
    }
    console.log(req.body);
  }



// Controller to get all images
const uploadget = async (req, res) => {
  try {
    const images = await postModel.find({});
    
    if (!images || images.length === 0) {
      return res.status(404).json({ message: "No images found" });
    }

    res.status(200).json(images);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



const getUserImages = async (req, res) => {
    try {
      // Assuming you have user information available in req.user (e.g., set by authentication middleware)
      if (!req.user || !req.user._id) {
        return res.status(401).json({ message: 'User not authenticated' });
      }
  
      const userId = req.user._id;
  
      // Fetch images associated with the logged-in user
      const userImages = await postModel.find({ userName: userId });
  
      if (!userImages || userImages.length === 0) {
        return res.status(404).json({ message: 'No images found for the logged-in user' });
      }
  
      res.status(200).json(userImages);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  

  module.exports = {upload,uploadget,getUserImages};