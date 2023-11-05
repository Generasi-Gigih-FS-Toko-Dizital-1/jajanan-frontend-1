import React, { useState, useEffect } from 'react'

import useBackendOneClientPrivate from '../../../hooks/useBackendOneClientPrivate'
import useFetch from '../../../hooks/useFetch'
import { useNavigate } from 'react-router-dom'

import VendorForm from '../../fragments/VendorForm'
import { Button } from '@nextui-org/react'
import { AiOutlineArrowLeft } from 'react-icons/ai'

import getGeoLocation from '../../../utils/GetGeolocation'

const Add = (): React.ReactElement => {
  const navigate = useNavigate()
  const backendOneClientPrivate = useBackendOneClientPrivate()

  const url = 'api/v1/vendors'
  const { data } = useFetch(url)

  const [fields, setFields] = useState({
    fullName: '',
    gender: '',
    address: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    jajanImageUrl: '',
    jajanName: '',
    jajanDescription: '',
    status: 'ON',
    lastLatitude: 0,
    lastLongitude: 0
  })

  useEffect(() => {
    getGeoLocation(fields, setFields)
  }, [])

  const { fullName, gender, address, username, email, password, confirmPassword, jajanImageUrl, jajanName, jajanDescription, status, lastLatitude, lastLongitude } = fields

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    // empty validation
    if (fullName === '' || gender === '' || address === '' || username === '' || email === '' || password === '' || confirmPassword === '' || jajanImageUrl === '' || jajanName === '' || jajanDescription === '') {
      alert('Please fill all the fields')
      return
    }

    // username unique validation
    const usernameUnique = data?.data.vendors.filter((vendor: any) => vendor.username === username.toLowerCase().replace(/\s+/g, ''))
    if (usernameUnique?.length !== 0) {
      alert('Username already registered')
      return
    }

    // email validation
    if (!email.includes('@')) {
      alert('Please enter a valid email')
      return
    }
    const emailUnique = data?.data.vendors.filter((vendor: any) => vendor.email === email.toLowerCase().replace(/\s+/g, ''))
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

    backendOneClientPrivate.post('api/v1/vendors', {
      fullName,
      gender,
      address,
      username,
      email,
      password,
      jajanImageUrl,
      jajanName,
      jajanDescription,
      status,
      lastLatitude,
      lastLongitude
    })
      .then(() => {
        alert('Add vendor Success')
        setFields({
          fullName: '',
          gender: '',
          address: '',
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
          jajanImageUrl: '',
          jajanName: '',
          jajanDescription: '',
          status: '',
          lastLatitude: 0,
          lastLongitude: 0
        })
        navigate('/vendors')
      })
      .catch((err: any) => {
        console.log(err)
      })
  }
  return (
    <div className="bg-white py-5 md:px-3">
      <div className="flex justify-between mx-4 mb-4">
        <h2 className="font-semibold text-xl sm:text-2xl md:text-xl lg:text-2xl">Add Vendors</h2>
        <Button
          onPress={() => { navigate('/vendors') }}
          variant="bordered"
          className="flex items-center border border-jajanDark2 text-jajanDark2 rounded-md p-2 hover: shadow-md hover:shadow-jajanWarning focus:shadow-md focus:shadow-jajanWarning transition-all ease-in-out duration-100"
        >
          <AiOutlineArrowLeft/>
          Back
        </Button>
      </div>
      <VendorForm
        className="p-4"
        action={handleSubmit}
        fields={fields}
        setFields={setFields}
      />
    </div>
  )
}

export default Add
