import React, { useState } from 'react'



const BlogForm = ({ createBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    const blog = {
      title: title,
      author: author,
      url: url
    }
    createBlog(blog)
    setTitle('')
    setAuthor('')
    setUrl('')
  }


  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
        Title:
          <input
            id='title'
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
            type="text"
            value={title}
          />
        </div>
        <div>
            Author:
          <input
            id='author'
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
            type="text"
            value={author}
          />
        </div>
        <div>
            Url:
          <input
            id='url'
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
            type="text"
            value={url}
          />
        </div>
        <button id='create-button' type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm