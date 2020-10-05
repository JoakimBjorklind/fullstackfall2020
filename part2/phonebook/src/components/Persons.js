import React from 'react';

const Persons = ({persons, newFilter, cancelPerson}) => {
    const filteringPersons = persons
    .filter(z => z.content.toLowerCase().includes(newFilter.toLowerCase()))
    return(
    
    <div>
        {filteringPersons.map(z => <li key={z.content}>{z.content} {z.numb}<button onClick={() => cancelPerson(z.id)}>delete</button></li>)}
          
    </div>


    )
}













export default Persons