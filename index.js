const express = require("express")
const {connection} = require("./config/db")
const {userRouter} = require("./routes/user.route")
const {noteRouter} = require("./routes/note.route")
const {authenticate} = require("./middleware/authenticate.middleware")
const cors = require("cors")
require('dotenv').config()

const app = express()
app.use(cors({
    origin:"*"
}))
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("welcome")
})

app.use("/users",userRouter)
app.use(authenticate)
app.use("/notes",noteRouter)

app.listen(process.env.port,async ()=>{
    try {
        await connection
        console.log("Connection DB done");
    } catch (error) {
        console.log("Trouble connection error");
        console.log(error);
    }
    console.log(`running at port ${process.env.port}`);
})