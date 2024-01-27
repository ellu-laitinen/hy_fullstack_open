import { useState, useEffect } from "react"
import CountryInfo from "./CountryInfo"


const CountryList = ({countries, length}) => {
    const [showCountry, setShowCountry] = useState()
    const [newCountries, setNewCountries] = useState(countries)
    
  
     const handleShowCountry = (c) => {
            setNewCountries(c)
            setShowCountry(true)    
          }

    const handleReturn = () => {
        setShowCountry(false)
    }
      

    if (length == 0){
        return null
    }

    
    return (
        <>

    {length ==1 
    ? <CountryInfo country={countries[0]} length={length}/>
    : length > 10
    ?   'Too many matches, specify another filter' 
    : showCountry
    ? <CountryInfo country={newCountries} handleReturn={handleReturn} length={length}/>
    : countries.map(c => <li key={c.name.common}>{c.name.common} 
    <button onClick={()=>handleShowCountry(c)}>show</button></li>)}
        </>
    )
}

export default CountryList