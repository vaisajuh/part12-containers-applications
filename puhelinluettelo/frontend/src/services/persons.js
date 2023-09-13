import axios from 'axios'
const baseUrl = 'http://0.0.0.0:3001/persons'

const create = newObject => {
    return axios.post(baseUrl, newObject)
  }

const getAll = () => {
  return axios.get(baseUrl)
  }

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`, id)
}

const updatePerson = (id, newPerson) => {
  return axios.put(`${baseUrl}/${id}`, newPerson)
}

const objects = {
  create,
  getAll,
  deletePerson,
  updatePerson
}

export default objects