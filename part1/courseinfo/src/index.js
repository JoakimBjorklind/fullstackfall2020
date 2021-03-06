import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
  return (
    <div>
      <p>{props.course.name}</p>
    </div>
  )
}
const Content = (props) => {
  console.log('props', props) 
  

  return (
    <div>
      < Part1 name1={props.course.parts[0].name} ex1={props.course.parts[0].exercises}/>
      < Part2 name2={props.course.parts[1].name} ex2={props.course.parts[1].exercises}/>
      < Part3 name3={props.course.parts[2].name} ex3={props.course.parts[2].exercises}/>
      

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
  console.log(props) 
  return (
    <div>
      <p>Number of exercise {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises}</p>
    </div>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course}/>
      
      
      
      
    </div>
  )
}



ReactDOM.render(<App />, document.getElementById('root'))


