const Form = ({addName, newName, newNumber, handleNameChange, handleNumberChange}) => {
    return (
        <form onSubmit={addName}>
        <div>
          <h2>add new</h2>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )

}

export default Form