import Person from "./Person"

const Persons = ({namesToShow, removeName, id}) => {

    return (
        <div>
        <h2>Numbers</h2>
        {namesToShow.map(person => 
        <Person key={person.name} 
        person={person} 
        id={person.id}
        removeName={() => removeName(person.id, person.name)}>
        </Person>)}

        </div>
    )
}

export default Persons