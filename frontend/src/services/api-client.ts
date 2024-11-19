import axios from 'axios'

// Would be nice to handle aborting
export default axios.create({
  baseURL: 'http://localhost:8000/api/v1',
})
