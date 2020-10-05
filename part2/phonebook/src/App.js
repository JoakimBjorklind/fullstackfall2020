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
  const [errorMessage, setErrorMessage] = useState([ '', false])

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
    servpersons
      .create(aObject)
      .then(returnedNote => {
        setPersons(persons.concat(returnedNote))
        setNewName('')
      })

    
    
   
    if (persons.some(a =>
      a.content === newName)) {
    window.alert(`${newName} is already added to phonebook`)
      }
    else
    {
  setPersons(persons.concat(aObject))
  setNewName('')
  setNewNumber('')
  }
  
}

const cancelPerson = (id) => {
  const person = persons.find(z => z.id === id)
  if(window.confirm(`Sure you wanna delete ${person.content} ?`))
  servpersons
  .cancel(id)
  .then(() => 
  {setErrorMessage(`${person.content} was deleted from phonebook!`, false)
  setTimeout(() => {
    setErrorMessage(['', false])
  }, 7000)
  setPersons(persons.filter(z => id !== z.id))
}).catch( error => {
  setErrorMessage([`Person ${person.name} has already been deleted from server`, true])
  setTimeout(() => {
    setErrorMessage(['', false])
  }, 5000)
  setPersons(persons.filter(z => id !== z.id))
})
    
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

  const handlePersonClicks = (event) => {
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