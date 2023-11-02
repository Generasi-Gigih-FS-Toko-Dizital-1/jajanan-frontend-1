import BackendOneClient from '../clients/BackendOneClient'
import useAuthentication from './useAuthentication.ts'

const useRefreshAccessToken = (): any => {
  const client = new BackendOneClient()
  const { auth, setAuth } = useAuthentication()

  const refresh = async (): Promise<string> => {
    const response = await client.instance.post('api/v1/authentications/admins/refreshes/access-token',
      {
        session: auth.session
      }
    )
    // setAuth((prev: any) => {
    //   console.log(JSON.stringify(prev))
    //   console.log(response.data.data.session.accessToken)
    //   return { ...prev, accessToken: response.data.data.session.accessToken }
    // })

    setAuth((prev: any) => {
      console.log(prev)
      return {
        ...prev,
        session: response.data.data.session
      }
    })

    return response.data.data.session.accessToken
  }

  return refresh
}

export default useRefreshAccessToken
