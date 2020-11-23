import axios from 'axios'
//import storage from '../utils/storage'

const baseUrl = '/api/users'

/*const getConfig = () => {
  return {
    headers: { Authorization: `bearer ${storage.loadUser().token}` }
  }
}*/

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default { getAll }