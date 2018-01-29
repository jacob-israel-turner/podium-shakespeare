import axios from 'axios'

const baseURL = 'http://shakespeare.podium.co/api'
const authToken = 'koOheljmQX'

const instance = axios.create({
  baseURL,
  headers: { Authorization: authToken }
})

export default instance
