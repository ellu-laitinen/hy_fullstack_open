import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll= () =>{
    const request = axios.get(baseUrl+"/all")
     return request.then(response => {
       return response.data
     })

    }

    const getOne= (name) =>{
      const request = axios.get(`${baseUrl}/name/${name}`)
      console.log(`URL ${baseUrl}/name/${name}`)
       return request.then(response => {
         return response.data
       })
  
      }

     export default {getAll, getOne}

