import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + bad + neutral
  
  

    const increaseByOne = () => setGood(good + 1)
    const increaseByZero = () => setNeutral(neutral + 1)
    const decreaseByOne = () => setBad(bad + 1)

  

    

  return (
    <div>
      <h1>Give feedbakk!!!!</h1>
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
    <table>
      <thead>
      <tr>
      <td><Statistic text='good'/></td><td> <Statistic value={props.good}/></td>
      </tr><tr>
      <td><Statistic text="neutral " /></td><td> <Statistic value={props.neutral} /></td>
      </tr><tr>
      <td><Statistic text="bad " /></td><td> <Statistic value={props.bad} /></td>
      </tr><tr>
      <td><Statistic text="all " /></td><td> <Statistic value={props.good + props.neutral + props.bad} /></td>
      </tr><tr>
      <td><Statistic text="average " /></td><td> <Statistic value={(props.good-props.bad)/props.all} /></td>
      </tr><tr>
      <td><Statistic text="posi " /></td><td> <Statistic value={(props.good/props.all)*100 + ' %'} /></td>
      </tr>
      </thead>
      </table>
      </div>
      )

  }
  const Button = (props) => (
    <button onClick={props.handleClick}>{props.text}
      
    </button>
  )

  const Statistic = (props) => {
     
    return (
    <div>
        {props.text}  {props.value}
    </div>
    )
  }
  
ReactDOM.render(<App />, document.getElementById('root'))
