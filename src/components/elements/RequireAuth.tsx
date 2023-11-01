import React from 'react'
import { useLocation, Navigate, Outlet } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const RequireAuth = (): React.ReactElement => {
  const { auth }: any = useAuth()
  const location = useLocation()

  return (
    auth.session !== undefined &&
    auth.session.accessToken !== undefined &&
    auth.session.accountType === 'ADMIN'
      ? <Outlet />
      : <Navigate
          to='/login'
          state={{ from: location }}
          replace={true}
        />
  )
}

export default RequireAuth
