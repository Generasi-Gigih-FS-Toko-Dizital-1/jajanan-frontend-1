import LoginForm from '../fragments/login-form'
import React from 'react'

export default function Login (): React.ReactElement {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-jajanWarning">
      <LoginForm />
    </div>
  )
}
