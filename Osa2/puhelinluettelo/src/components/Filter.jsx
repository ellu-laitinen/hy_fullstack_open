const Filter = ({filter, handleFilter}) => {
    return (
        <p>filter<input value={filter} onChange={handleFilter}/></p>
    )
}

export default Filter