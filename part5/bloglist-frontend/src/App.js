import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const sortBlogs = (blogs) => {
    return (
      blogs.sort((a, b) => b.likes - a.likes)
    )
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage(`${user.name} logged in`)
      setTimeout(() => {
        setMessage(null)
      }, 6000)
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setUsername('')
      setPassword('')
      setTimeout(() => {
        setErrorMessage(null)
      }, 6000)
    }
  }


  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(savedBlog => {
        setBlogs(blogs.concat(savedBlog))
        setMessage(`a new blog ${blogObject.title} by ${blogObject.author} added.`)
        setTimeout(() => {
          setMessage(null)
        }, 6000)
      })
  }

  const updateBlog = (id, blogObject) => {
    const blogToUpdate = blogs.find(blog => blog.id === id)
    blogService
      .update(id, blogObject)
      .then(returnedBlog => {
        returnedBlog.user = blogToUpdate.user
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      })
      .catch(() => {
        console.log('Something is wrong here!, error')
      })

  }

  const deleteBlog = (id) => {
    const blog = blogs.find(b => b.id === id)
    const confMessage = (window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`))
    if(confMessage) {
      blogService
        .erase(id)
        .then(() => {
          setBlogs(blogs.filter(b => id !== b.id))
          setMessage(`${blog.title} was deleted!`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
    else {
      return null
    }
  }



  if (user === null) {
    return (
      <div>
        <Notification message={message} errorMessage={errorMessage} />
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} errorMessage={errorMessage} />
      <p>{user.name} logged in
        <button onClick={() => {
          window.localStorage.removeItem('loggedBlogappUser')
          setUser(null)
        }}>logout</button></p>
      <div>
        <Togglable buttonLabel='New Blog' ref={blogFormRef}>
          <BlogForm createBlog={addBlog} />
        </Togglable>
      </div>
      {sortBlogs(blogs).map(blog =>
        <Blog key={blog.id} blog={blog}
          updateBlog={updateBlog}
          deleteBlog={deleteBlog}
          user={user} />
      )}
    </div>
  )
}

export default App