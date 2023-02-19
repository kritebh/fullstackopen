const blogRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const Blog = require("../models/blog");
const {info,error} = require("../utils/logger");
const User = require("../models/user");

blogRouter.get("/", async (request, response) => {
  let blogs = await Blog.find({}).populate('user',{username:1,name:1})
  response.json(blogs);
});

blogRouter.post("/", async (request, response) => {

  if(!request.user){
    return response.status(401).send({ error: 'unauthorized' })
  }

  let user = request.user

  if(!request.body.url || !request.body.title){
    return response.status(400).send({error:"url and title is required field"});
  }

  let payload = {
    ...request.body,
    user:user._id
  }

  const blog = await Blog.create(payload);
  user.blogs.push(blog._id)
  await User.updateOne({_id:user._id},user)

  response.status(201).json(blog);
});


blogRouter.delete("/:id",async (req,res,next)=>{
    try{
      if(!req.user){
        return res.status(401).send({ error: 'unauthorized' })
      }
      
      let user = req.user
    
      let blogToDelete = await Blog.findOne({_id:req.params.id})
      if(!blogToDelete){
        return res.status(404).send()
      }
      if(blogToDelete.user._id.toString()===user._id.toString()){
        await Blog.findOneAndDelete({_id:req.params.id})
        res.status(204).send()
      }
      else{
        res.status(401).send({error:"You are not authorized to delete this blog"})
      }
    }
    catch(err){
      error(err)
      next(err)
    }
})

blogRouter.put("/:id",async(req,res,next)=>{
    try{
      let payload = req.body
      let newBlog = await Blog.findOneAndUpdate({_id:req.params.id},payload,{new:true})
      if(!newBlog){
        return res.status(404).send()
      }
      res.send(newBlog)
    }
    catch(err){
      error(err)
      next(err)
    }
})

module.exports = blogRouter