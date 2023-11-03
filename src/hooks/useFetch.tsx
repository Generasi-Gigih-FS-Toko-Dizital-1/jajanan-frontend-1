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
    backendOneClientPrivate.get(url)
      .then((response: any) => {
        setData(response.data)
      }).catch((err: any) => {
        setError(err)
      }).finally(() => {
        setLoading(false)
      })
  }, [])

  return { data, loading, error }
}

export default useFetch
