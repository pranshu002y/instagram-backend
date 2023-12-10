
const userModel = require("../models/userModel");
const postModel = require("../models/postModel");
const asyncHandler = require("express-async-handler")


const getUserbyid = asyncHandler(async (req, res) => {
    const {userName} = req.body;
    const user = await userModel.findOne({userName:userName})
    if(user){
        const {_id,fullname,userName,gender,privateAccount,ppLink,bio,followersId,followingId} = user
        if(privateAccount){
            res.status(200).json({
                _id,
                fullname,
                userName,
                gender,
                privateAccount,
                ppLink,
                bio
            })
        }else{
            res.status(200).json({
                _id,
                fullname,
                userName,
                gender,
                privateAccount,
                ppLink,
                bio,
                followersId,
                followingId
            })
        }
    }else{
        res.status(400)
        throw new Error("User not found")
    }
})



   const getallUser = async(req,res)=>{
    try{
     const User = await userModel.find({});
     res.status(200).json(User);
    }
    catch(err){
   res.status(400).json({message: "not able to find user"});
    }
   };


module.exports = { getallUser,getUserbyid};
