import { useState, useEffect } from 'react'
import personService from './services/persons'
import components from './components/components'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [truth, setTruth] = useState(true)

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const a = persons.filter(function(person) {
      return person.name === newName
    })
    if (a.length > 0) {
      console.log(a)
      ifPersonExists(a)
      return
    }
    newPerson()
  }

  const ifPersonExists = (props) => {
    const confirm = components.ConfimationButton(`${props[0].name} is already added to phonebook, replace
    the old number with a new one?`
    )
    const personObject = createPerson()
    if (confirm) {
      personService
        .updatePerson(props[0].id, personObject)
        .then(response => {
          updatePersons()
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setTruth(false)
          setErrorMessage(`${newName} has already been removed from the server`)
          console.log('Update of existing object failed')
        })
        setErrorMessage(`${newName} updated`)
        timeout()
        
    }
  }

  const newPerson = () => {
    const personObject = createPerson()
    personService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        setTruth(false)
        setErrorMessage('Creation of a new object failed')
        console.log('Creation of a new object failed')
      })
      setErrorMessage(`Added ${newName}`)
      timeout()
  }

  const createPerson = () => {
    const personObject = {
      name: newName,
      number: newNumber
    }
    return personObject
  }

  const handleDeletePerson = (props) => {
    const confirm = components.ConfimationButton(`Delete ${props.name}?`
    )
    if (confirm) {
      personService
      .deletePerson(props.id)
      .then(response => {
        updatePersons()
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        setTruth(false)
        setErrorMessage('Object deletion failed')
        console.log('Object deletion failed')
      })
      setErrorMessage(`Deleted ${props.name}`)
      timeout()
    }

  }

  const updatePersons = () => {
    personService
    .getAll()
    .then(response => {
      setPersons(response.data)
    })
    .catch(error => {
      setTruth(false)
      setErrorMessage('Update of local list failed')
      console.log('Update of local list failed')
    })

  }

  const timeout = () => {
    return (
      setTimeout(() => {          
        setErrorMessage(null)        
      }, 2000)
    )
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)

  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
    
  }
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <components.Notification message={errorMessage} truth={truth}/>
      <components.Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>add new</h2>
      <components.AddNew addPerson={addPerson} newName={newName} newNumber={newNumber}
      handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <components.Numbers handleDeletePerson={handleDeletePerson} persons={persons} newFilter={newFilter} />
    </div>
  )
}

export default App
