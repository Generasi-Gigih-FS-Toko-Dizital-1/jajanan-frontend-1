import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@nextui-org/react'
import { AiOutlineArrowLeft } from 'react-icons/ai'

import AdminForm from '../../fragments/admin-form'
import BackendOneClient from '../../../clients/BackendOneClient'

const AdminAdd = (): React.ReactElement => {
  const navigate = useNavigate()
  const client = new BackendOneClient()
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const createAdmin = async (form: HTMLFormElement): Promise<void> => {
      const fullName = form.fullName.value
      const email = form.email.value
      const gender = form.gender.value
      const password = form.password.value

      const url = `${import.meta.env.VITE_BACKEND_ONE_URL}api/v1/admins`
      try {
        await client.instance.post(url, {
          fullName,
          email,
          gender,
          password
        },
        {
          headers: {
            Authorization: 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOiJhNjU3ZDVlMy1mYjRjLTQ2NTMtOTNhNC1jZjQwOGFmMjI5NTQiLCJhY2NvdW50VHlwZSI6IkFETUlOIiwiaWF0IjoxNjk4ODEzNjc3LCJleHAiOjE2OTg4MTQyNzd9.EvRPWRXlL7TcyAHBdcXCs0vtfUoLf23Zo5zDQCYJwE0',
            Accept: 'application/json'
          }
        })

        alert('Add Admin Success')
        navigate('/admin')
      } catch (err) {
        alert('Error: ' + fullName + email + gender + password)
        console.log(err)
      }
    }

    void createAdmin(e.target as HTMLFormElement)
  }

  return (
    <div className="bg-white p-5 h-full">
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
      <AdminForm className="p-4" action={handleSubmit} />
    </div>
  )
}

export default AdminAdd
