import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { content: 'Arto Hellas', numb: '000' },
    
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

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

   
  if(persons.some(a =>
    a.content === newName)) {window.alert(`${newName} is already added to phonebook`)}
  else { setPersons(persons.concat(aObject))
    setNewName('')
    console.log('button clicked', event.target)
  }
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
  return (
    <div>
      <h2>Phonebook</h2>
      
      <form onSubmit={addPers}>
        <div>
          name: <input value = {newName} onChange={handleaChange}/>
          <div>number: <input value = {newNumber} onChange={handlebChange}/></div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      
        {persons.map(a => 
          <div key={a.content}>  {a.content} {a.numb}
          </div>
        )}

      
      
    </div>
  )
}

export default App