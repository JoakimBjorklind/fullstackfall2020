import React, { useState } from 'react'

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
  const handlecChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      
      <form onSubmit={addPers}>
        <div>
          filter shown with <input value = {newFilter} onChange={handlecChange}/>
          
        </div>
        <h2>Add new </h2>
        <div>
          name: <input value = {newName} onChange={handleaChange}/>
          <div>number: <input value = {newNumber} onChange={handlebChange}/></div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      
      {persons.filter(a => a.content.toLowerCase().includes(newFilter.toLowerCase())).map(a =>  <div key={a.content}>  {a.content} {a.numb}
          </div>)}
          
          
        

      
      
    </div>
  )
}

export default App