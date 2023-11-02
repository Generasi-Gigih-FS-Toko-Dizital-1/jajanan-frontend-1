import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuthentication from '../../hooks/useAuthentication.ts'

const RequireAuth = (): React.ReactElement => {
  const { authentication }: any = useAuthentication()
  const location = useLocation()

  const isAccountValid = (): boolean => {
    const isAuthValid = authentication !== undefined && authentication !== null
    const isSessionValid = authentication.session !== undefined && authentication.session !== null
    const isAccountTypeAdmin = authentication.session.accountType === 'ADMIN'
    return isAuthValid && isSessionValid && isAccountTypeAdmin
  }

  return (
    isAccountValid()
      ? <Outlet />
      : <Navigate
          to='/login'
          state={{ from: location }}
          replace={true}
        />
  )
}

export default RequireAuth
