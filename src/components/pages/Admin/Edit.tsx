import { Button } from '@nextui-org/react'
import React from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import AdminForm from '../../fragments/admin-form'

const AdminEdit = (): React.ReactElement => {
  const navigate = useNavigate()
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    alert('Update Admin')
  }

  const admin = {
    id: '1',
    fullname: 'John Doe',
    gender: 'M',
    email: 'john@gmail.com',
    updated_at: '2021-10-01T00:00:00Z',
    created_at: '2021-10-01T00:00:00Z',
    deleted_at: '2021-10-01T00:00:00Z'
  }

  return (
    <div className="bg-white py-5 md:px-3">
      <div className="flex justify-between mx-4 mb-4">
        <h2 className="font-semibold text-xl sm:text-2xl md:text-xl lg:text-2xl">Edit Admin</h2>
        <Button
          onPress={() => { navigate('/admin') }}
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
        data={admin}
      />
    </div>
  )
}

export default AdminEdit
