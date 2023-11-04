import React, { useEffect, useState } from 'react'
import { Button } from '@nextui-org/react'
import { AiOutlineArrowLeft } from 'react-icons/ai'

import { useNavigate, useParams } from 'react-router-dom'
import useFetch from '../../../hooks/useFetch.tsx'
import useBackendOneClientPrivate from '../../../hooks/useBackendOneClientPrivate'
import CustomerForm from '../../fragments/CustomerForm'
import getGeoLocation from '../../../utils/GetGeolocation'

const AdminEdit = (): React.ReactElement => {
  const navigate = useNavigate()
  const backendOneClientPrivate = useBackendOneClientPrivate()

  const { id } = useParams()
  const url = `api/v1/users/${id}`
  const { data } = useFetch(url)
  const oldUsername = data?.data.username
  const oldEmail = data?.data.email

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

  useEffect(() => {
    setFields({
      fullName: data?.data.fullName,
      gender: data?.data.gender,
      address: data?.data.address,
      username: data?.data.username,
      email: data?.data.email,
      password: data?.data.password,
      confirmPassword: data?.data.confirmPassword,
      lastLatitude: 0,
      lastLongitude: 0
    })
  }, [data])

  const { fullName, gender, address, username, email, password, lastLatitude, lastLongitude } = fields

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    console.log(fields)
    return

    // empty validation
    if (fullName === '' || address === '' || username === '' || email === '') {
      alert('Please fill all the fields')
      return
    }

    // username unique validation
    const usernameUnique = data?.data.users.filter((user: any) => user.username === username.toLowerCase().replace(/\s+/g, ''))
    if (usernameUnique?.length !== 0 && username !== oldUsername) {
      alert('Username already registered')
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

    confirm('Are you sure to update this customer?')
      ? backendOneClientPrivate.patch('api/v1/users', {
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
          alert('Update customer success')
          navigate('/customers')
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

export default AdminEdit
