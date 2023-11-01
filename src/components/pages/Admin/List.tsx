import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/react'
import ActionButton from '../../elements/action-button'
import useFetch from '../../../hooks/useFetch'
import { type AdminTypes } from '../../../types/UserTypes'
import { dateFormat } from '../../../utils/dateFormat'

const List = (): React.ReactElement => {
  const navigate = useNavigate()

  const url = 'api/v1/admins?page_number=1&page_size=10'

  const { data, loading } = useFetch(url)
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
      <Table className="overflow-x-auto">
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
          {data?.data.admins.map((admin: AdminTypes) => (
            <TableRow key={admin.id} className="border-b">
              <TableCell>1</TableCell>
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
              <TableCell>{dateFormat(admin.updatedAt)}</TableCell>
              <TableCell>{dateFormat(admin.createdAt)}</TableCell>
              <TableCell className="flex justify-center items-center">
                <ActionButton type="admin" />
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
