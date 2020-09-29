import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { content: 'Arto Hellas', numb: '040-123456' },
    { content: 'Ada Lovelace', numb: '39-44-5323523' },
    { content: 'Dan Abramov', numb: '12-43-234345' },
    { content: 'Mary Poppendieck', numb: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [newFilter, setNewFilter] = useState('')


  

  const addPers = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    /*const aObject = {
      content: newName,
      numb: newNumber,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: persons.length + 1,
    }*/

   
  if(persons.some(a =>
    a.content === newName)) {window.alert(`${newName} is already added to phonebook`)
  return }
  const aObject = {
    content: newName,
    numb: newNumber}
  setPersons(persons.concat(aObject))
  setNewName('')
  setNewNumber('')
 

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

      <Persons persons={persons} newFilter={newFilter}/>
    </div>
  )
}

export default App