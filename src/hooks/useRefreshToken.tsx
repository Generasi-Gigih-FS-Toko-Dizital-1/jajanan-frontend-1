import BackendOneClient from '../clients/BackendOneClient'
import useAuth from './useAuth'

const useRefreshToken = (): any => {
  const client = new BackendOneClient()
  const { auth, setAuth } = useAuth()

  const refresh = async (): Promise<string> => {
    const response = await client.instance.post('api/v1/authentications/admins/refreshes/access-token',
      {
        session: {
          account_id: auth.session.accountId,
          account_type: auth.session.accountType,
          access_token: auth.session.accessToken,
          refresh_token: auth.session.refreshToken,
          expired_at: auth.session.expiredAt
        }
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

export default useRefreshToken
