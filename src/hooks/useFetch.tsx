import { useState, useEffect } from 'react'
import { type AxiosRequestConfig } from 'axios'

import useAxiosPrivate from './useAxiosPrivate'

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

const useFetch = (url: string): FetchReturn => {
  const [data, setData] = useState<DataFetch>()
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error>()

  const axiosPrivate = useAxiosPrivate()

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response = await axiosPrivate.get(url)
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
