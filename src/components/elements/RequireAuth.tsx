import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuthentication from '../../hooks/useAuthentication.ts'
import { useLogout } from '../../hooks/useLogout.tsx'

const RequireAuth = (): React.ReactElement => {
  const { authentication } = useAuthentication()
  const location = useLocation()
  const { logout } = useLogout()

  const isAccountValid = (): boolean => {
    const isAuthValid = authentication !== undefined && authentication !== null
    if (!isAuthValid) return false

    const isSessionValid = authentication.session !== undefined && authentication.session !== null
    const isAccountTypeAdmin = authentication.session?.accountType === 'ADMIN'
    return isSessionValid && isAccountTypeAdmin
  }

  const isRefreshTokenExpired = (): boolean => {
    const expiredAt = new Date(authentication.session?.expiredAt)
    const now = new Date()
    return expiredAt < now
  }

  if (isAccountValid()) {
    if (isRefreshTokenExpired()) {
      return logout()
    } else {
      return <Outlet />
    }
  } else {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace={true}
      />
    )
  }
}

export default RequireAuth
