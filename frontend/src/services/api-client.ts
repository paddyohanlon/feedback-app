import axios from 'axios'

// Would be nice to handle aborting
export default axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000/api/v1',
})

export function axiosErrorHandler(err: unknown) {
  if (axios.isAxiosError(err)) {
    if (err.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(err.response.data)
      console.log(err.response.status)
      console.log(err.response.headers)
    } else if (err.request) {
      // The request was made but no response was received
      // `err.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(err.request)
    }
  } else {
    // Something happened in setting up the request that triggered an err
    console.log('Error', err)
  }
}
