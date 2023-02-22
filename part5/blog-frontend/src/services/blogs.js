import axios from 'axios'
const baseUrl = 'http://localhost:5000/api'

const getAll = (token) => {
  let config = {
    headers:{
      "Authorization":`Bearer ${token}`
    }
  }
  const request = axios.get(`${baseUrl}/blogs`,config)
  return request.then(response => response.data)
}


const login = (username,password)=>{
    const request = axios.post(`${baseUrl}/login`,{username,password})
    return request.then(response=>response.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll,login }