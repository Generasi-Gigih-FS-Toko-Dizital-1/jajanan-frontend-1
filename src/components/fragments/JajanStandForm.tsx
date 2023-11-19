import { AiOutlineLink } from 'react-icons/ai'
import { Input, Textarea } from '@nextui-org/react'

import type { VendorTypes } from '../../types/UserTypes'
import React from 'react'

export default function JajanStandForm ({
  data,
  fields,
  setFields
}: {
  data?: VendorTypes
  fields: any
  setFields: any
}): React.ReactElement {
  return (
    <>
      <h2 className="font-semibold text-xl mb-6 sm:text-2xl md:mb-8 md:text-xl lg:text-2xl ">
        {(data !== undefined) ? 'Edit' : 'Add'} Jajan Stand
      </h2>
      <div className="flex flex-col md:flex-row gap-5 mb-4 md:gap-4 md:mb-5">
        <Input
          isRequired
          labelPlacement="outside"
          placeholder="John Stand's"
          type="text"
          variant="bordered"
          label="Name"
          radius="none"
          defaultValue={(data !== undefined) ? data.jajanName : ''}
          onChange={(e) => { setFields({ ...fields, jajanName: e.target.value }) }}
        />
        <Input
          isRequired
          labelPlacement="outside"
          placeholder="https://example.com/image.png"
          type="url"
          variant="bordered"
          classNames={{ input: 'bg-blue-500' }}
          label="Image"
          radius="none"
          startContent={
            <span className="text-default-400 pointer-events-none">
              <AiOutlineLink/>
            </span>
          }
          defaultValue={(data !== undefined) ? data.jajanImageUrl : ''}
          onChange={(e) => { setFields({ ...fields, jajanImageUrl: e.target.value }) }}
        />
      </div>
      <div className="flex flex-col md:flex-row gap-5 mb-8 md:gap-4 md:mb-10">
        <Textarea
          labelPlacement="outside"
          label="Description"
          placeholder="Share your thoughts and ideas here..."
          className="w-full md:w-[calc(50%-.5rem)]"
          isRequired
          variant="bordered"
          radius="none"
          defaultValue={(data !== undefined) ? data.jajanDescription : ''}
          onChange={(e) => { setFields({ ...fields, jajanDescription: e.target.value }) }}
        />
      </div>
    </>
  )
}
