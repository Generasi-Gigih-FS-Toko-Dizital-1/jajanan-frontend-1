import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'

import { AiOutlineEllipsis } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import React from 'react'

export default function ActionButton ({ type, id }: { type: string, id: string }): React.ReactElement {
  const navigate = useNavigate()
  const userType = type === 'admin' ? 'admins' : type === 'vendor' ? 'vendors' : 'customers'

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          className="flex justify-center rounded text-xl text-black/50 bg-jajanWarning/20 border border-jajanWarning"
          isIconOnly
          size="sm"
        >
          <AiOutlineEllipsis />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        onAction={(key) => {
          key === 'edit'
            ? navigate(`/${userType}/${key}/${id}`)
            : confirm(`Are you sure you want to delete this ${userType}?`) &&
            alert(`${userType} deleted!`)
        }
        }
      >
        <DropdownItem key="edit">Edit</DropdownItem>
        <DropdownItem key="delete" className="text-danger"color="danger">Delete
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
