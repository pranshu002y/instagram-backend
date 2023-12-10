const AuthService = require("../services/auth.service");
const AuthServiceInstance = new AuthService()

const signupUser = async (req, res) => {
  const { fullname, userName, email, password, bio, gender } = req.body;

  try {
    const newUser = await AuthServiceInstance.signupUser(
      fullname,
      userName,
      email,
      password,
      bio,
      gender
    );
    res.json(newUser);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error in creating account");
  }
};

module.exports = signupUser;


