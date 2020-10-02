import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './Components/Filter'
import Countries from './Components/Countries'



const App = () => {
  const [countries, setCountries] = useState([])
  
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])


  

  
  

  const handleClicks = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  
  }
  const handlefilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  return (
    <div>
      

      <Filter value={newFilter} handlefilterChange={handlefilterChange} />
      <br />
      <Countries
        countries={countries}
        newFilter={newFilter}
        handleClicks={handleClicks}
      />
      
      
    </div>
  )
}

export default App
