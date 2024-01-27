import { useEffect, useState } from "react"
import Weather from "./Weather"
import axios from 'axios'


const CountryInfo = ({country, handleReturn, length}) => {

    const lat = country.latlng[0]
    const lon = country.latlng[1]
    const APIkey = import.meta.env.APIKEY
    const [weather, setWeather]=useState('')
    console.log(APIkey)

    
    const languages =Object.values(country.languages)

    useEffect(() => {
        console.log("fetch weather")
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${APIkey}`)
        .then (response => {
            console.log(response.data)
            setWeather(response.data)
         
       
           
              
          })
        
    },[] )

    return (
    
    <div>
        <h2>{country.name.common}</h2>
        <p>capital {country.capital[0]} </p>
        <p>area {country.area} </p>
        <div>languages:
            <ul>  {languages.map(l => <li key={l}>{l}</li>)}
            </ul>
            </div>
            <div> <img src={country.flags.png} alt={country.flags.alt}/></div>
            {length != 1 ?   <button onClick={handleReturn}>back to list</button> :null}
          

            <Weather country={country} weather={weather}/>
       
        
     
        </div>
    )
}

export default CountryInfo