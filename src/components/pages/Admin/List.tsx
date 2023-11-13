import React, { useEffect, useState } from 'react'

import useAuthentication from '../../../hooks/useAuthentication'
import useBackendOneClientPrivate from '../../../hooks/useBackendOneClientPrivate'
import useDocumentTitle from '../../../hooks/useDocumentTitle'
import { Link, useNavigate } from 'react-router-dom'

import ActionButton from '../../elements/ActionButton'
import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'

import { type AdminTypes } from '../../../types/UserTypes'

const List = (): React.ReactElement => {
  useDocumentTitle('Manage Admin')

  const { authentication } = useAuthentication()
  const backendOneClientPrivate = useBackendOneClientPrivate()

  const navigate = useNavigate()
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize] = useState(10)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const url = `api/v1/admins?page_number=${pageNumber}&page_size=${pageSize}`
    setLoading(true)

    backendOneClientPrivate.get(url)
      .then((response: any) => {
        setData(response.data.data.admins)
      }).finally(() => {
        setLoading(false)
      })
  }, [pageNumber, pageSize])

  const loadingBar: React.ReactElement = <>{loading && 'Loading...'}</>

  return (
    <div className="bg-white py-5 md:px-3">
      <div className="flex justify-between mx-4 mb-4">
        <h2 className="font-semibold text-xl sm:text-2xl md:text-xl lg:text-2xl">
          Manage Admin
        </h2>
        <Button
          onPress={() => { navigate('/admins/add') }}
          className="bg-jajanDark2 text-white rounded-md p-2 hover:shadow-md hover:shadow-jajanWarning  focus:shadow-md focus:shadow-jajanWarning transition-all ease-in-out duration-100"
        >
          + Add Admin
        </Button>
      </div>
      {loading
        ? loadingBar
        : (
      <Table
        aria-label="List of admins"
        className="overflow-x-auto"
        bottomContent={
          <div className="flex w-full">
            <Button
              className="rounded-r-none"
              onPress={() => { setPageNumber((prev) => prev - 1) }}
              isDisabled={pageNumber === 1}
              isIconOnly
            >
              <AiOutlineLeft/>
            </Button>
            <Button
              className="rounded-l-none"
              onPress={() => { setPageNumber((prev) => prev + 1) }}
              isDisabled={data.length < pageSize}
              isIconOnly
            >
              <AiOutlineRight/>
            </Button>
          </div>
        }
      >
        <TableHeader>
          <TableColumn>#</TableColumn>
          <TableColumn>Fullname</TableColumn>
          <TableColumn>Email</TableColumn>
          <TableColumn>Gender</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn className="flex justify-center items-center">
            Action
          </TableColumn>
        </TableHeader>
        <TableBody>
          {data
            .filter((admin: AdminTypes) => admin.id !== authentication?.session.accountId)
            .map((admin: AdminTypes, index: number) => (
              <TableRow key={admin.id} className="border-b">
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Link
                    to={`/admins/${admin.id}`}
                    className="text-jajanDark2 underline"
                  >
                    {admin.fullName}
                  </Link>
                </TableCell>
                <TableCell>{admin.email}</TableCell>
                <TableCell>{admin.gender}</TableCell>
                <TableCell>
                  {admin.deletedAt === null
                    ? <span className="text-xs py-1 px-2 bg-green-400 rounded-full text-white">Active</span>
                    : <span className="text-xs py-1 px-2 bg-red-400 rounded-full text-white">Deleted</span>
                  }
                </TableCell>
                <TableCell className="flex justify-center items-center">
                  <ActionButton
                    type="admin"
                    id={admin.id}
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
          )}
    </div>
  )
}

export default List
