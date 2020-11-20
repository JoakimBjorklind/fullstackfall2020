import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteVote } from '../reducers/anecdoteReducer'
import { displayNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()
    const filter = useSelector(state => state.filter)
    
    const vote = (anecdote) => {
     
      dispatch(voteVote(anecdote))
      dispatch(displayNotification(`'${anecdote.content}' just got a vote!`, 5))
      
      
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
                <button onClick={() => vote(anecdote)}>vote</button>
              </div>
            </div>
          )}</div>
    )
}

export default AnecdoteList
