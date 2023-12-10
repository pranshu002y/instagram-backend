const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const postModel = require("../models/postModel");
class AuthService {

  signupUser = async(fullname,userName,email,password,bio,gender) =>{
        try{
            let user = await User.findOne({userName});
            if(user){
                return{error:"existing accout"};
            }
            user = new User({
                fullname,userName,email,password,gender,bio
            });

            const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      const token = this.generateToken(user.id);
      return { token };
    } catch (err) {
      console.error(err.message);
      return { error: 'Error in creating account' };
    }
  };

  loginUser = async (userName, password) => {
    try {
      let user = await User.findOne({ userName });
      if (!user) {
        {
          error: "user not found , kindly signup";
        }
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return { error: "Incorrect Password" };
      }

      const token = this.generateToken(user.id);
      return { user };
      // return {token};
    } catch (err) {
      console.error(err.message);
      return { error: "Error in login" };
    }
  };



  upload = async (image_url,userName) => {
    try {
      
      let existingProduct = await postModel.findOne({ image_url });
  
      if (existingProduct) {
        return { error: 'Image already exists.' };
      }
  
      
      const upload = new postModel({
        image_url,userName
      });
  
      await upload.save();
  
      return { success: 'Image created successfully.' };
    } catch (err) {
      console.error(err.message);
      return { error: 'Error in creating image' };
    }
 
  };



  generateToken = (userId) => {
    const payload = {
      user: {
        id: userId,
      },
    };
    return jwt.sign(payload, process.env.JWT_STRING, {
      expiresIn: 3600, // 1 hour (adjust as needed)
    });
  };
}

module.exports = AuthService;
