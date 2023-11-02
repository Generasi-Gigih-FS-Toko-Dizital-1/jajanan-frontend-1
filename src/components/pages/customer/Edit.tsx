import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@nextui-org/react'
import { AiOutlineArrowLeft } from 'react-icons/ai'

import CustomerForm from '../../fragments/customer-form'

const Edit = (): React.ReactElement => {
  const navigate = useNavigate()
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    alert('Edit customer')
  }

  const customer = {
    id: '1',
    fullname: 'Dusty Buns',
    gender: 'M',
    address: '2886 Cornwallis Road, Hawkins, Indiana',
    username: 'dustyyy',
    email: 'dusty@mail.com',
    balance: 0,
    experience: 0,
    last_latitude: 0,
    last_longitude: 0,
    created_at: '2021-10-01T00:00:00Z',
    updated_at: '2021-10-01T00:00:00Z',
    deleted_at: '2021-10-01T00:00:00Z'
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
      <CustomerForm
        className="p-4"
        action={handleSubmit}
        data={customer}
      />
    </div>
  )
}

export default Edit
