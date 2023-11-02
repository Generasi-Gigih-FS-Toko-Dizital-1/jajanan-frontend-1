import React from 'react'
import { Button, Input, Select, SelectItem, Textarea } from '@nextui-org/react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import JajanStandForm from './JajanStandForm.tsx'

import type { VendorTypes } from '../../types/UserTypes'

const VendorForm = ({
  className,
  action,
  data
}: {
  className?: string
  action: (e: React.FormEvent<HTMLFormElement>) => void
  data?: VendorTypes
}): React.ReactElement => {
  const [isVisiblePassword, setIsVisiblePassword] = React.useState(false)
  const [isVisibleConfirmPassword, setIsVisibleConfirmPassword] =
    React.useState(false)

  return (
    <form className={className} onSubmit={action}>
      <div className="flex flex-col md:flex-row gap-5 mb-4 md:gap-4 md:mb-5">
        <Input
          isRequired
          labelPlacement="outside"
          placeholder="John Doe"
          type="text"
          variant="bordered"
          label="Fullname"
          radius="none"
          defaultValue={(data != null) ? data.fullname : ''}
        />
        <Input
          isRequired
          labelPlacement="outside"
          placeholder="example"
          type="text"
          variant="bordered"
          classNames={{ input: 'bg-blue-500' }}
          label="Username"
          radius="none"
          startContent={
            <span className="text-default-400 pointer-events-none">
              @
            </span>
          }
          defaultValue={(data != null) ? data.username : ''}
        />
      </div>
      <div className="flex flex-col md:flex-row gap-5 mb-8 md:gap-4 md:mb-10">
        <Input
          isRequired
          labelPlacement="outside"
          placeholder="example@gmail.com"
          type="email"
          variant="bordered"
          classNames={{ input: 'bg-blue-500' }}
          label="Email"
          radius="none"
          defaultValue={(data != null) ? data.email : ''}
        />
        <Select
          labelPlacement="outside"
          label="Gender"
          placeholder="Select gender"
          isRequired
          variant="bordered"
          radius="none"
          defaultSelectedKeys={`${(data != null) ? data.gender : ''}`}
        >
          <SelectItem key="F" value="F">Female</SelectItem>
          <SelectItem key="M" value="M">Male</SelectItem>
        </Select>
      </div>
      <div className="flex flex-col md:flex-row gap-5 mb-8 md:gap-4 md:mb-10">
        <Textarea
          labelPlacement="outside"
          label="Address"
          placeholder="223 Example Street, City, State."
          className="w-full md:w-[calc(50%-.5rem)]"
          isRequired
          variant="bordered"
          radius="none"
          defaultValue={(data != null) ? data.address : ''}
        />
      </div>
      <JajanStandForm data={data}/>
      <div className="flex flex-col md:flex-row gap-5 mb-4 md:gap-4 md:mb-5">
        <Input
          isRequired
          labelPlacement="outside"
          label="New Password"
          placeholder="Enter your password"
          variant="bordered"
          radius="none"
          endContent={
            <button className="focus:outline-none" type="button" onClick={() => { setIsVisiblePassword(!isVisiblePassword) }} >
              {isVisiblePassword
                ? (
                <AiFillEye className="text-2xl text-default-400 pointer-events-none" />
                  )
                : (
                <AiFillEyeInvisible className="text-2xl text-default-400 pointer-events-none" />
                  )}
            </button>
          }
          type={isVisiblePassword ? 'text' : 'password'}
        />
        <Input
          isRequired
          labelPlacement="outside"
          label="Confirm Password"
          placeholder="Re-enter your password"
          variant="bordered"
          radius="none"
          endContent={
            <button className="focus:outline-none" type="button" onClick={() => { setIsVisibleConfirmPassword(!isVisibleConfirmPassword) }} >
              {isVisibleConfirmPassword
                ? (
                <AiFillEye className="text-2xl text-default-400 pointer-events-none" />
                  )
                : (
                <AiFillEyeInvisible className="text-2xl text-default-400 pointer-events-none" />
                  )}
            </button>
          }
          type={isVisibleConfirmPassword ? 'text' : 'password'}
        />
      </div>
      <Button
        type="submit"
        className="bg-jajanDark2 text-white rounded-md py-2 px-4 hover:shadow-md hover:shadow-jajanWarning focus:shadow-md focus:shadow-jajanWarning transition-all ease-in-out duration-100"
      >
        {(data != null) ? 'Update' : 'Save'}
      </Button>
    </form>
  )
}

export default VendorForm
