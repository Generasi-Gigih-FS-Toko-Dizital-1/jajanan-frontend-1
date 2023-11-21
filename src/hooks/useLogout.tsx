import { useNavigate } from 'react-router-dom'
import BackendOneClient from '../clients/BackendOneClient'
import useAuthentication from './useAuthentication'

const client = new BackendOneClient()
export const useLogout = (): any => {
  const navigate = useNavigate()
  const { authentication, setAuthentication } = useAuthentication()

  const logout = (): void => {
    client.instance.post('api/v1/authentications/admins/logout', {
      session: authentication.session
    })
      .then(() => {
        setAuthentication(null)
        localStorage.removeItem('authentication')
        navigate('/login')
      })
      .catch((err: any) => {
        if (err.message === 'Admin logout failed, admin not found' || err.message === 'Admin logout failed, session did not match.' || err.message === 'Admin logout failed, unknown session.') {
          setAuthentication(null)
          localStorage.removeItem('authentication')
          navigate('/login')
        }
      })
  }

  return { logout }
}
