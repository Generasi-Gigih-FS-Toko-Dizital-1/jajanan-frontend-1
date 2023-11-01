import axios, { type AxiosInstance } from 'axios'
import applyCaseMiddleware from 'axios-case-converter'

export default class BackendOneClient {
  instance: AxiosInstance

  constructor () {
    const baseUrl: string | null = import.meta.env.VITE_BACKEND_ONE_URL
    if (baseUrl === null) {
      throw new Error('Backend One URL is not defined.')
    }

    this.instance = axios.create({
      baseURL: baseUrl
    })
    this.instance = applyCaseMiddleware(this.instance)
  }
}

export const axiosPrivate = applyCaseMiddleware(axios.create({
  baseURL: import.meta.env.VITE_BACKEND_ONE_URL,
  headers: { 'Content-Type': 'application/json' }
}))
