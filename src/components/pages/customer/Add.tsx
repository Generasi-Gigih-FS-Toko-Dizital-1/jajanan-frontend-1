import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useBackendOneClientPrivate from '../../../hooks/useBackendOneClientPrivate'
import { Button } from '@nextui-org/react'
import { AiOutlineArrowLeft } from 'react-icons/ai'

import CustomerForm from '../../fragments/CustomerForm'
import getGeoLocation from '../../../utils/GetGeolocation'
import useFetch from '../../../hooks/useFetch'

const Add = (): React.ReactElement => {
  const backendOneClientPrivate = useBackendOneClientPrivate()
  const url = 'api/v1/users?page_number=1&page_size=10'
  const { data } = useFetch(url)

  const [fields, setFields] = useState({
    fullName: '',
    gender: '',
    address: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    lastLatitude: 0,
    lastLongitude: 0
  })

  useEffect(() => {
    getGeoLocation(fields, setFields)
  }, [])

  const { fullName, gender, address, username, email, password, confirmPassword, lastLatitude, lastLongitude } = fields

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    // empty validation
    if (fullName === '' || address === '' || username === '' || email === '' || password === '' || confirmPassword === '') {
      alert('Please fill all the fields')
      return
    }

    // username unique validation
    const usernameUnique = data?.data.users.filter((user: any) => user.username === username.toLowerCase().replace(/\s+/g, ''))
    if (usernameUnique?.length !== 0) {
      alert('Username already registered')
      return
    }

    // email validation
    if (!email.includes('@')) {
      alert('Please enter a valid email')
      return
    }
    const emailUnique = data?.data.users.filter((user: any) => user.email === email.toLowerCase().replace(/\s+/g, ''))
    if (emailUnique?.length !== 0) {
      alert('Email already registered')
      return
    }

    // password validation
    if (password.length < 8) {
      alert('Password must be at least 8 characters')
      return
    }

    if (password !== confirmPassword) {
      alert('Password and confirm password must be same')
    }

    backendOneClientPrivate.post('api/v1/users', {
      fullName,
      gender,
      address,
      username,
      email,
      password,
      lastLatitude,
      lastLongitude
    })
      .then(() => {
        alert('Add customer Success')
        navigate('/customers')
      })
      .catch((err: any) => {
        console.log(err)
      })
  }

  const navigate = useNavigate()

  return (
    <div className="bg-white py-5 md:px-3">
      <div className="flex justify-between mx-4 mb-4">
        <h2 className="font-semibold text-xl sm:text-2xl md:text-xl lg:text-2xl">Add Customer</h2>
        <Button
          onPress={() => { navigate('/customers') }}
          variant="bordered"
          className="flex items-center border border-jajanDark2 text-jajanDark2 rounded-md p-2 hover: shadow-md hover:shadow-jajanWarning focus:shadow-md focus:shadow-jajanWarning transition-all ease-in-out duration-100"
        >
          <AiOutlineArrowLeft/>
          Back
        </Button>
      </div>
      <CustomerForm
        className="p-4"
        action={handleSubmit}
        fields={fields}
        setFields={setFields}
      />
    </div>
  )
}

export default Add
