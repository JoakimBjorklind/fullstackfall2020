import blogService from '../services/blogs'

//const byVotes = (a1, a2) => a2.votes - a1.votes

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT':
    return action.data
  //case 'LIKE':
    //const like = action.data
    //return state.map(a => a.id===liked.id ? liked : a).sort(byLikes)
  case 'CREATE':
    return [...state, action.data]
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

/*export const likeBlog = (blog) => {
  return async dispatch => {
    const toLike = { ...blog, likes: blog.likes + 1 }
    const data = await blogService.update(toLike)
    dispatch({
      type: 'LIKE',
      data
    })
  }
}*/

export default blogReducer