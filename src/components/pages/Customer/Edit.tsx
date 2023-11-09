import React, { useEffect, useState } from 'react'

import useFetch from '../../../hooks/useFetch'
import useBackendOneClientPrivate from '../../../hooks/useBackendOneClientPrivate'
import BackendOneClient from '../../../clients/BackendOneClient'
import useDocumentTitle from '../../../hooks/useDocumentTitle'
import { useNavigate, useParams } from 'react-router-dom'

import CustomerForm from '../../fragments/CustomerForm'
import { confirmAlert, successAlert, errorAlert } from '../../elements/CustomAlert'

import { Button } from '@nextui-org/react'
import { AiOutlineArrowLeft } from 'react-icons/ai'

import getGeoLocation from '../../../utils/GetGeolocation'

const Edit = (): React.ReactElement => {
  useDocumentTitle('Edit Customer')

  const navigate = useNavigate()
  const backendOneClientPrivate = useBackendOneClientPrivate()
  const client = new BackendOneClient()

  const { id } = useParams()
  const url = `api/v1/users/${id}`
  const { data } = useFetch(url)
  const users = useFetch('api/v1/users').data?.data.users

  const oldUsername = data?.data.username
  const oldEmail = data?.data.email

  const [fields, setFields] = useState({
    fullName: '',
    gender: '',
    address: '',
    username: '',
    email: '',
    oldPassword: '',
    password: '',
    confirmPassword: '',
    lastLatitude: 0,
    lastLongitude: 0
  })

  useEffect(() => {
    getGeoLocation(fields, setFields)
  }, [])

  useEffect(() => {
    setFields({
      fullName: data?.data.fullName,
      gender: data?.data.gender,
      address: data?.data.address,
      username: data?.data.username,
      email: data?.data.email,
      oldPassword,
      password,
      confirmPassword,
      lastLatitude: 0,
      lastLongitude: 0
    })
  }, [data])

  const { fullName, gender, address, username, email, oldPassword, password, confirmPassword, lastLatitude, lastLongitude } = fields

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    // empty validation
    if (fullName === '' || address === '' || username === '' || email === '') {
      errorAlert('Oops...', 'Please fill all the fields!')
      return
    }

    // username validation
    if (/\s/g.test(username)) {
      errorAlert('Oops...', 'Username cannot contain whitespace!')
      return
    }
    const usernameUnique = users.filter((user: any) => user.username === username.toLowerCase().replace(/\s+/g, ''))
    if (usernameUnique?.length !== 0 && username !== oldUsername) {
      errorAlert('Oops...', 'Username already registered!')
      return
    }

    // email validation
    if (!email.includes('@')) {
      errorAlert('Oops...', 'Please enter a valid email!')
      return
    }
    const emailUnique = users.filter((user: any) => user.email === email.toLowerCase().replace(/\s+/g, ''))
    if (emailUnique?.length !== 0 && email !== oldEmail) {
      errorAlert('Oops...', 'Email already registered!')
      return
    }

    // password validation
    if (oldPassword.length < 8) {
      errorAlert('Oops...', 'Password must be at least 8 characters!')
      return
    }

    if (password !== '' && password.length < 8) {
      errorAlert('Oops...', 'Password must be at least 8 characters!')
      return
    }

    if (password !== '' && password !== confirmPassword) {
      errorAlert('Oops...', 'Password and confirm password must be the same!')
      return
    }

    const reqPassword = password === '' ? oldPassword : password

    client.instance.post('api/v1/authentications/users/login?method=email_and_password', {
      email: fields.email,
      password: fields.oldPassword
    }).then(() => {
      void confirmAlert(
        'Are you sure your data is correct?',
        '',
        'Yes, update it!',
        'No, cancel!'
      )
        .then((result) => {
          result.isConfirmed === true &&
          backendOneClientPrivate.patch(`api/v1/users/${id}`, {
            fullName,
            gender,
            address,
            username,
            email,
            oldPassword,
            password: reqPassword,
            lastLatitude,
            lastLongitude
          })
            .then(() => {
              successAlert('Updated!', 'Customer updated successfully!')
              setFields({
                fullName: '',
                gender: '',
                address: '',
                username: '',
                email: '',
                oldPassword: '',
                password: '',
                confirmPassword: '',
                lastLatitude: 0,
                lastLongitude: 0
              })
              navigate('/customers')
            }).catch((err: any) => {
              errorAlert('Error!', err.response.data.message)
            })
        })
    }).catch((err: any) => {
      if (err.response.status === 404) {
        errorAlert('Oops...', 'The current password is wrong!')
      } else {
        errorAlert('Oops...', 'Something went wrong!')
      }
    })
  }

  return (
    <div className="bg-white py-5 md:px-3">
      <div className="flex justify-between mx-4 mb-4">
        <h2 className="font-semibold text-xl sm:text-2xl md:text-xl lg:text-2xl">Edit Customer</h2>
        <Button
          onPress={() => { navigate('/customers') }}
          variant="bordered"
          className="flex items-center border border-jajanDark2 text-jajanDark2 rounded-md p-2 hover: shadow-md hover:shadow-jajanWarning focus:shadow-md focus:shadow-jajanWarning transition-all ease-in-out duration-100"
        >
          <AiOutlineArrowLeft/>
          Back
        </Button>
      </div>
      {
        data?.data !== undefined &&
        <CustomerForm
          className="p-4"
          action={handleSubmit}
          data={data?.data}
          fields={fields}
          setFields={setFields}
        />
      }
    </div>
  )
}

export default Edit
