import axios from 'axios'

export const http = axios.create({
  baseURL: 'https://url-shortener-api-1i7w.onrender.com'
  // baseURL: 'http://192.168.0.4:8080'
})
