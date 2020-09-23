import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + bad + neutral
  const average =  (good-bad)/all
  const positive = (good/all)*100
  

    const increaseByOne = () => setGood(good + 1)
    const increaseByZero = () => setNeutral(neutral + 1)
    const decreaseByOne = () => setBad(bad + 1)

  

    

  return (
    <div>
      <h1>Give feedback!!!!</h1>
      <Button handleClick={increaseByOne}text='good'/>
      <Button handleClick={increaseByZero}text='neutral'/> 
      <Button handleClick={decreaseByOne}text='bad'/>
      
      <h2>Stats!!</h2>
      <Statistics good={good}  neutral={neutral} bad={bad} all={good + neutral + bad} average={(good-bad)/all} positive={(good/all)*100 + '%'}/>
      
      
      
    </div>
  )
}
const Statistics = (props) =>{
 
  if ( props.all === 0 ){
    return <p>No feedbakk given</p>
  } 
  return (
    <div>
      <p>good {props.good}</p>
      <p>neutral {props.neutral}</p>
      <p>bad {props.bad}</p>
      <p>All {props.all}</p>
      <p>average {props.average}</p>
      <p>posi {props.positive}</p>
     </div>)

  }
  const Button = (props) => (
    <button onClick={props.handleClick}>{props.text}
      
    </button>
  )
ReactDOM.render(<App />, document.getElementById('root'))
