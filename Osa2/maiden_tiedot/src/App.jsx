import { useState, useEffect } from 'react'
import countryService from './services/country'
import Form from './components/Form'
import CountryList from './components/CountryList'


const App = ()=> {

  const [countries, setCountries] = useState(null)
  const [searchValue, setSearchValue] = useState(null)
  const [matchingCountries, setMatchingCountries] = useState(null)

  const [length, setLength] = useState(0)


  useEffect(()=> {


    if (searchValue) {
      countryService
      .getAll()
      .then (initialCountries => {
        setCountries(initialCountries)     
      })

    }

  }, [searchValue])





  useEffect(() => {
    if(countries) {
      let newCountries = []
     
      countries.filter(c  =>
        {
          if (c.name.common.toLowerCase().includes(searchValue)){
  
             
              newCountries = newCountries.concat(c)          
          }
        } )
          setMatchingCountries(newCountries)
          setLength(newCountries.length)
    }
   
  }, [countries])



  const handleSearchCountry = event => {
    setSearchValue(event.target.value)
    
  }
 


  return (
    <>

 <Form handleSearchCountry={handleSearchCountry}/>

    <ul><CountryList countries = {matchingCountries} length={length} searchvalue={searchValue} /> </ul>

    </>
 
  )
}

export default App
