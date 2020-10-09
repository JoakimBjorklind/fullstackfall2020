import React from 'react';

const Persons = ({persons, newFilter, cancelPerson}) => {
    const filteringPersons = persons
    .filter(z => z.name.toLowerCase().includes(newFilter.toLowerCase()))
    return(
    
    <div>
        {filteringPersons.map(z => <li key={z.name}>{z.name} {z.number}<button onClick={() => cancelPerson(z.id)}>delete</button></li>)}
          
    </div>


    )
}













export default Persons