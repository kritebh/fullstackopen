const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require("../models/user")

loginRouter.post('/',async(req,res,next)=>{
    let {username,password} = req.body

    const user = await User.findOne({username:username})
    const isPasswordCorrect = user ===null ? false: await bcrypt.compare(password,user.password)

    if(!(user && isPasswordCorrect)){
        return res.status(401).json({
            error: 'invalid username or password'
        })
    }

    let userForToken = {
        username:user.username,
        id:user._id
    }

    let token = jwt.sign(userForToken,process.env.SECRET) //TODO: add expiry of token

    res.send({token,username:user.username,name:user.name})

})

module.exports = loginRouter