import React, { useState, useEffect } from 'react'
import axios from 'axios'

const iconStyle = {
    width: '125px'
  }

const Country = ({ country }) => {

  const [weather, setWeather] = useState([])

  useEffect(() => {
      axios
      .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.capital}`)
      .then(response => {
        setWeather(response.data.current)
      })
    
  }, [country])

    return (
        <div>
          <h1>{country.name}</h1>
          <p>capital {country.capital}<br/>
          population {country.population}</p>
          <h2>
            Spoken languages
          </h2>
          <ul>
            {country.languages.map(l => <li key={l.iso639_1}>{l.name}</li>)}
          </ul>
          <img src={country.flag} style={iconStyle} alt={country.name} />
          <h2>The weather in {country.capital}</h2>
          <p>Current temperature {weather.temperature}&nbsp;&deg;C </p>
          { weather.weather_icons ? weather.weather_icons.map((u, i) => <img key={i} src={u} alt={`Weather in ${country.capital}`} style={iconStyle} />) : '' }
          <p>wind: { Math.floor(weather.wind_speed/3.6) } m/s direction {weather.wind_dir}</p>
          
          
        </div>
      )
    }
    
    export default Country