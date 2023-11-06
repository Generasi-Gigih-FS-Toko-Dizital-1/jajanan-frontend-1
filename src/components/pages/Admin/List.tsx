import React, { useMemo, useState } from 'react'

import useFetch from '../../../hooks/useFetch'
import { Link, useNavigate } from 'react-router-dom'

import ActionButton from '../../elements/ActionButton'
import { Button, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'

import { dateFormatter } from '../../../utils/DateFormatter'
import { type AdminTypes } from '../../../types/UserTypes'

const List = (): React.ReactElement => {
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const rowsPerPage = 10

  const url = 'api/v1/admins'

  const { data, loading } = useFetch(url)
  const loadingBar: React.ReactElement = <>{loading && 'Loading...'}</>

  const pages = Math.ceil(data?.data.admins.length / rowsPerPage)

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return data?.data.admins.slice(start, end)
  }, [page, data])

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
            <Pagination
              isCompact
              showControls
              showShadow
              color="default"
              page={page}
              total={pages}
              onChange={(page) => { setPage(page) }}
            />
          </div>
        }
      >
        <TableHeader>
          <TableColumn>#</TableColumn>
          <TableColumn>Fullname</TableColumn>
          <TableColumn>Email</TableColumn>
          <TableColumn>Gender</TableColumn>
          <TableColumn>Updated at</TableColumn>
          <TableColumn>Created at</TableColumn>
          <TableColumn className="flex justify-center items-center">
            Action
          </TableColumn>
        </TableHeader>
        <TableBody>
          {items.map((admin: AdminTypes, index: number) => (
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
              <TableCell>{dateFormatter(admin.updatedAt)}</TableCell>
              <TableCell>{dateFormatter(admin.createdAt)}</TableCell>
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
