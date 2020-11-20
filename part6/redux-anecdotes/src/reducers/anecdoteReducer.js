import anecdoteService from '../services/anecdotes'


const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'VOTE':
    
     const updatedAnecdote = action.data
     return state.map(anec => anec.id !== updatedAnecdote.id ? anec : updatedAnecdote)

    case 'INITIALIZE_ANECDOTES': 
      return action.data
    case 'NEW_ANEC': {
      return [...state, action.data]
    }
     default:
       return state
  }

}

export const voteVote = (anecdote) => {
  return async dispatch => {
    const votedAnecdote = {...anecdote, votes: anecdote.votes + 1}
    const updatedAnecdote = await anecdoteService.update(votedAnecdote)
      dispatch({
        type: 'VOTE',
        data: updatedAnecdote
      })
  

    }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INITIALIZE_ANECDOTES',
      data: anecdotes
    })
    
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createAnecdote(content)
    dispatch({
      type: 'NEW_ANEC',
      data:  newAnecdote
    })
     
  }
}

export default reducer