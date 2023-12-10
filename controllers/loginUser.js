const AuthService = require("../services/auth.service");
const AuthServiceInstance = new AuthService()

const loginUser = async (req,res)=> {
    const { userName , password} = req.body;
    try{
        const newUser = await AuthServiceInstance.loginUser(userName,password)
        res.json(newUser)
    }
    catch(err){
        console.log(err.message);
        res.status(500).send("err in logging");
    }
};
module.exports = loginUser;