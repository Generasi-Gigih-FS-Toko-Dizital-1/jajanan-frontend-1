import React from 'react'

import { Link, useNavigate } from 'react-router-dom'
import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import ActionButton from '../../elements/ActionButton'
import useFetch from '../../../hooks/useFetch'

const List = (): React.ReactElement => {
  const navigate = useNavigate()

  const url = 'api/v1/users?page_number=1&page_size=10'

  const { data, loading } = useFetch(url)
  const loadingBar: React.ReactElement = <>{loading && 'Loading...'}</>

  return (
    <div className="bg-white py-5 md:px-3">
      <div className="flex justify-between mx-4 mb-4">
        <h2 className="font-semibold text-xl sm:text-2xl md:text-xl lg:text-2xl">Customers</h2>
        <Button
          onPress={() => { navigate('/customers/add') }}
          className="bg-jajanDark2 text-white rounded-md p-2 hover:shadow-md hover:shadow-jajanWarning  focus:shadow-md focus:shadow-jajanWarning transition-all ease-in-out duration-100"
        >
          + Add
        </Button>
      </div>
      {loading
        ? loadingBar
        : (
      <Table className="overflow-x-auto">
        <TableHeader>
          <TableColumn>#</TableColumn>
          <TableColumn>Fullname</TableColumn>
          <TableColumn>Username</TableColumn>
          <TableColumn>Email</TableColumn>
          <TableColumn>Address</TableColumn>
          <TableColumn
            className="flex justify-center items-center"
          >
            Action
          </TableColumn>
        </TableHeader>
        <TableBody>
        {data?.data.users.map((customer: any, index: number) => (
          <TableRow key={customer.id} className="border-b">
            <TableCell>{index + 1}</TableCell>
            <TableCell>
              <Link
                to={`/customers/${customer.id}`}
                className="text-jajanDark2 underline"
              >
                {customer.fullName}
              </Link>
            </TableCell>
            <TableCell>{customer.username}</TableCell>
            <TableCell>{customer.email}</TableCell>
            <TableCell>{customer.address}</TableCell>
            <TableCell
              className="flex justify-center items-center"
            >
              <ActionButton
                type="customer"
                id={customer.id}
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
