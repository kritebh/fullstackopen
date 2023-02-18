const notesRouter = require("express").Router();
const Blog = require("../models/blog");

notesRouter.get("/", async (request, response) => {
  let blogs = await Blog.find({})
  response.json(blogs);
});

notesRouter.post("/", async (request, response) => {

  if(!request.body.url || !request.body.title){
    response.status(400).send();
  }

  const blog = new Blog(request.body);

  let result = await blog.save()
  response.status(201).json(result);
});


module.exports = notesRouter