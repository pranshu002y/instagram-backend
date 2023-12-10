const express = require("express");
const cookieParser = require("cookie-parser");
const connectDatabase = require("./configDatabase/dbconnection");

const  userRoute  = require('./routes/userRoutes');

const PORT = process.env.PORT || 5000
const cors = require("cors")

const app = express();
app.use(cookieParser());

app.use(cors())
app.use(express.json())
connectDatabase()

app.post('/demo', (req, res)=>{
    console.log(req.body, 'hi')
    res.send(req.body)
})

app.use("/api/user", userRoute)

app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));