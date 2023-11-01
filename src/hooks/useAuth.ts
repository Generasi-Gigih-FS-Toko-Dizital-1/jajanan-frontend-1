import { useContext } from 'react'
import AuthContext from '../contexts/auth-provider'

const useAuth = (): any => {
  return useContext(AuthContext)
}

export default useAuth
