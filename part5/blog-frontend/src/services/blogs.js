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

const addNew = async (payload,token)=>{
  let config = {
    headers:{
      "Authorization":`Bearer ${token}`
    }
  }
  const request = await axios.post(`${baseUrl}/blogs`,payload,config)
  return request.data
}

const updateBlog = async(payload,token)=>{
  let config = {
    headers:{
      "Authorization":`Bearer ${token}`
    }
  }
  const request = await axios.put(`${baseUrl}/blogs/${payload.id}`,payload,config)
  return request.data
}


const deleteBlog = async(id,token)=>{
  let config = {
    headers:{
      "Authorization":`Bearer ${token}`
    }
  }
  const request = await axios.delete(`${baseUrl}/blogs/${id}`,config)
  return request
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll,login,addNew, updateBlog,deleteBlog }