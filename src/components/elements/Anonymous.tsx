import React from 'react'

import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuthentication from '../../hooks/useAuthentication'

export default function Anonymous (): React.ReactElement {
  const { authentication }: any = useAuthentication()
  const location = useLocation()

  if (authentication !== undefined && authentication !== null) {
    if (location.state !== undefined && location.state !== null) {
      return <Navigate to={location.state.from} replace />
    }
    return <Navigate to="/dashboard" replace />
  }
  return <Outlet />
}
