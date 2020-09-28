import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { content: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addPers = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const aObject = {
      content: newName,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: persons.length + 1,
    }
  
    setPersons(persons.concat(aObject))
    setNewName('')
    console.log('button clicked', event.target)
  }

  const handleaChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      
      <form onSubmit={addPers}>
        <div>
          name: <input value = {newName} onChange={handleaChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      
        {persons.map(a => 
          <div key={a.content}> {a.content}
          </div>
        )}
      
      
    </div>
  )
}

export default App