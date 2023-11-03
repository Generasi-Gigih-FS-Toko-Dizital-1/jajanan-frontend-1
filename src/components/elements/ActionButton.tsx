import React from 'react'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { AiOutlineEllipsis } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import useBackendOneClientPrivate from '../../hooks/useBackendOneClientPrivate'

export default function ActionButton ({ type, id }: { type: string, id: string }): React.ReactElement {
  const navigate = useNavigate()
  const backendOneClientPrivate = useBackendOneClientPrivate()
  const userType = type === 'admin' ? 'admins' : type === 'vendor' ? 'vendors' : 'customers'

  const handleDelete = (): void => {
    confirm(`Are you sure to delete this ${userType}?`)
      ? backendOneClientPrivate.delete(`api/v1/users/${id}`).then(() => {
        alert(`${userType} deleted`)
        window.location.reload()
      }).catch((err: any) => { console.log(err) })
      : alert('Delete canceled')
  }

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
            : handleDelete()
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
