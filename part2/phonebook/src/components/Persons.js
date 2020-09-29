import React from 'react';

const Persons = ({persons, newFilter}) => {
    return(
    
    <div>
        {persons.filter(a => a.content.toLowerCase().includes(newFilter.toLowerCase())).map(a =>  <div key={a.content}>  {a.content} {a.numb}
          </div>)}
          
    </div>


    )
}













export default Persons