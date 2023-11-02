import React, { createContext, useEffect, useState } from 'react'

const AuthenticationContext = createContext({})

const AuthenticationProvider = (props: any): React.ReactElement => {
  const getAuthInitialState = (): any => {
    const authentication = localStorage.getItem('authentication')
    return authentication === null ? {} : JSON.parse(authentication)
  }

  const [authentication, setAuthentication] = useState(getAuthInitialState())

  useEffect(() => {
    localStorage.setItem('authentication', JSON.stringify(authentication))
  }, [authentication])

  return (
    <AuthenticationContext.Provider value={{ authentication, setAuthentication }}>
      {props.children}
    </AuthenticationContext.Provider>
  )
}

export { AuthenticationContext }
export default AuthenticationProvider
