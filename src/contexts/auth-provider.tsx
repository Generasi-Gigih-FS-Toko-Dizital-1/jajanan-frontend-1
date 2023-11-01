import React, { createContext, useState } from 'react'

const AuthContext = createContext({})

export const AuthProvider = ({ children }: any): React.ReactElement => {
  const [auth, setAuth] = useState({})

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
