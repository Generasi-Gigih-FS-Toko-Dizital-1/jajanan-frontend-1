import React, { createContext, useState } from 'react'

const AuthenticationContext = createContext({})

const AuthenticationProvider = (props: any): React.ReactElement => {
  const getAuthInitialState = (): any => {
    const authentication = localStorage.getItem('authentication')
    return authentication === null ? undefined : JSON.parse(authentication)
  }

  const [authentication, setAuthentication] = useState(getAuthInitialState())

  if (authentication !== undefined) {
    localStorage.setItem('authentication', JSON.stringify(authentication))
  }

  return (
    <AuthenticationContext.Provider value={{ authentication, setAuthentication }}>
      {props.children}
    </AuthenticationContext.Provider>
  )
}

export { AuthenticationContext }
export default AuthenticationProvider
