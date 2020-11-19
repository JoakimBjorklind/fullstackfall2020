import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteVote } from '../reducers/anecdoteReducer'
import { displayNotification, undisplayNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()
    const undisplay = () => dispatch(undisplayNotification(''))
  
    const vote = (id, content) => {
      //console.log('vote', id)
      dispatch(voteVote(id))
      dispatch(displayNotification(`'${content}' just got a vote!`))
      setTimeout(undisplay, 5000)
      
    }
  
    
  
    const sortAnecdotes = (anecdotes) => {
      return (
        anecdotes.sort((x, y) => y.votes - x.votes)
      )
    }

    return (
        <div>
          {sortAnecdotes(anecdotes).map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
              </div>
            </div>
          )}</div>
    )
}

export default AnecdoteList
