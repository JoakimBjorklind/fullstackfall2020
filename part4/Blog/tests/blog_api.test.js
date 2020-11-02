const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const testBlogs = [
    {
        title: 'test',
        author: "The Name",
        url: "www.address.com",
        likes: 35
    },
    {
      title: 'test2',
      author: 'The Second Name',
      url: 'www.anotherOne.com',
      likes: 44
    }
   
]


beforeEach(async () => {
    await Blog.deleteMany({})
  
    let blogObject = new Blog(testBlogs[0])
    await blogObject.save()
  
    blogObject = new Blog(testBlogs[1])
    await blogObject.save()
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
  })

  test('unique identifier named id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })

  
  afterAll(() => {
    mongoose.connection.close()
})