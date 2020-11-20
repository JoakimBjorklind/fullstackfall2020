import React from 'react'
import { connect } from 'react-redux'
import { voteVote } from '../reducers/anecdoteReducer'
import { displayNotification } from '../reducers/notificationReducer'
//import anecdotes from '../services/anecdotes'

const AnecdoteList = (props) => {
    //const anecdotes = useSelector(state => state.anecdotes)
    //const dispatch = useDispatch()
    //const filter = useSelector(state => state.filter)
    
    const vote = (anecdote) => {
     
      //dispatch(voteVote(anecdote))
      //dispatch(displayNotification(`'${anecdote.content}' just got a vote!`, 5))
      props.voteVote(anecdote)
      props.displayNotification(`'${anecdote.content}' just got a vote!`, 5)
      
      
    }

    
    
    const filteringAnecdotes = (filter, anecdotes) => {

      
      let filteredAnecdotes = anecdotes.filter(anec =>
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
          {sortAnecdotes(filteringAnecdotes(props.filter, props.anecdotes)).map(anecdote =>
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const ConnectedAnecdoteList = connect(
  mapStateToProps, {voteVote, displayNotification}
)(AnecdoteList)

export default ConnectedAnecdoteList
