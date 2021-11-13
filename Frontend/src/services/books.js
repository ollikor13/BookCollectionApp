import axios from 'axios'

const baseUrl = "http://localhost:3001/api/books"

const getAll = () => {
  // eslint-disable-next-line no-useless-concat
  const request = axios.get(baseUrl)
  return request.then(response => {
    return response.data
  })
}

const getBook = (id) => {
  const request = axios.get(`${baseUrl}/${id}`)
  return request.then(response => {
    return response.data
  })
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const remove = (id) => {
    const deleUrl = baseUrl + "/" + id
    axios.delete(deleUrl)
}
export default { getAll,getBook, create, update, remove }