const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

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

  test('a valid blog can be added', async () => {
    const newBlog = {
        title: 'valid blog',
        author: "vb",
        url: "www.validblog.com",
        likes: 22
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const blogs = await Blog.find({})
     
    expect(blogs).toHaveLength(testBlogs.length + 1)
    
    const authors = blogs.map(aut => aut.author)
  
    expect(authors).toContain(
      newBlog.author
    )


  })

  test('if no likes, default to 0', async () => {
    const newBlog = {
        title: 'blog with no likes',
        author: "Bad Author",
        url: "www.unlikeable.com",
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

   const blogs = await Blog.find({})

   expect(blogs[testBlogs.length].likes).toBe(0)
})

test('blog needs title and url', async () => {
  const newBlog = {
      author: "author"
  }

  await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

  const blogs = await Blog.find({})

  expect(blogs).toHaveLength(testBlogs.length)
})

test('succeeds with status code 204 if id is valid', async () => {
  const blogs = await Blog.find({})
  const blogToDelete = blogs[0]

  await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

  const blogsAtEnd = await Blog.find({})  
  
  expect(blogsAtEnd).toHaveLength(
    testBlogs.length - 1
)

  const blog = blogsAtEnd.map(b => b.title)

  expect(blog).not.toContain(blogToDelete.title)
})

test('fails with status code 400 if data invalid', async () => {
  const id = 'a444aa71b54a676234d17f8'

  const newBlog = {
    likes: 33
  }

  await api
       .put(`/api/blogs/${id}`)
       .send(newBlog)
       .expect(400)

})

beforeEach(async () => {
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })
  await user.save()
})

test('creation succeeds with a fresh username', async () => {
  const usersStart = await User.find({})
  const usersAtStart = await usersStart.map(u => u.toJSON())

  const newUser = {
    username: 'myname',
    name: 'My Name',
    password: 'emanym',
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const usersEnd = await User.find({})
  const usersAtEnd = await usersEnd.map(u => u.toJSON())
  expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

  const usernames = usersAtEnd.map(u => u.username)
  expect(usernames).toContain(newUser.username)
})

test('creation fails with proper statuscode and message if username already in system', async () => {
  const usersStart= await User.find({})
  const usersAtStart = await usersStart.map(u => u.toJSON())

  const newUser = {
    username: 'root',
    name: 'copycat',
    password: 'tacypoc',
}

const result = await api
.post('/api/users')
.send(newUser)
.expect(400)
.expect('Content-Type', /application\/json/)

expect(result.body.error).toContain('`username` to be unique')

const usersEnd = await User.find({})
const usersAtEnd = await usersEnd.map(u => u.toJSON())

expect(usersAtEnd).toHaveLength(usersAtStart.length)

})



  
  afterAll(() => {
    mongoose.connection.close()
})