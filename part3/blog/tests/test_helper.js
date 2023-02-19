const Blog = require("../models/blog");
const User = require("../models/user")

const initialBlog = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    user:"63f1b89e6241755fdc3132a6",
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    user:"63f1b89e6241755fdc3132a6",
    __v: 0,
  },
];

const blogInDB = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const nonExistingId = async () => {
  const blog = new Blog({
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    user:"63f1b89e6241755fdc3132a6"
  });
  await blog.save();
  await blog.delete();
  return blog._id.toString();
};

const initialUser = [
  {
    "username":"admin",
    "name":"Super Admin",
    "password":"auperadminmaxprogstfoss"
  }
]

const sampleUser = {
  username: "alto",
  name: "Alto Haltman",
  password: "altoCapHaltman",
};

const allUsersInDB = async()=>{
  let allUser = await User.find({})
  return allUser
}

const validToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWQiOiI2M2YxYjg5ZTYyNDE3NTVmZGMzMTMyYTYiLCJpYXQiOjE2NzY4MTQ4Mzh9.7Q4NCTd867cPEEJoG8yoWmtmQhJG48X-6HqmWBTOEyc"
const invalidToken = "ghjuvjhgv.ghugyvuvbuyy.uyvuyvu"

module.exports = {
  initialBlog,
  blogInDB,
  nonExistingId,
  sampleUser,
  allUsersInDB,
  initialUser,
  validToken,
  invalidToken
};
