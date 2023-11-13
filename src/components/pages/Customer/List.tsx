import React, { useEffect, useState } from 'react'

import useBackendOneClientPrivate from '../../../hooks/useBackendOneClientPrivate'
import useDocumentTitle from '../../../hooks/useDocumentTitle'
import { Link, useNavigate } from 'react-router-dom'

import ActionButton from '../../elements/ActionButton'
import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'

import { type CustomerTypes } from '../../../types/UserTypes'

const List = (): React.ReactElement => {
  useDocumentTitle('Customers')

  const backendOneClientPrivate = useBackendOneClientPrivate()

  const navigate = useNavigate()
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize] = useState(10)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const url = `api/v1/users?page_number=${pageNumber}&page_size=${pageSize}`
    setLoading(true)

    backendOneClientPrivate.get(url)
      .then((response: any) => {
        setData(response.data.data.users)
      }).finally(() => {
        setLoading(false)
      })
  }, [pageNumber, pageSize])

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
      <Table
        aria-label="List of customers"
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
          <TableColumn>Username</TableColumn>
          <TableColumn>Email</TableColumn>
          <TableColumn>Address</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn
            className="flex justify-center items-center"
          >
            Action
          </TableColumn>
        </TableHeader>
        <TableBody>
        {data.map((customer: CustomerTypes, index: number) => (
          <TableRow
            key={customer.id}
            className="border-b"
          >
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
            <TableCell>
              {customer.deletedAt === null
                ? <span className="text-xs py-1 px-2 bg-green-400 rounded-full text-white">Active</span>
                : <span className="text-xs py-1 px-2 bg-red-400 rounded-full text-white">Deleted</span>
              }
            </TableCell>
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
