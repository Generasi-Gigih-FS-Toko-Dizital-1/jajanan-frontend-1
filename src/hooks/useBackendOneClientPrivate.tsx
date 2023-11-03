import { useEffect } from 'react'
import BackendOneClient from '../clients/BackendOneClient'
import useAuthentication from './useAuthentication.ts'
import useRefreshAccessToken from './useRefreshAccessToken.tsx'

const useBackendOneClientPrivate = (): any => {
  const refreshAccessToken = useRefreshAccessToken()
  const { authentication } = useAuthentication()
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
