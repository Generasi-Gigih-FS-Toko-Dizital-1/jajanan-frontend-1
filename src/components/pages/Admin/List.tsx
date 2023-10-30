import { Link, useNavigate } from 'react-router-dom'
import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import ActionButton from '../../elements/action-button'
import React from 'react'

const List = (): React.ReactElement => {
  const navigate = useNavigate()
  return (
    <div className="bg-white py-5 md:px-3">
      <div className="flex justify-between mx-4 mb-4">
        <h2 className="font-semibold text-xl sm:text-2xl md:text-xl lg:text-2xl">Manage Admin</h2>
        <Button
          onPress={() => { navigate('/admin/add') }}
          className="bg-jajanDark2 text-white rounded-md p-2 hover:shadow-md hover:shadow-jajanWarning  focus:shadow-md focus:shadow-jajanWarning transition-all ease-in-out duration-100"
        >
          + Add Admin
        </Button>
      </div>
      <Table className="overflow-x-auto">
        <TableHeader>
          <TableColumn>#</TableColumn>
          <TableColumn>Fullname</TableColumn>
          <TableColumn>Email</TableColumn>
          <TableColumn>Gender</TableColumn>
          <TableColumn>Updated at</TableColumn>
          <TableColumn>Created at</TableColumn>
          <TableColumn
            className="flex justify-center items-center"
          >
            Action
          </TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow className="border-b">
            <TableCell>1</TableCell>
            <TableCell>
              <Link to="/admin/1" className="text-jajanDark2 underline">
                John Doe
              </Link>
            </TableCell>
            <TableCell>4Nn2s@example.com</TableCell>
            <TableCell>Male</TableCell>
            <TableCell>2022-01-01</TableCell>
            <TableCell>2022-01-01</TableCell>
            <TableCell
              className="flex justify-center items-center"
            >
              <ActionButton type="admin"/>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

export default List
