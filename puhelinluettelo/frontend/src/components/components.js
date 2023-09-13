  const Filter = (props) => {
    return(
      <div>
      filter shown with: <input
      value={props.newFilter}
      onChange={props.handleFilterChange}
      />
    </div>
    )
  }
  
  const AddNew = (props) => {
    return (
      <form onSubmit={props.addPerson}>
      <div>
        name: <input 
        value={props.newName}
        onChange={props.handleNameChange}
        />
      </div>
      <div>
        number: <input 
        value={props.newNumber}
        onChange={props.handleNumberChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
    )
  }
  
  const Numbers = (props) => {
    const filter = props.persons.filter((person) => 
    person.name.toLocaleLowerCase().includes(props.newFilter.toLocaleLowerCase())
    )
    return (
    <ul>
      {filter.map((person) => (
      <li key={person.name}>{person.name} {person.number} 
      <button onClick={() => props.handleDeletePerson(person)}>delete</button>
      </li>
      ))}
    </ul>
    )
  }

  const ConfimationButton = (props) => {
    const confirm = window.confirm(props)
    if (confirm) {
      return true
    }
  }

  const Notification = ( {message, truth} ) => {
    if (message ===null) {
      return null
    }
    else if (truth === false) {
      return(
        <div className="error">
          {message}
        </div>
      )
    }
    return (
      <div className="success">
        {message}
      </div>
    )
  }

  const objects = {
    Filter,
    AddNew,
    Numbers,
    ConfimationButton,
    Notification
  }
  
  export default objects
