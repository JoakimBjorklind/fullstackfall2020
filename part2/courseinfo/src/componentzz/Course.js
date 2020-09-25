import React from 'react';

 const Header = (props) => {
    return (
      <div>
        <h2>{props.course.name}</h2>
      </div>
    )
  }
 const Content = ({course}) => {
    console.log('props', course) 
    
    
    return (
      <div>
       {course.parts.map(i => <Part key={i.id} name={i.name} exercises={i.exercises} />)}
  
      </div>
    )
  }
 const Part = (props) => {
    return(
      <p>
        {props.name} {props.exercises}
      </p>
    )
  }
  
  
  
  
 const Total = ({course}) => {
    const totalsum = course.parts.reduce((sum, part) => { return sum + part.exercises}, 0)
     
      return (
      <div>
        <p><b>total of {totalsum} exercises </b></p>
      </div>
      )
    }
  
  
  
  
 const Course = ({course}) => {
    console.log('props', course)
  
  
    return (
      <div>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
        
      </div>
    )
  }

  export default Course
