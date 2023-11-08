import React, { useEffect, useState } from 'react'

import useFetch from '../../../hooks/useFetch'
import useBackendOneClientPrivate from '../../../hooks/useBackendOneClientPrivate'
import BackendOneClient from '../../../clients/BackendOneClient'
import { useNavigate, useParams } from 'react-router-dom'

import AdminForm from '../../fragments/AdminForm'

import { Button } from '@nextui-org/react'
import { AiOutlineArrowLeft } from 'react-icons/ai'

const Edit = (): React.ReactElement => {
  const navigate = useNavigate()
  const backendOneClientPrivate = useBackendOneClientPrivate()
  const client = new BackendOneClient()

  const { id } = useParams()
  const url = `api/v1/admins/${id}`
  const { data } = useFetch(url)
  const admins = useFetch('api/v1/admins').data?.data.admins

  const oldEmail = data?.data.email

  const [fields, setFields] = useState({
    fullName: '',
    gender: '',
    email: '',
    oldPassword: '',
    password: '',
    confirmPassword: ''
  })

  const { fullName, gender, email, oldPassword, password, confirmPassword } = fields

  useEffect(() => {
    setFields({
      fullName: data?.data.fullName,
      gender: data?.data.gender,
      email: data?.data.email,
      oldPassword,
      password,
      confirmPassword
    })
  }, [data])

  // console.log(fields)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    // empty validation
    if (fullName === '' || email === '' || oldPassword === '') {
      alert('Please fill all the fields')
      return
    }

    // email validation
    if (!email.includes('@')) {
      alert('Please enter a valid email')
      return
    }

    const emailUnique = admins.filter((admin: any) => admin.email === email.toLowerCase().replace(/\s+/g, ''))
    if (emailUnique?.length !== 0 && email !== oldEmail) {
      alert('Email already registered')
      return
    }

    // password validation
    if (oldPassword.length < 8) {
      alert('Password must be at least 8 characters')
      return
    }

    if (password !== '' && password.length < 8) {
      alert('Password must be at least 8 characters')
      return
    }

    if (password !== '' && password !== confirmPassword) {
      alert('Password and confirm password must be the same')
      return
    }

    const reqPassword = password === '' ? oldPassword : password

    client.instance.post('api/v1/authentications/admins/login?method=email_and_password', {
      email: fields.email,
      password: fields.oldPassword
    }).then(() => {
      confirm('Are you sure to update this admin?')
        ? backendOneClientPrivate.patch(`api/v1/admins/${id}`, {
          fullName,
          gender,
          email,
          oldPassword,
          password: reqPassword
        })
          .then(() => {
            alert('Update admin success')
            setFields({
              fullName: '',
              gender: '',
              email: '',
              oldPassword: '',
              password: '',
              confirmPassword: ''
            })
            navigate('/admins')
          })
          .catch((err: any) => {
            console.log(err)
          })
        : alert('Update canceled')
    }).catch((err: any) => {
      if (err.response.status === 404) {
        alert('The current password is wrong')
      } else {
        alert('Something went wrong')
      }
    })
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
