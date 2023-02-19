const logger = require("./logger")
const User = require("../models/user")
const jwt = require("jsonwebtoken")
const {error} = require("./logger")
const errorHandler = (error, request, response, next) => {
    logger.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    }
    else if(error.code===11000){
      return response.status(400).send({error:"user already exist"})
    }
    next(error)
  }

const tokenExtractor = (request,response,next)=>{
  let authorization = request.get('authorization')
  let token = null;
  if(authorization && authorization.startsWith('Bearer ')){
     token = authorization.replace('Bearer ','')
     request.token = token
  }
  next()
} 

const userExtractor = async (request,response,next)=>{
    let token = request.token
    if(!token){
      request.user = null
    }

    let userInfo;
      try{
        userInfo = jwt.verify(request.token,process.env.SECRET)
      }
      catch(err){
        error(err)
        return response.status(401).send({ error: 'invalid token' })
      }

      let user = await User.findOne({_id:userInfo.id})
      request.user = user
      next()
}

module.exports = {
    errorHandler,
    tokenExtractor,
    userExtractor,
  }