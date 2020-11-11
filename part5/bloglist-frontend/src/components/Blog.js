import React, { useState } from 'react'

const Blog = ({ blog,  updateBlog, user }) => {
  const [showEverything, setShowEverything] = useState(false)

  const hideShowEverything = { display: showEverything ? 'none' : '' }
  const showShowEverything = { display: showEverything ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleClick = () => {
    const blogObject = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    const id = blog.id
    updateBlog(id, blogObject)
  }

  return (
    <div style={blogStyle}>
      <div style={hideShowEverything}>
        {blog.title} by {blog.author}
         <button onClick={() => setShowEverything(true)}>view</button>
      </div>
      <div style={showShowEverything}>
        {blog.title} by {blog.author} 
        <button onClick={() => setShowEverything(false)}>hide</button>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button onClick={() => {handleClick()}}>like</button></div> 
       <div>{blog.user.name}</div>
      </div>
    </div>
  )
} 
export default Blog
