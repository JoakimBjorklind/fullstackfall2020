import blogService from '../services/blogs'

//const byLikes = (a1, a2) => a2.likes - a1.likes

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT':
    return action.data
  case 'LIKE':{
    const id = action.data.id
    const likedBlogToChange = state.find(a => a.id === id)
    const likedBlog = { ...likedBlogToChange, likes: likedBlogToChange.likes + 1 }
    return state.map(b => b.id !== id ? b : likedBlog)
  }
  case 'CREATE':
    return [...state, action.data]
  case 'REMOVE': {
    const id = action.data
    return state.filter(a => a.id !== id)
  }
  default:
    return state
  }
}

export const createBlogg = (content) => {
  return async dispatch => {
    const data = await blogService.create(content)
    dispatch({
      type: 'CREATE',
      data
    })
  }
}

export const initializeBlog = () => {
  return async dispatch => {
    const data = await blogService.getAll()
    dispatch({
      type: 'INIT',
      data
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const data = await blogService.update(blog)
    dispatch({
      type: 'LIKE',
      data
    })
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'REMOVE',
      data: id,
    })
  }
}

export default blogReducer