import React from 'react';

const Persons = ({persons, newFilter, cancelPerson}) => {
    const filteringPersons = persons
    .filter(persons => persons.name.toLowerCase().includes(newFilter.toLowerCase()))
    return(
    
    <div>
        {filteringPersons.map(z => <li key={persons.name}>{persons.name} {persons.number}<button onClick={() => cancelPerson(persons.id)}>delete</button></li>)}
          
    </div>


    )
}













export default Persons