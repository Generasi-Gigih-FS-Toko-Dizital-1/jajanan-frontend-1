import React, { useEffect, useState } from 'react'

import useDocumentTitle from '../../../hooks/useDocumentTitle'
import useBackendOneClientPrivate from '../../../hooks/useBackendOneClientPrivate'
import { useNavigate } from 'react-router-dom'

import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { AiOutlineEye, AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'

import { type TransactionHistoryTypes } from '../../../types/TransactionTypes'
import { IDRFormatter } from '../../../utils/IDRFormatter'

const List = (): React.ReactElement => {
  useDocumentTitle('Transaction Histories')
  const backendOneClientPrivate = useBackendOneClientPrivate()

  const navigate = useNavigate()
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize] = useState(10)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const include = {
      transactionItems: {
        include: {
          jajanItem: true
        }
      }
    }
    const url = `api/v1/transaction-histories?page_number=${pageNumber}&page_size=${pageSize}&include=${encodeURIComponent(JSON.stringify(include))}`
    setLoading(true)

    backendOneClientPrivate.get(url)
      .then((response: any) => {
        setData(response.data.data.transactionHistories)
      }).catch((err: any) => {
        console.log(err)
      }).finally(() => {
        setLoading(false)
      })
  }, [pageNumber, pageSize])

  // console.log(data)

  const loadingBar: React.ReactElement = <>{loading && 'Loading...'}</>

  return (
    <div className="bg-white py-5 md:px-3">
      <div className="flex justify-between mx-4 mb-4">
        <h2 className="font-semibold text-xl sm:text-2xl md:text-xl lg:text-2xl">Transaction Histories</h2>
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
          <TableColumn>Transaction ID</TableColumn>
          <TableColumn>Amount {'(IDR)'}</TableColumn>
          <TableColumn>Method</TableColumn>
          <TableColumn>Updated at</TableColumn>
          <TableColumn>Created at</TableColumn>
          <TableColumn
            className="flex justify-center items-center"
          >
            Action
          </TableColumn>
        </TableHeader>
        <TableBody>
        {data.map((transaction: TransactionHistoryTypes, index: number) => (
          <TableRow
            key={transaction.id}
            className="border-b"
          >
            <TableCell>{index + 1}</TableCell>
            <TableCell
              className="text-jajanDark2 underline cursor-pointer"
              onClick={() => { navigate(`/transactions/${transaction.id}`, { state: { data: transaction } }) }}
            >
              {transaction.id}
            </TableCell>
            <TableCell>
              {IDRFormatter(transaction.transactionItems.reduce((total, item) => {
                return total + item.jajanItem.price
              }, 0))}
            </TableCell>
            <TableCell>{transaction.paymentMethod}</TableCell>
            <TableCell>{transaction.updatedAt}</TableCell>
            <TableCell>{transaction.createdAt}</TableCell>
            <TableCell
              className="flex justify-center items-center"
            >
              <Button
                className="flex justify-center rounded text-xl text-black/50 bg-jajanWarning/20 border border-jajanWarning hover:shadow-md hover:shadow-jajanWarning focus:shadow-md focus:shadow-jajanWarning transition-all ease-in-out duration-100"
                isIconOnly
                size="sm"
                onPress={() => { navigate(`/transactions/${transaction.id}`) }}
              >
                <AiOutlineEye/>
              </Button>

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
