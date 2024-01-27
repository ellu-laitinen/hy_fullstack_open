const Form = ({handleSearchCountry}) => {
    return (
        <form >
        find countries <input  onChange={handleSearchCountry}/>
  
      </form>
    )

}

export default Form