const supertest = require('supertest')
const app = require('../app')
const User = require("../models/user")
const api = supertest(app)
const helper = require("./test_helper")

beforeEach(async()=>{
    await User.deleteMany({});
    await api.post('/api/users').send(helper.initialUser[0]); //check again
})


describe('Users POST req', () => {
      test('user can registered with valid data',async()=>{
        let newUser = await api.post('/api/users').send(helper.sampleUser).expect(200)
        expect(newUser.body.id).toBeDefined()

        let allUsersInDB = await helper.allUsersInDB()
        expect(allUsersInDB.length).toBe(helper.initialUser.length+1)
      })  

      test('adding same username',async()=>{
        await api.post('/api/users').send(helper.initialUser[0]).expect(400)
      })

      test('adding user with less than 3 char username',async()=>{
        let payload = {
            username: "al",
            name: "Alto Haltman",
            password: "altoCapHaltman",
          };

          await api.post('/api/users').send(payload).expect(400)

      })
      test('adding user with less than 3 char password',async()=>{
        let payload = {
            username: "alto",
            name: "Alto Haltman",
            password: "al",
          };

          await api.post('/api/users').send(payload).expect(400)
      })
});


