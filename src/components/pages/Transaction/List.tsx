import React, { useMemo, useState } from 'react'

import useFetch from '../../../hooks/useFetch'
import { Link, useNavigate } from 'react-router-dom'

import { Button, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'

import { type TransactionHistoryTypes } from '../../../types/TransactionTypes'
import { AiOutlineEye } from 'react-icons/ai'

const List = (): React.ReactElement => {
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const rowsPerPage = 10

  const url = 'api/v1/transaction-histories'

  const { data, loading } = useFetch(url)
  const loadingBar: React.ReactElement = <>{loading && 'Loading...'}</>

  const pages = Math.ceil(data?.data.transactionHistories.length / rowsPerPage)

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return data?.data.transactionHistories.slice(start, end)
  }, [page, data])

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
        {items.map((transaction: TransactionHistoryTypes, index: number) => (
          <TableRow
            key={transaction.id}
            className="border-b"
          >
            <TableCell>{index + 1}</TableCell>
            <TableCell>
              <Link
                to={`/transactions/${transaction.id}`}
                className="text-jajanDark2 underline"
              >
                {transaction.id}
              </Link>
            </TableCell>
            <TableCell>{transaction.amount}</TableCell>
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
