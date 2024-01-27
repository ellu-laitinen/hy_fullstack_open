import { useState, useEffect } from 'react'
import axios from 'axios'
import Form from './components/Form'
import Persons from './components/Persons'
import Filter from './components/Filter'
import personService from './services/person'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')
  const [message, setMessage] =useState(null)
  const [style, setStyle] = useState(null)

  useEffect(()=> {

  /*   if(!persons){ */
        personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
   /*  } */

  
  }, [])

  // show names according to filter value
  const namesToShow =  persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))



  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter= (event) => {
    setNewFilter(event.target.value)

  }

  const addName = (event) => {
    event.preventDefault()
    // check if person is already on the list
    if (persons.some(person => person.name === newName)){
     
      if (window.confirm(`${newName} is already added to phonebook, 
        replace the old number with the new one?`)) {
          const person = persons.find(p => p.name === newName)
     
          const id = person.id
          const changedNumber = {...person, number: newNumber}

          personService
          .update(id, changedNumber)
          .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
          setStyle("confirmation")
          setMessage(`Updated phone number for ${newName}`)
          setTimeout(() => {
          setMessage(null)
          setStyle(null)
          }, 5000)
        })
          .catch(error => {
            setStyle("error")
            setMessage(
              `${newName} was already deleted from server`
            )
            setTimeout(() => {
              setStyle(null)
              setMessage(null)
            }, 5000)
            setPersons(persons.filter(p => p.id !== id))
        })
      }
    } else {
      const nameObject = {
        name: newName,
        number: newNumber
    }
    personService
    .create(nameObject)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('') 
    })   
    setStyle("confirmation")
    setMessage(`Added ${newName}`)
    setTimeout(() => {
      setMessage(null)
      setStyle(null)
    }, 5000)
    }   
  }

  const removeName = (id, name) => {
    console.log("removing "+ id)
    if (window.confirm(`remove ${name}?`)) {
        personService
      .remove(id)
      .then(returnedPerson => {
        setPersons(persons.filter(p => p.id !== id))
        setStyle("confirmation")
        setMessage(`Removed ${name} from phonebook`)
        setTimeout(() => {
        setMessage(null)
        setStyle(null)
      }, 5000)
    })
    .catch(error => {
      setStyle("error")
      setMessage(
        ` ${name} was already deleted from server`
      )
      setTimeout(() => {
        setStyle(null)
        setMessage(null)
      }, 5000)
      setPersons(persons.filter(p => p.id !== id))
    })
 
    }
  
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} style={style}/>
    <Filter filter={filter} handleFilter={handleFilter}></Filter>
    <Form newName={newName} newNumber={newNumber} 
          addName={addName} handleNameChange={handleNameChange} 
          handleNumberChange={handleNumberChange} ></Form>
    <Persons namesToShow={namesToShow} removeName={removeName}></Persons>
    </div>
  )

}

export default App