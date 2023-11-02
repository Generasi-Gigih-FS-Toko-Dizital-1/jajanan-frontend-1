import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@nextui-org/react'
import { AiOutlineArrowLeft } from 'react-icons/ai'

import VendorForm from '../../fragments/VendorForm.tsx'

const Edit = (): React.ReactElement => {
  const navigate = useNavigate()
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    alert('Edit vendor')
  }

  const vendor = {
    id: '1',
    fullname: 'Max Mayfield',
    gender: 'F',
    address: '565 Holland Rd, Hawkins, Indiana',
    username: 'max',
    email: 'maxxx@mail.com',
    balance: 0,
    experience: 0,
    jajan_image_url: 'https://openai-labs-public-images-prod.azureedge.net/user-jTJ7A5puDaUD79bsLHVgWCyy/generations/generation-ZXpxrA1J2HneW7qCNQEJ9wQZ/image.webp',
    jajan_name: 'Mayfield Toast',
    jajan_description: "Your street food maestro. Fast, tasty bites for your cravings. Don't miss out!",
    last_latitude: 0,
    last_longitude: 0,
    status: 'active',
    created_at: '2021-10-01T00:00:00Z',
    updated_at: '2021-10-01T00:00:00Z',
    deleted_at: '2021-10-01T00:00:00Z'
  }

  return (
    <div className="bg-white py-5 md:px-3">
      <div className="flex justify-between mx-4 mb-4">
        <h2 className="font-semibold text-xl sm:text-2xl md:text-xl lg:text-2xl">Edit Vendor</h2>
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
        data={vendor}
      />
    </div>
  )
}

export default Edit
