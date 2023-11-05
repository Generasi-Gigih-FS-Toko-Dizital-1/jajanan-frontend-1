import React, { useEffect, useState } from 'react'

import useFetch from '../../../hooks/useFetch'
import useBackendOneClientPrivate from '../../../hooks/useBackendOneClientPrivate'
import { useNavigate, useParams } from 'react-router-dom'

import AdminForm from '../../fragments/AdminForm'

import { Button } from '@nextui-org/react'
import { AiOutlineArrowLeft } from 'react-icons/ai'

import getGeoLocation from '../../../utils/GetGeolocation'

const Edit = (): React.ReactElement => {
  const navigate = useNavigate()
  const backendOneClientPrivate = useBackendOneClientPrivate()

  const { id } = useParams()
  const url = `api/v1/admins/${id}`
  const { data } = useFetch(url)

  const oldEmail = data?.data.email

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

  useEffect(() => {
    setFields({
      fullName: data?.data.fullName,
      gender: data?.data.gender,
      email: data?.data.email,
      password: data?.data.password,
      confirmPassword: data?.data.confirmPassword,
      lastLatitude: 0,
      lastLongitude: 0
    })
  }, [data])

  const { fullName, gender, email, password, confirmPassword, lastLatitude, lastLongitude } = fields

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    console.log(fields)
    return

    // empty validation
    if (fullName === '' || email === '') {
      alert('Please fill all the fields')
      return
    }

    // email validation
    if (!email.includes('@')) {
      alert('Please enter a valid email')
      return
    }
    const emailUnique = data?.data.users.filter((user: any) => user.email === email.toLowerCase().replace(/\s+/g, ''))
    if (emailUnique?.length !== 0 && email !== oldEmail) {
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

    confirm('Are you sure to update this admin?')
      ? backendOneClientPrivate.patch('api/v1/admins', {
        fullName,
        gender,
        email,
        password,
        lastLatitude,
        lastLongitude
      })
        .then(() => {
          alert('Update admin success')
          etFields({
            fullName: '',
            gender: '',
            email: '',
            password: '',
            confirmPassword: '',
            lastLatitude: 0,
            lastLongitude: 0
          })
          navigate('/admins')
        })
        .catch((err: any) => {
          console.log(err)
        })
      : alert('Update canceled')
  }

  return (
    <div className="bg-white py-5 md:px-3">
      <div className="flex justify-between mx-4 mb-4">
        <h2 className="font-semibold text-xl sm:text-2xl md:text-xl lg:text-2xl">Edit Admin</h2>
        <Button
          onPress={() => { navigate('/admins') }}
          variant="bordered"
          className="flex items-center border border-jajanDark2 text-jajanDark2 rounded-md p-2 hover: shadow-md hover:shadow-jajanWarning focus:shadow-md focus:shadow-jajanWarning transition-all ease-in-out duration-100"
        >
          <AiOutlineArrowLeft/>
          Back
        </Button>
      </div>
      {
        data?.data !== undefined &&
        <AdminForm
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
