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
    test('empty blogs',async ()=>{
        let res = await api
        .get('/api/blogs')
        .set('Authorization',helper.validToken)
        .expect(200)
        .expect('Content-Type', /application\/json/)
        expect(res.body).toHaveLength(helper.initialBlog.length)
    })

    test('check id',async()=>{
        let res = await api.get('/api/blogs').set('Authorization',helper.validToken)
        expect(res.body[0].id).toBeDefined()
    })
    test('get blog without auth token',async()=>{
        await api.get('/api/blogs').expect(401)
    })
    test('get blog with invalid auth token',async()=>{
        await api.get('/api/blogs').set('Authorization',helper.invalidToken).expect(401)
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

        await api.post("/api/blogs").send(payload).set('Authorization',helper.validToken).expect(201)

        let allBlog = await helper.blogInDB()
        expect(allBlog.length === helper.initialBlog.length+1)
    })

    test("likes default 0",async()=>{
        let payload = {
            title: "Type wars",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        }
        
        let res = await api.post('/api/blogs').send(payload).set('Authorization',helper.validToken)
        expect(res.body.likes).toBe(0)
    })

    test('checking title or url in payload',async()=>{
        let payload = {
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            likes: 2,
        }

        await api.post("/api/blogs").send(payload).set('Authorization',helper.validToken).expect(400)

        payload = {
            title: "Type wars",
            author: "Robert C. Martin",
            likes: 2,
        }

        await api.post("/api/blogs").send(payload).set('Authorization',helper.validToken).expect(400)
        
    })
    
    test('creating new blog without auth token',async()=>{
        let payload = {
            title: "Type wars",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            likes: 2,
        }
        await api.post("/api/blogs").send(payload).expect(401)
    })

    test('creating new blog with invalid token',async()=>{
        let payload = {
            title: "Type wars",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            likes: 2,
        }
        await api.post("/api/blogs").send(payload).set('Authorization',helper.invalidToken).expect(401)
    })

});


describe('DELETE req', () => {
    test('deleting blogs',async ()=>{
        let allBlogsInDB = await helper.blogInDB()
        let blogToDelete = allBlogsInDB[0]

        await api.delete(`/api/blogs/${blogToDelete.id}`).set('Authorization',helper.validToken).expect(204)
        
        let afterDeletingBlogs = await helper.blogInDB()
        expect(afterDeletingBlogs.length).toBe(helper.initialBlog.length -1)

        const content = afterDeletingBlogs.map(b=>b.author)
        expect(content).not.toContain(blogToDelete.author)
    })

    test('deleting blogs with invalid ID',async ()=>{
        let invalidID = "5a3d5da59070081a82a3445"
        await api.delete(`/api/blogs/${invalidID}`).set('Authorization',helper.validToken).expect(400)
    })

    test('deleting blog with ID which is not in DB',async()=>{
        let nonExistingId = await helper.nonExistingId()
        await api.delete(`/api/blogs/${nonExistingId}`).set('Authorization',helper.validToken).expect(404)
    })

    test('deleting blogs without auth token',async ()=>{
        let allBlogsInDB = await helper.blogInDB()
        let blogToDelete = allBlogsInDB[0]

        await api.delete(`/api/blogs/${blogToDelete.id}`).expect(401)
    })

    test('deleting blogs with invalid auth token',async ()=>{
        let allBlogsInDB = await helper.blogInDB()
        let blogToDelete = allBlogsInDB[0]

        await api.delete(`/api/blogs/${blogToDelete.id}`).set('Authorization',helper.invalidToken).expect(401)
    })

});

describe('PUT req', () => {
    test('updating a blog',async()=>{
        let allBlogsInDB = await helper.blogInDB()
        let blogToUpdate = allBlogsInDB[0];
        blogToUpdate.likes = 7657691;
        blogToUpdate.user = blogToUpdate.user.toString()

        let updatedBlog = await api.put(`/api/blogs/${blogToUpdate.id}`).send(blogToUpdate).set('Authorization',helper.validToken)
        expect(blogToUpdate).toEqual(updatedBlog.body)

    })

    test('updating blogs with invalid ID',async ()=>{
        let invalidID = "5a3d5da59070081a82a3445"
        let allBlogsInDB = await helper.blogInDB()
        let blogToUpdate = allBlogsInDB[0];
        blogToUpdate.likes = 76571;
        await api.put(`/api/blogs/${invalidID}`).send(blogToUpdate).set('Authorization',helper.validToken).expect(400)
    })

    test('updating blog with ID which is not in DB',async()=>{
        let nonExistingId = await helper.nonExistingId()
        let allBlogsInDB = await helper.blogInDB()
        let blogToUpdate = allBlogsInDB[0];
        blogToUpdate.likes = 76576921;
        await api.put(`/api/blogs/${nonExistingId}`).send(blogToUpdate).set('Authorization',helper.validToken).expect(404)
    })

    test('updating a blog without auth token',async()=>{
        let allBlogsInDB = await helper.blogInDB()
        let blogToUpdate = allBlogsInDB[0];
        blogToUpdate.likes = 7657691;
        blogToUpdate.user = blogToUpdate.user.toString()

        await api.put(`/api/blogs/${blogToUpdate.id}`).send(blogToUpdate).expect(401)

    })

    test('updating a blog with invalid auth token',async()=>{
        let allBlogsInDB = await helper.blogInDB()
        let blogToUpdate = allBlogsInDB[0];
        blogToUpdate.likes = 7657691;
        blogToUpdate.user = blogToUpdate.user.toString()

        await api.put(`/api/blogs/${blogToUpdate.id}`).send(blogToUpdate).set('Authorization',helper.invalidToken).expect(401)

    })
});
