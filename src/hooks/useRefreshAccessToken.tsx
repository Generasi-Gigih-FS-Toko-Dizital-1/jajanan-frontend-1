import BackendOneClient from '../clients/BackendOneClient'
import useAuthentication from './useAuthentication.ts'

const useRefreshAccessToken = (): any => {
  const client = new BackendOneClient()
  const { authentication, setAuthentication } = useAuthentication()

  const refresh = async (): Promise<string> => {
    const response = await client.instance.post('api/v1/authentications/admins/refreshes/access-token', {
      session: authentication.session
    })

    setAuthentication(response.data.data)
    localStorage.setItem('authentication', JSON.stringify(response.data.data))

    return response.data.data.session.accessToken
  }

  return refresh
}

export default useRefreshAccessToken
