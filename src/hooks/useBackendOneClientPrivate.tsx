import { useEffect } from 'react'
import BackendOneClient from '../clients/BackendOneClient'
import useAuthentication from './useAuthentication.ts'
import useRefreshAccessToken from './useRefreshAccessToken.tsx'
import { useNavigate } from 'react-router-dom'

const useBackendOneClientPrivate = (): any => {
  const navigate = useNavigate()
  const refreshAccessToken = useRefreshAccessToken()
  const { authentication, setAuthentication } = useAuthentication()
  const backEndOneClient: BackendOneClient = new BackendOneClient()

  useEffect(() => {
    const requestIntercept = backEndOneClient.instance.interceptors.request.use(
      (config) => {
        if (config.headers.Authorization === undefined) {
          config.headers.Authorization = `Bearer ${authentication.session.accessToken}`
        }
        return config
      }, async (error) => {
        return await Promise.reject(error)
      }
    )

    const responseIntercept = backEndOneClient.instance.interceptors.response.use(
      response => response,
      async (error) => {
        const prevRequest = error?.config
        if (error?.response?.status === 500 && error?.response?.data?.message === 'Validate authentication failed, jwt expired.') {
          if (prevRequest?.sent !== true) {
            prevRequest.sent = true
            const accessToken = await refreshAccessToken()
            prevRequest.headers.Authorization = `Bearer ${accessToken}`
            return await backEndOneClient.instance(prevRequest)
          }
        } else if (error?.response?.data?.message === 'Validate authentication failed, found session by authorization is unknown.') {
          setAuthentication(null)
          localStorage.removeItem('authentication')
          navigate('/login')
        }
        return await Promise.reject(error)
      }
    )

    return () => {
      backEndOneClient.instance.interceptors.request.eject(requestIntercept)
      backEndOneClient.instance.interceptors.response.eject(responseIntercept)
    }
  }, [authentication, refreshAccessToken])

  return backEndOneClient.instance
}

export default useBackendOneClientPrivate
