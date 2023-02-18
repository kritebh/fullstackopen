const notesRouter = require("express").Router();
const Blog = require("../models/blog");
const {info,error} = require("../utils/logger")

notesRouter.get("/", async (request, response) => {
  let blogs = await Blog.find({})
  response.json(blogs);
});

notesRouter.post("/", async (request, response) => {

  if(!request.body.url || !request.body.title){
    return response.status(400).send();
  }

  const blog = new Blog(request.body);

  let result = await blog.save()
  response.status(201).json(result);
});


notesRouter.delete("/:id",async (req,res)=>{
    try{
      let resp = await Blog.findOneAndDelete({_id:req.params.id})
      if(!resp){
        return res.status(404).send()
      }
      res.status(204).send()
    }
    catch(err){
      error(err)
      res.status(400).send()
    }
})


module.exports = notesRouter