import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  


    const increaseByOne = () => setGood(good + 1)
    const increaseByZero = () => setNeutral(neutral + 1)
    const decreaseByOne = () => setBad(bad + 1)

    const Display = ({ good }) => {
      return (
        <div>Good {good}</div>
      )
    }
    const Display2 = ({ neutral }) => {
      return (
        <div>Neutral {neutral}</div>
      )
    }
    const Display3 = ({ bad }) => {
      return (
        <div>Bad {bad}</div>
      )
    }


  return (
    <div>
      <h1>Give feedback!!!!</h1>
      <button onClick={increaseByOne}>
        good
      </button>
      <button onClick={increaseByZero}> 
        neutral
      </button>
      <button onClick={decreaseByOne}> 
        bad
      </button>
      <h2>Stats!!</h2>
      <Display good={good}/>
      <Display2 neutral={neutral}/>
      <Display3 bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
