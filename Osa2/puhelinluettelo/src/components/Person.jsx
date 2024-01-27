const Person = ({person, removeName}) => {
    return (
        <>
        <p key={person.name}>{person.name} {person.number}</p>
        <button onClick={removeName}>remove</button>
        </>
    )
}

export default Person