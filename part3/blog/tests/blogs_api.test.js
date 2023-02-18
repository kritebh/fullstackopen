const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('empty notes',async ()=>{
    let res = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    expect(res.body).toHaveLength(1)
})

test('check id',async()=>{
    let res = await api.get('/api/blogs')
    console.log(res.body)
    expect(res.body[0].id).toBeDefined()
})