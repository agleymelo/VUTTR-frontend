import { useHistory } from 'react-router-dom'

import axios from 'axios'

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL
})

api.interceptors.response.use(
  config => config,
  error => {
    const { data } = error.response

    if (data?.message === 'Invalid JWT Token') {
      localStorage.removeItem('@VUTTR:token')
      localStorage.removeItem('@VUTTR:user')
      useHistory().push('/')
    }
  }
)

export default api
