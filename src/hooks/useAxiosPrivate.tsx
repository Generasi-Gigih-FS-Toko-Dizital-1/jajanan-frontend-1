import { useEffect } from 'react'
import { axiosPrivate } from '../clients/BackendOneClient'
import useAuth from './useAuth'
import useRefreshToken from './useRefreshToken'

const useAxiosPrivate = (): any => {
  const refresh = useRefreshToken()
  const { auth } = useAuth()

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (config.headers.Authorization === undefined) {
          config.headers.Authorization = `Bearer ${auth.session.accessToken}`
        }
        return config
      }, async (error) => {
        return await Promise.reject(error)
      }
    )

    const responseIntercept = axiosPrivate.interceptors.response.use(
      response => response,
      async (error) => {
        const prevRequest = error?.config
        if (error?.response?.status === 403 && prevRequest?.sent !== true) {
          prevRequest.sent = true
          const accessToken = await refresh()
          prevRequest.headers.Authorization = `Bearer ${accessToken}`
          return await axiosPrivate(prevRequest)
        }
        return await Promise.reject(error)
      }
    )

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept)
      axiosPrivate.interceptors.response.eject(responseIntercept)
    }
  }, [auth, refresh])

  return axiosPrivate
}

export default useAxiosPrivate
