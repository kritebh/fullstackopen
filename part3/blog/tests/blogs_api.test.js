const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('empty notes',async ()=>{
    let res = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    console.log(res)
    expect(res.body).toHaveLength(0)
})