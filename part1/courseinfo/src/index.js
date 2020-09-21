import React from 'react';
import ReactDOM from 'react-dom';

const Header = () => {
  return (
    <div>
      <p>Half Stack application development</p>
    </div>
  )
}
const Content = (props) => {
  console.log('props', props) 
  //console.log(props.part2)

  return (
    <div>
      < Part1 name1={props.part1} ex1={props.exercises1}/>
      < Part2 name2={props.part2} ex2={props.exercises2}/>
      < Part3 name3={props.part3} ex3={props.exercises3}/>
      

    </div>
  )
}
const Part1 = (props) => {
  
  return (
    <div>
      <p> {props.name1} {props.ex1}</p>
    </div>
  )
}
const Part2 = (props) => {
  
  return (
    <div>
         <p> {props.name2}  {props.ex2}</p>  
    </div>
  )
}
const Part3 = (props) => {
   
  return (
    <div> 
      <p>  {props.name3} {props.ex3}</p>
    </div>
  )
}

const Total = (props) => {
   
  return (
    <div>
      <p>Number of exercise {props.total}</p>
    </div>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }
  

  return (
    <div>
      <Header course={course} />
      <Content part1={part1.name} exercises1={part1.exercises} />
      <Content part2={part2.name} exercises2={part2.exercises} />
      <Content part3={part3.name} exercises3={part3.exercises}/>
      
      <Total total={part1.exercises + part2.exercises + part3.exercises}/>
      
      
      
    </div>
  )
}



ReactDOM.render(<App />, document.getElementById('root'))


