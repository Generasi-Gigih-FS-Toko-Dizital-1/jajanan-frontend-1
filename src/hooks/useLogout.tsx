import BackendOneClient from '../clients/BackendOneClient'

const client = new BackendOneClient()
export const useLogout = (): any => {
  const logout = (session: any, setAuthentication: any, navigate: any): void => {
    client.instance.post('api/v1/authentications/admins/logout', {
      session
    })
      .then(() => {
        setAuthentication(null)
        localStorage.removeItem('authentication')
        navigate('/login')
      })
      .catch((err: any) => { console.log(err) })
  }

  return { logout }
}
