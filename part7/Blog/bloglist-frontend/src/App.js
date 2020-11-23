/* eslint-disable no-trailing-spaces */
import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'

//import blogService from './services/blogs'
import loginService from './services/login'
import storage from './utils/storage'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlog, createBlogg, likeBlog, removeBlog } from './reducers/blogReducer'
import { loginUser, logoutUser } from './reducers/userReducer'
import usersService from './services/users'
import { initializeUsers } from './reducers/usersReducer'
import {
  BrowserRouter as Router,
  Switch, Route, Link, useRouteMatch
} from 'react-router-dom'
// exercise 7.13 works!!



const App = () => {
  //const [blogs, setBlogs] = useState([])
  //const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  //const [notification, setNotification] = useState(null)
  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blogs)

  const user = useSelector(state => state.user)

  const users = useSelector(state => state.users)

  const blogFormRef = React.createRef()

  useEffect(() => {
    /*blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])*/
    dispatch(initializeBlog())
    usersService.getAll().then(users =>
      dispatch(initializeUsers(users)))
  }, [dispatch])

  useEffect(() => {
    const user = storage.loadUser()
    //setUser(user)
    //}, [])
    dispatch(loginUser(user))
  }, [dispatch])

  const notifyWith = (message, type='success') => {
    /*setNotification({
      message, type
    })
    setTimeout(() => {
      setNotification(null)
    }, 5000)*/
    const viesti = { message, type }
    dispatch(setNotification(viesti, 5))
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      setUsername('')
      setPassword('')
      dispatch(loginUser(user))
      notifyWith(`${user.name} welcome back!`)
      storage.saveUser(user)
    } catch(exception) {
      notifyWith('wrong username/password', 'error')
    }
  }

  const createBlog = async (blog) => {
    try {
      //const newBlog = await blogService.create(blog)
      blogFormRef.current.toggleVisibility()
      //setBlogs(blogs.concat(newBlog))
      dispatch(createBlogg(blog))
      notifyWith(`a new blog '${blog.title}' by ${blog.author} added!`)
    } catch(exception) {
      console.log(exception)
    }
  }

  const handleLike = async (id) => {
    const blogToLike = blogs.find(b => b.id === id)
    const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1, user: blogToLike.user.id }
    //await blogService.update(likedBlog)
    //setBlogs(blogs.map(b => b.id === id ?  { ...blogToLike, likes: blogToLike.likes + 1 } : b))*
    dispatch(likeBlog(likedBlog))
  }

  const handleRemove = async (id) => {
    const blogToRemove = blogs.find(b => b.id === id)
    const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
    if (ok) {
      //await blogService.remove(id)
      //setBlogs(blogs.filter(b => b.id !== id))
      dispatch(removeBlog(blogToRemove.id))
      notifyWith(`Deleted blog ${blogToRemove.title} by ${blogToRemove.author}`)
    }
    //notifyWith(`Deleted blog ${blogToRemove.title} by ${blogToRemove.author}`)*/
  }

  const handleLogout = () => {
    dispatch(logoutUser())
    storage.logoutUser()
  }

  const identify = useRouteMatch('/users/:id')
  const identifyUser = identify 
    ? users.find(user => user.id === (identify.params.id))
    : null

  if ( !user ) {
    return (
      <div>
        <h2>login to application</h2>

        <Notification />

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id='username'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='login'>login</button>
        </form>
      </div>
    )
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  const User = () => {
    if(!identifyUser) {
      return null
    }

   
    if (user !== null) {
      const name = identifyUser.name

      return (
        <>
          <h2>{name}</h2>
          <b>added blogs</b>
          <ul>
            {identifyUser.blogs.map(blog => 
              <li key={blog.id}>{blog.title}</li>
            )}
          </ul>
        </>
      )}
    return null
  }


  return (
    <div>
      <Router>
        <h2>blogs</h2>

        <Notification />

        <p>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </p>

      
        <Switch>
          <Route path="/users/:id">
            <User user={identifyUser}/>
          </Route>
          <Route path="/users">
            <h3>Users</h3>
            <table>
              <thead>
                <tr><th></th><th>blogs created</th></tr>
              </thead>
              <tbody>
                {users.map(user => <tr key={user.id}><td><Link to={`/users/${user.id}`}>{user.name}</Link></td><td>{user.blogs.length}</td></tr>)}
              </tbody>
            </table>
          </Route>        
          <Route path="/">
            <Togglable buttonLabel='create new blog'  ref={blogFormRef}>
              <NewBlog createBlog={createBlog} />
            </Togglable>
            {blogs.sort(byLikes).map(blog =>
              <Blog
                key={blog.id}
                blog={blog}
                handleLike={handleLike}
                handleRemove={handleRemove}
                own={user.username===blog.user.username}
              />
            )}
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App