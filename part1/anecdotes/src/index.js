import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}
    
  </button>
)
const App = (props) => {
  const [selected, setSelected] = useState(0)
  
  const [pointz, increasePointz] = useState(new Array(props.anecdotes.length + 1).join('0').split('').map(parseFloat))
  const randomizer = () => (setSelected(Math.floor(Math.random() * props.anecdotes.length)))
  

  const increaseVotes = () => {const copy = [...pointz]
  copy[selected] += 1
  increasePointz(copy)}

  const mostVotez = () => {
    let maxVotez = 0
    let bigPointz = 0
    for(let i = 0; i <= props.anecdotes.length; i++){
      if(pointz[i] >= maxVotez){
        maxVotez = pointz[i]
        bigPointz= i
      }
    }
    return bigPointz
  }


  console.log(props)
  return (
    <div>
      <h1>Anecdote of the day!!!!!</h1>
      <h3>{props.anecdotes[selected]}</h3>
      <p>has {pointz[selected]} votes</p>
      <Button handleClick={increaseVotes}text='vote'/>
      <Button handleClick={randomizer}text='next anecdote'/>
      <h2>Ancdote with most votes</h2>
      <h3>{props.anecdotes[mostVotez()]}</h3>
      <p>has {pointz[mostVotez()]} votes</p>
      


    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'heeee'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)