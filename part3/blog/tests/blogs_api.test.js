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

describe('basicDBTest', () => {
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

});

describe('testing POST req', () => {
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

    test("likes default 0",async()=>{
        let payload = {
            title: "Type wars",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        }
        
        let res = await api.post('/api/blogs').send(payload)
        expect(res.body.likes).toBe(0)
    })

    test('checking title or url in payload',async()=>{
        let payload = {
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            likes: 2,
        }

        await api.post("/api/blogs").send(payload).expect(400)

        payload = {
            title: "Type wars",
            author: "Robert C. Martin",
            likes: 2,
        }

        await api.post("/api/blogs").send(payload).expect(400)

    })
});


describe('DELETE req', () => {
    test('deleting blogs',async ()=>{
        let allBlogsInDB = await helper.blogInDB()
        let blogToDelete = allBlogsInDB[0]

        await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)
        
        let afterDeletingBlogs = await helper.blogInDB()
        expect(afterDeletingBlogs.length).toBe(helper.initialBlog.length -1)

        const content = afterDeletingBlogs.map(b=>b.author)
        expect(content).not.toContain(blogToDelete.author)
    })

    test('deleting blogs with invalid ID',async ()=>{
        let invalidID = "5a3d5da59070081a82a3445"
        await api.delete(`/api/blogs/${invalidID}`).expect(400)
    })

    test('deleting note with ID which is not in DB',async()=>{
        let nonExistingId = await helper.nonExistingId()
        await api.delete(`/api/blogs/${nonExistingId}`).expect(404)
    })

});