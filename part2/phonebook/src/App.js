import React, { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import servpersons from './services/persons'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName ] = useState('')
  const [newNumber, setNewNumber ] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [messageMessage, setmessageMessage] = useState(null)
  

  useEffect(() => {
    servpersons
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  


  

  const addPers = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const aObject = {
      name: newName,
      number: newNumber,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      //id: persons.length + 1,
    }

    if (persons.every((a) => a.name.toLowerCase() !== newName.toLowerCase()))
    {
    servpersons
      .create(aObject)
      .then(returnedPers => {
        setPersons(persons.concat(returnedPers))
        setNewName('')
        setNewNumber('')
        setmessageMessage(`Added the name ${returnedPers.name}`)
        setTimeout(() => {
          setmessageMessage(null)
        }, 6000)
      }).catch(e => {

        const message = {
          message: `${e.response.data.error}`,
        }
        setErrorMessage(message)
        setTimeout(() => {
          setErrorMessage(null)
        }, 6000)
      })
    }
    
    
   
    
    else if (window.confirm(`${newName} is already added to the phonebook,
    replace the old number with a new one?`))
    {
      updatePers(aObject)
    }

    
  
  
  
}

const updatePers = (person) => {
  const identity = persons.find(w => w.name.toLowerCase() === person.name.toLowerCase()).id
  person = {...person, id: identity}

  servpersons
  .update(identity, person)
  .then(returnedPers => {
    setPersons(persons.map(w => w.id !== identity ? w : returnedPers))
    setNewName('')
    setNewNumber('')

    setmessageMessage(`Updated the name ${returnedPers.name}`)
    setTimeout(() => {
        setmessageMessage(null)
    }, 5000)
    
}).catch(e => {
  if (e.response.status === 400)
  {
    setErrorMessage(e.response.data.error)
    setTimeout(() => {
      setErrorMessage(null)
    }, 6000)
  }
  else {
    setPersons(persons.filter(w => w.id !== identity))
    setErrorMessage(`Information of ${person.name} has already been removed from the server`)
    setTimeout(() => {
      setErrorMessage(null)
    }, 6000)
    setNewName('')
    setNewNumber('')
  }
  })
}

const cancelPerson = (id) => {
  const person = persons.find(z => z.id === id)
  if(window.confirm(`Sure you wanna delete ${person.name} ?`))
  {servpersons
  .cancel(id)
  .then(ignored => {
    setPersons(persons.filter(z => id !== z.id))

    setmessageMessage(`${person.name} was deleted`)
    setTimeout(() => {
      setmessageMessage(null)
  }, 5000)
  }).catch(e => {
    setErrorMessage(`${person.name} has already been removed from the server`)
    setTimeout(() => {
      setmessageMessage(null)
  }, 5000)
  })
  
  
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
      <Notification messageMessage={messageMessage} errorMessage={errorMessage} />

      <Filter value={newFilter} handlecChange={handlecChange} />

      <h3>Add a new</h3>

      <PersonForm 
        addPers={addPers} handlebChange={handlebChange} handleaChange={handleaChange} name={newName} number={newNumber}
      />

      <h3>Numbers</h3>

      <Persons persons={persons} newFilter={newFilter} cancelPerson={cancelPerson}/>
    </div>
  )
}





export default App