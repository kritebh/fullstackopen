const User = require("../models/user")
const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const {info,error} = require("../utils/logger")
userRouter.post("/",async (req,res,next)=>{
    try{

        let {username,password,name}= req.body

        if(username.length<3 || password.length<3){
            return res.status(400).send({error:"username or password must be atleast 3 character long"})
        }

        const saltRounds = 8
        const passwordHash = await bcrypt.hash(password,saltRounds)
        let newUser = await User.create({username,name,password:passwordHash});
        info(newUser)
        res.send(newUser)
    }
    catch(err){
        // error(err)
        next(err)
    }

})

userRouter.get("/",async(req,res,next)=>{
    try{
        let allUsers = await User.find({})
        res.send(allUsers)
    }
    catch(err){
        // error(err)
        next(err)
    }
})

module.exports = userRouter