import React from 'react'
import { Button } from '@nextui-org/react'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import AdminForm from '../../fragments/AdminForm.tsx'

import { useNavigate, useParams } from 'react-router-dom'
import useFetch from '../../../hooks/useFetch.tsx'

const AdminEdit = (): React.ReactElement => {
  const navigate = useNavigate()
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    alert('Update admin')
  }

  const { id } = useParams()

  const url = `api/v1/admins/${id}`

  const { data } = useFetch(url)

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
        />
      }
    </div>
  )
}

export default AdminEdit
