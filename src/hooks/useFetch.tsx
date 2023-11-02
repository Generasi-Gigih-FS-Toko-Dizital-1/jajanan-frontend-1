import { useEffect, useState } from 'react'

import useBackendOneClientPrivate from './useBackendOneClientPrivate.tsx'

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

  const backendOneClientPrivate = useBackendOneClientPrivate()

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response = await backendOneClientPrivate.get(url)
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
