import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (aObject) => {
  const request = axios.post(baseUrl, aObject)
  return request.then(response => response.data)
}

const update = (id, aObject) => {
  const request = axios.put(`${baseUrl}/${id}`, aObject)
  return request.then(response => response.data)
}

const cancel = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}


export default { 
  getAll: getAll, 
  create: create, 
  update: update, 
  cancel: cancel
}