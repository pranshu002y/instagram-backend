require("dotenv").config();
const mongoose = require("mongoose");

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  const connectDatabase = async ()=>{
    try{
        await mongoose.connect(process.env.DB_URI,connectionParams);
        console.log("data base connected ");
    }
    catch(err){
        console.log(err);
        throw err;
    }
  }

  module.exports = connectDatabase;