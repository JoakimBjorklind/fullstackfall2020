import React, { useState } from 'react'

const Blog = ({ blog,  updateBlog, deleteBlog, user }) => {
  const [visible, setVisible] = useState(false)

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

  const handleDeleteClick = () => {
    deleteBlog(blog.id, blog.title, blog.author)
  }

  // this solution below works!!
  return (
    <div style={blogStyle} className="blog" >
      <div>
        {blog.title} by {blog.author}
        <button onClick={() => setVisible(!visible)}>{visible === true ? 'hide' : 'view'}</button>
      </div>
      {visible === true ?
        <div>
          <div>
            {blog.url}
          </div>
          <div id='likes'>
            Likes {blog.likes}
            <button id='like' onClick={() => {handleClick()}}>like</button>
          </div>
          <div>
            {blog.user.name}
          </div>
          {user.name === blog.user.name ?
            <div>
              <button onClick={() => handleDeleteClick()}>Remove</button>
            </div>
            :
            null
          }
        </div>
        :
        null
      }
    </div>
  )
}
export default Blog
