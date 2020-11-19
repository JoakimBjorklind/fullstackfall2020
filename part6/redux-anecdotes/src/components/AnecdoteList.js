import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteVote } from '../reducers/anecdoteReducer'
import { displayNotification, undisplayNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()
    const filter = useSelector(state => state.filter)
    const undisplay = () => dispatch(undisplayNotification(''))
    const vote = (id, content) => {
      //console.log('vote', id)
      dispatch(voteVote(id))
      dispatch(displayNotification(`'${content}' just got a vote!`))
      setTimeout(undisplay, 5000)
      
    }

    
    
    const filteringAnecdotes = () => {

      
      let filteredAnecdotes = [...anecdotes].filter(anec =>
      anec.content.toLowerCase().includes(filter.toLowerCase()))
      return filteredAnecdotes
      }
  
    
  
    const sortAnecdotes = (anecdotes) => {
      return (
        anecdotes.sort((x, y) => y.votes - x.votes)
      )
    }

    return (
        <div>
          {sortAnecdotes(filteringAnecdotes()).map(anecdote =>
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
