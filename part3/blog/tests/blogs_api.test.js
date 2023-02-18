const supertest = require('supertest')
const app = require('../app')
const Blog = require("../models/blog")
const api = supertest(app)
const helper = require("./test_helper")

beforeEach(async()=>{
    await Blog.deleteMany({});
    await Blog.create(helper.initialBlog[0])
    await Blog.create(helper.initialBlog[1])

})

test('empty notes',async ()=>{
    let res = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    expect(res.body).toHaveLength(helper.initialBlog.length)
})

test('check id',async()=>{
    let res = await api.get('/api/blogs')
    // console.log(res.body)
    expect(res.body[0].id).toBeDefined()
})

test('checking add blog',async()=>{
    let payload = {
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
    }

    await api.post("/api/blogs").send(payload).expect(201)

    let allBlog = await helper.blogInDB()
    expect(allBlog.length === helper.initialBlog.length+1)
})