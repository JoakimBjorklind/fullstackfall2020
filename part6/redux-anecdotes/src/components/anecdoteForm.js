import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { displayNotification } from '../reducers/notificationReducer'



const AnecdoteForm = (props) => {
  //const dispatch = useDispatch()
  


  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    
    //dispatch(createAnecdote(content))
    //dispatch(displayNotification(`'${content}' was created`, 5))
    props.createAnecdote(content)
    props.displayNotification(`'${content}' was created`, 5)
    
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">add</button>
      </form>
    </div>
  )
}
const ConnectedAnecdoteForm = connect(null, { createAnecdote, displayNotification})(AnecdoteForm)

export default ConnectedAnecdoteForm