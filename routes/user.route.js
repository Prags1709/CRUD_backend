const express = require("express")
const {UserModel} = require("../modul/aut.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
//require('dotenv').config()

const userRouter = express.Router()

userRouter.post("/reg",async (req,res)=>{
    const {name,email,pass,age} = req.body
    try {
        bcrypt.hash(pass, 4,async (err, secure_pass)=> {
            if(err){
                console.log(err);
            }else{
                const user = new UserModel({name,email,pass:secure_pass,age})
                await user.save()
                res.send("regester")
            }
        });
        
    } catch (error) {
        res.send("error in registering the user");
        console.log(error);
    }
   
})

userRouter.post("/login",async (req,res)=>{
    const {email,pass} = req.body
    try {
        const user = await UserModel.find({email})
        const hashed_pass = user[0].pass;
        if(user.length>0){
            bcrypt.compare(pass, hashed_pass, (err, result)=> {
                if(result){
                    //token
                    //1.default algo HMAC SHA256
                    //2.payload { course: 'backend' }
                    //3.secret key "masai"
                    const token = jwt.sign({ userID:user[0]._id }, 'masai');
                    res.send({"msg":"Login Successfull","token":token})  
                }else{
                    res.send("Wrong credential")
                    //console.log(err);
                }
            });
        } else {
            res.send("Wrong credential")
        }
    } catch (error) {
        console.log(error)
        res.send("something went error")
    }
})

module.exports = {userRouter}