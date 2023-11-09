import React, { useEffect, useState } from 'react'

import useBackendOneClientPrivate from '../../../hooks/useBackendOneClientPrivate'
import useFetch from '../../../hooks/useFetch'
import useDocumentTitle from '../../../hooks/useDocumentTitle'
import { useNavigate } from 'react-router-dom'

import AdminForm from '../../fragments/AdminForm'
import { Button } from '@nextui-org/react'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { successAlert, errorAlert } from '../../elements/CustomAlert'

import getGeoLocation from '../../../utils/GetGeolocation'

const Add = (): React.ReactElement => {
  useDocumentTitle('Add Admin')

  const navigate = useNavigate()
  const backendOneClientPrivate = useBackendOneClientPrivate()

  const url = 'api/v1/admins'
  const { data } = useFetch(url)

  const [fields, setFields] = useState({
    fullName: '',
    gender: '',
    email: '',
    password: '',
    confirmPassword: '',
    lastLatitude: 0,
    lastLongitude: 0
  })

  useEffect(() => {
    getGeoLocation(fields, setFields)
  }, [])

  const { fullName, gender, email, password, confirmPassword, lastLatitude, lastLongitude } = fields

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    // empty validation
    if (fullName === '' || email === '') {
      errorAlert('Oops...', 'Please fill all the fields!')
      return
    }

    // email validation
    if (!email.includes('@')) {
      errorAlert('Oops...', 'Please enter a valid email!')
      return
    }
    const emailUnique = data?.data.admins.filter((admin: any) => admin.email === email.toLowerCase().replace(/\s+/g, ''))
    if (emailUnique?.length !== 0) {
      errorAlert('Oops...', 'Email already registered!')
      return
    }

    // password validation
    if (password.length < 8) {
      errorAlert('Oops...', 'Password must be at least 8 characters!')
      return
    }

    if (password !== confirmPassword) {
      errorAlert('Oops...', 'Password and confirm password must be same!')
    }

    backendOneClientPrivate.post('api/v1/admins', {
      fullName,
      gender,
      email,
      password,
      lastLatitude,
      lastLongitude
    })
      .then(() => {
        successAlert('Added!', 'Admin has been added!')
        setFields({
          fullName: '',
          email: '',
          gender: '',
          password: '',
          confirmPassword: '',
          lastLatitude: 0,
          lastLongitude: 0
        })
        navigate('/admins')
      })
      .catch((err: any) => {
        errorAlert('Error!', err.response.data.message)
      })
  }

  return (
    <div className="bg-white py-5 md:px-3">
      <div className="flex justify-between mx-4 mb-4">
        <h2 className="font-semibold text-xl sm:text-2xl md:text-xl lg:text-2xl">Add Admin</h2>
        <Button
          onPress={() => { navigate('/admins') }}
          variant="bordered"
          className="flex items-center border border-jajanDark2 text-jajanDark2 rounded-md p-2 hover: shadow-md hover:shadow-jajanWarning focus:shadow-md focus:shadow-jajanWarning transition-all ease-in-out duration-100"
        >
          <AiOutlineArrowLeft/>
          Back
        </Button>
      </div>
      <AdminForm
        className="p-4"
        action={handleSubmit}
        fields={fields}
        setFields={setFields}
      />
    </div>
  )
}

export default Add
