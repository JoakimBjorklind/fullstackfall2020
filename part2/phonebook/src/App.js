import React, { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import servpersons from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName ] = useState('')
  const [newNumber, setNewNumber ] = useState('')
  const [newFilter, setNewFilter] = useState('')
  

  useEffect(() => {
    servpersons
      .getAll()
      .then(initialNotes => {
        setPersons(initialNotes)
      })
  }, [])

  


  

  const addPers = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const aObject = {
      content: newName,
      numb: newNumber,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: persons.length + 1,
    }

    if (persons.every((a) => a.content.toLowerCase() !== newName.toLowerCase()))
    {
    servpersons
      .create(aObject)
      .then(returnedPers => {
        setPersons(persons.concat(returnedPers))
        setNewName('')
        setNewNumber('')
      })
    }
    
    
   
    
    else if (window.confirm(`${newName} is already added to the phonebook,
    replace the old number with a new one?`))
    {
      updatePers(aObject)
    }

    
  
  
  
}

const updatePers = (person) => {
  const identity = persons.find(w => w.content.toLowerCase() === person.content.toLowerCase()).id
  person = {...person, id: identity}

  servpersons
  .update(identity, person)
  .then(returnedPers => {
    setPersons(persons.map(w => w.id !== identity ? w : returnedPers))
    setNewName('')
    setNewNumber('')
})
}

const cancelPerson = (id) => {
  const person = persons.find(z => z.id === id)
  if(window.confirm(`Sure you wanna delete ${person.content} ?`))
  {servpersons
  .cancel(id)
  .then()
  setPersons(persons.filter(z => id !== z.id))
  
  }
    
}
 



  const handleaChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handlebChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  
  }
  const handlecChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter value={newFilter} handlecChange={handlecChange} />

      <h3>Add a new</h3>

      <PersonForm 
        addPers={addPers} handlebChange={handlebChange} handleaChange={handleaChange} content={newName} numb={newNumber}
      />

      <h3>Numbers</h3>

      <Persons persons={persons} newFilter={newFilter} cancelPerson={cancelPerson}/>
    </div>
  )
}

export default App