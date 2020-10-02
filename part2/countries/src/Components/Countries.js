import React from 'react'
import Country from './Country'


const Countries = ({countries, newFilter, handleClicks}) => {

    const filteringCountries = countries
    .filter(z => z.name.toLowerCase().includes(newFilter.toLowerCase()))

    if(filteringCountries.length > 10){
        return 'Too many matches, specify another filter'
      }else if(filteringCountries.length === 1){
        return <Country country={filteringCountries[0]} />
      }else{
        return (
          <ul>
            {filteringCountries.map(z => <li key={z.alpha2Code}>{z.name} <button onClick={handleClicks} value={z.name}>show</button></li>)}
          </ul>
        )
      }
}


















export default Countries