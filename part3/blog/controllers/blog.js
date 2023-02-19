const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const {info,error} = require("../utils/logger")

blogRouter.get("/", async (request, response) => {
  let blogs = await Blog.find({}).populate('user',{username:1,name:1})
  response.json(blogs);
});

blogRouter.post("/", async (request, response) => {

  if(!request.body.url || !request.body.title){
    return response.status(400).send();
  }

  const blog = new Blog(request.body);

  let result = await blog.save()
  response.status(201).json(result);
});


blogRouter.delete("/:id",async (req,res,next)=>{
    try{
      let resp = await Blog.findOneAndDelete({_id:req.params.id})
      if(!resp){
        return res.status(404).send()
      }
      res.status(204).send()
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