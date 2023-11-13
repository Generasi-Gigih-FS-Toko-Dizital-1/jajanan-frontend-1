import React from 'react'

import { useNavigate } from 'react-router-dom'
import useBackendOneClientPrivate from '../../hooks/useBackendOneClientPrivate'

import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { AiOutlineEllipsis } from 'react-icons/ai'
import { confirmAlert, successAlert, errorAlert } from './CustomAlert'

export default function ActionButton ({ type, id }: { type: string, id: string }): React.ReactElement {
  const navigate = useNavigate()
  const backendOneClientPrivate = useBackendOneClientPrivate()
  const userType = type === 'admin' ? 'admins' : type === 'vendor' ? 'vendors' : 'users'

  const handleDelete = (): void => {
    void confirmAlert(
      'Soft delete or Hard delete?',
      'Soft delete will only change the status of the user to inactive. Hard delete will delete the user permanently.',
      'Soft delete',
      'Hard delete'
    ).then((result) => {
      void (result.isConfirmed === true
        ? confirmAlert(
            `Are you sure to Soft delete this ${userType}?`,
            '',
            'Yes, delete it!',
            'No, cancel!'
        ).then((result) => {
          void (result.isConfirmed === true &&
            backendOneClientPrivate.delete(`api/v1/${userType}/${id}?method=soft`)
              .then(() => {
                successAlert(
                  'Deleted!',
                  `Your ${userType} has been deleted.`
                )
                window.location.reload()
              }).catch((error: Error) => {
                errorAlert(
                  'Error!',
                  `${error.message}`
                )
              })
          )
        })
        : confirmAlert(
            `Are you sure to Hard delete this ${userType}?`,
            'You won\'t be able to revert this!',
            'Yes, delete it!',
            'No, cancel!'
        ).then((result) => {
          void (result.isConfirmed === true &&
            backendOneClientPrivate.delete(`api/v1/${userType}/${id}?method=hard`)
              .then(() => {
                successAlert(
                  'Deleted!',
                  `Your ${userType} has been deleted.`
                )
                window.location.reload()
              }).catch((error: Error) => {
                errorAlert(
                  'Error!',
                  `${error.message}`
                )
              })
          )
        })
      )
    })
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
        aria-label="Dropdown menu for action button"
        onAction={(key) => {
          key === 'edit'
            ? navigate(`/${userType === 'users' ? 'customers' : userType}/${key}/${id}`)
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
