const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const { validateSignupData } = require("../middleware/userValidation");


const {getallUser} = require("../controllers/users")
const {upload} = require("../controllers/upload")
const {uploadget} = require("../controllers/upload")
const {getUserImages} = require("../controllers/upload")

const {getUserbyid} = require("../controllers/users")



const signupUser = require("../controllers/signUp")
const loginUser = require("../controllers/loginUser");


router.post("/register", validateSignupData, signupUser);
router.post("/login", loginUser);


router.get('/getuserall', getallUser);

router.get("/me",getUserbyid);

router.post("/upload/post",upload)
router.get("/upload/post/get",uploadget)
router.get("/post",getUserImages)




module.exports = router;