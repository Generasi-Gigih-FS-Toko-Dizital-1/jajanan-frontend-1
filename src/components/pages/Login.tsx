/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useState } from 'react'

import BackendOneClient from '../../clients/BackendOneClient'
import useAuthentication from '../../hooks/useAuthentication'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import { useNavigate, useLocation } from 'react-router-dom'

import LoginForm from '../fragments/LoginForm'
import { errorAlert } from '../elements/CustomAlert'

export default function Index (): React.ReactElement {
  useDocumentTitle('Login')

  const client = new BackendOneClient()
  const { setAuthentication }: any = useAuthentication()

  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/dashboard'

  const [passwordShown, setPasswordShown] = useState(false)
  const [fields, setFields] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    // empty validation
    if (fields.email === '' || fields.password === '') {
      errorAlert('Oops...', 'Please fill all the fields!')
      return
    }

    // email validation
    if (!fields.email.includes('@')) {
      errorAlert('Oops...', 'Please enter a valid email!')
      return
    }

    // password validation
    if (fields.password.length < 8) {
      errorAlert('Oops...', 'Password must be at least 8 characters!')
      return
    }

    client.instance.post('api/v1/authentications/admins/login?method=email_and_password', {
      email: fields.email,
      password: fields.password
    })
      .then((res) => {
        setAuthentication({
          session: res.data.data.session
        })
        navigate(from, { replace: true })
      })
      .catch((err) => {
        if (err.response.status === 404) {
          errorAlert('Oops...', 'Wrong email or password!')
        } else {
          errorAlert('Oops...', 'Something went wrong!')
        }
      })

    setFields({
      email: '',
      password: ''
    })
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen w-screen bg-jajanWarning'>
      <div className='flex rounded-xl border-2 border-jajanDark2 shadow-xl items-center justify-center w-11/12 sm:w-[480px] md:w-[732.86px] md:h-[500px] bg-white lg:w-[879.43px] lg:h-[600px]'>
        <div className='flex flex-col items-center justify-center h-full w-full md:w-[55%] pb-10'>
          <img
            src='/images/jajanmania-logo.svg'
            alt='Logo-1'
            className='w-28 sm:w-36 object-cover mt-6 sm:mt-10 mb-1 md:hidden'
          />
          <h1 className='font-medium text-xl sm:text-2xl text-center mb-5'>
            Login Admin
          </h1>

          <LoginForm
            passwordShown={passwordShown}
            setPasswordShown={setPasswordShown}
            fields={fields}
            setFields={setFields}
            handleSubmit={handleSubmit}
          />

          <div className='mt-14 md:hidden scale-90'>
            <p className='text-xs flex justify-center items-center mb-4'>
              by
              <img
                src='/images/toko-dizital-logo.svg'
                alt='Logo-1'
                className='object-cover mt-1'
              />
            </p>
            <p className='text-xs scale-95 text-center'>
              In collaboration with
            </p>
            <img
              src='/images/goto-logo.svg'
              alt='Logo-1'
              className='object-cover mt-1'
            />
          </div>
        </div>
        <div className='hidden md:flex flex-col text-center justify-between items-center border-l-2 border-jajanDark2 h-full w-[45%] py-10'>
          <div>
            <img
              src='/images/jajanmania-logo.svg'
              alt='Logo-1'
              className='object-cover mt-1'
            />
            <p className='text-sm flex justify-center items-center'>
              by
              <img
                src='/images/toko-dizital-logo.svg'
                alt='Logo-1'
                className='object-cover mt-1'
              />
            </p>
          </div>
          <div>
            <p className='text-xs'>In collaboration with</p>
            <img
              src='/images/goto-logo.svg'
              alt='Logo-1'
              className='object-cover mt-1'
            />
          </div>
        </div>
      </div>
    </div>
  )
}
