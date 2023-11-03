import { useContext } from 'react'
import { AuthenticationContext } from '../contexts/AuthenticationProvider.tsx'

const useAuthentication = (): any => {
  return useContext(AuthenticationContext)
}

export default useAuthentication
