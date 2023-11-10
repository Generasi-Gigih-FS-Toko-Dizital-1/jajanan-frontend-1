import React, { useEffect, useState } from 'react'

import useBackendOneClientPrivate from '../../../hooks/useBackendOneClientPrivate'
import useDocumentTitle from '../../../hooks/useDocumentTitle'
import { Link, useNavigate } from 'react-router-dom'

import ActionButton from '../../elements/ActionButton'
import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'

import { type VendorTypes } from '../../../types/UserTypes'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'

const List = (): React.ReactElement => {
  useDocumentTitle('Vendors')

  const backendOneClientPrivate = useBackendOneClientPrivate()

  const navigate = useNavigate()
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize] = useState(10)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const url = `api/v1/vendors?page_number=${pageNumber}&page_size=${pageSize}`
    setLoading(true)

    backendOneClientPrivate.get(url)
      .then((response: any) => {
        setData(response.data.data.vendors)
      }).catch((err: any) => {
        console.log(err)
      }).finally(() => {
        setLoading(false)
      })
  }, [pageNumber, pageSize])

  const loadingBar: React.ReactElement = <>{loading && 'Loading...'}</>

  return (
    <div className="bg-white py-5 md:px-3">
      <div className="flex justify-between mx-4 mb-4">
        <h2 className="font-semibold text-xl sm:text-2xl md:text-xl lg:text-2xl">Vendors</h2>
        <Button
          onPress={() => { navigate('/vendors/add') }}
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
          <TableColumn
            className="flex justify-center items-center"
          >
            Action
          </TableColumn>
        </TableHeader>
        <TableBody>
        {data.map((vendor: VendorTypes, index: number) => (
          <TableRow
            key={vendor.id}
            className="border-b"
          >
            <TableCell>{index + 1}</TableCell>
            <TableCell>
              <Link
                to={`/vendors/${vendor.id}`}
                className="text-jajanDark2 underline"
              >
                {vendor.fullName}
              </Link>
            </TableCell>
            <TableCell>{vendor.username}</TableCell>
            <TableCell>{vendor.email}</TableCell>
            <TableCell>{vendor.address}</TableCell>
            <TableCell
              className="flex justify-center items-center"
            >
              <ActionButton
                type="vendor"
                id={vendor.id}
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
