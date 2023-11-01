import { useState, useEffect } from 'react'
import { type AxiosRequestConfig } from 'axios'
import BackendOneClient from '../clients/BackendOneClient'

export type Config = AxiosRequestConfig
interface DataFetch {
  message: string
  data: any
}
interface FetchReturn {
  data?: DataFetch
  loading: boolean
  error?: Error
}

const useFetch = (url: string, config: Config = {}): FetchReturn => {
  const [data, setData] = useState<DataFetch>()
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error>()

  const client = new BackendOneClient()

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response = await client.instance.get(url, config)
        setData(response.data)
        setLoading(false)
      } catch (error: any) {
        setError(error)
        setLoading(false)
      }
    }

    void fetchData()
  }, [url])

  return { data, loading, error }
}

export default useFetch
