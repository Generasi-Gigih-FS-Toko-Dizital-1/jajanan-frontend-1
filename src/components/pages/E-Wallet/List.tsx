import React, { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Button,
  Pagination,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tabs
} from '@nextui-org/react'
import { dateFormatter } from '../../../utils/DateFormatter'
import useFetch from '../../../hooks/useFetch'
import { type TopUpHistory, type PayoutHistory } from '../../../types/E-walletTypes'
import { paramsEncoder } from '../../../utils/ParamsEncoder'
import { IDRFormatter } from '../../../utils/IDRFormatter'
import { AiOutlineEye } from 'react-icons/ai'

const List = (): React.ReactElement => {
  const navigate = useNavigate()
  const [topUpHistoiryPage, setTopUpHistoiryPage] = useState(1)
  const [payoutHistoriesPage, setPayoutHistoriesPage] = useState(1)
  const rowsPerPage = 10

  const { data: topUpHistoriesResult, loading: topUpHistoryLoading } = useFetch(`api/v1/top-up-histories?include=${paramsEncoder({ user: true })}`)
  const topUpHistories: TopUpHistory[] = topUpHistoriesResult?.data.topUpHistories

  const { data: payoutHistoriesResult, loading: payoutHistoryLoading } = useFetch(`api/v1/payout-histories?include=${paramsEncoder({ vendor: true })}`)
  const payoutHistories: PayoutHistory[] = payoutHistoriesResult?.data.payoutHistories

  const topUpHistoryLoadingBar: React.ReactElement = <>{topUpHistoryLoading && 'Loading...'}</>
  const payoutHistoryLoadingBar: React.ReactElement = <>{topUpHistoryLoading && 'Loading...'}</>

  const topUphistoriesPages = Math.ceil(topUpHistories?.length / rowsPerPage)
  const payoutHistoriesPages = Math.ceil(payoutHistories?.length / rowsPerPage)

  const topUpHistoriesItems = useMemo(() => {
    const start = (topUpHistoiryPage - 1) * rowsPerPage
    const end = start + rowsPerPage

    return topUpHistories?.slice(start, end)
  }, [topUpHistoiryPage, topUpHistories])

  const payoutHistoriesItems = useMemo(() => {
    const start = (payoutHistoriesPage - 1) * rowsPerPage
    const end = start + rowsPerPage

    return payoutHistories?.slice(start, end)
  }, [payoutHistoriesPage, payoutHistories])

  return (
    <div className="bg-white py-5 md:px-3">
      <div className="flex justify-between mx-4 mb-4">
        <h2 className="font-semibold text-xl sm:text-2xl md:text-xl lg:text-2xl">
          Manage E-Wallet
        </h2>
      </div>
      <Tabs variant="underlined" aria-label="Tabs variants">
        <Tab key="photos" title="Top Up History">
          {topUpHistoryLoading
            ? topUpHistoryLoadingBar
            : (
          <Table
          aria-label="List of top up histories"
          className="overflow-x-auto"
          bottomContent={
          <div className="flex w-full">
            <Pagination
              isCompact
              showControls
              showShadow
              color="default"
              page={topUpHistoiryPage}
              total={topUphistoriesPages}
              onChange={(page) => { setTopUpHistoiryPage(page) }}
            />
          </div>
        }>
            <TableHeader>
              <TableColumn>#</TableColumn>
              <TableColumn>Top Up Id</TableColumn>
              <TableColumn>Username</TableColumn>
              <TableColumn>Amount</TableColumn>
              <TableColumn>Received At</TableColumn>
              <TableColumn>Media</TableColumn>
              <TableColumn className="flex justify-center items-center">
                Action
              </TableColumn>
            </TableHeader>
            <TableBody>
              {topUpHistoriesItems.map((topUpHistory: TopUpHistory) => (
                <TableRow key={topUpHistory.id} className="border-b">
                  <TableCell>1</TableCell>
                  <TableCell>
                    <Link to={`/e-wallets/topups/${topUpHistory.id}`}
                    className="text-jajanDark2 underline">
                      {topUpHistory.id}
                    </Link>
                  </TableCell>
                  <TableCell>{topUpHistory.user?.username}</TableCell>
                  <TableCell>{IDRFormatter(topUpHistory.amount)}</TableCell>
                  <TableCell>{dateFormatter(topUpHistory.createdAt)}</TableCell>
                  <TableCell>{topUpHistory.media}</TableCell>
                  <TableCell
                    className="flex justify-center items-center"
                  >
                    <Button
                      className="flex justify-center rounded text-xl text-black/50 bg-jajanWarning/20 border border-jajanWarning hover:shadow-md hover:shadow-jajanWarning focus:shadow-md focus:shadow-jajanWarning transition-all ease-in-out duration-100"
                      isIconOnly
                      size="sm"
                      onPress={() => { navigate(`topups/${topUpHistory.id}`) }}
                    >
                      <AiOutlineEye/>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
              )}
        </Tab>
        <Tab key="music" title="Payout History">
          {payoutHistoryLoading
            ? payoutHistoryLoadingBar
            : (
          <Table
          aria-label="List of payout histories"
          className="overflow-x-auto"
          bottomContent={
          <div className="flex w-full">
            <Pagination
              isCompact
              showControls
              showShadow
              color="default"
              page={payoutHistoriesPage}
              total={payoutHistoriesPages}
              onChange={(page) => { setPayoutHistoriesPage(page) }}
            />
          </div>
        }
        >
            <TableHeader>
              <TableColumn>#</TableColumn>
              <TableColumn>Payout Id</TableColumn>
              <TableColumn>Username</TableColumn>
              <TableColumn>Amount</TableColumn>
              <TableColumn>Claimed At</TableColumn>
              <TableColumn>Media</TableColumn>
              <TableColumn className="flex justify-center items-center">
                Action
              </TableColumn>
            </TableHeader>
            <TableBody>
              {payoutHistoriesItems.map((payoutHistory: PayoutHistory) => (
                <TableRow key={payoutHistory.id} className="border-b">
                  <TableCell>1</TableCell>
                  <TableCell>
                    <Link to={`/e-wallets/payouts/${payoutHistory.id}`}
                    className="text-jajanDark2 underline">
                      {payoutHistory.id}
                    </Link>
                  </TableCell>
                  <TableCell>{payoutHistory.vendor?.username}</TableCell>
                  <TableCell>{payoutHistory.amount}</TableCell>
                  <TableCell>{dateFormatter(payoutHistory.createdAt)}</TableCell>
                  <TableCell>{payoutHistory.media}</TableCell>
                  <TableCell
                    className="flex justify-center items-center"
                  >
                    <Button
                      className="flex justify-center rounded text-xl text-black/50 bg-jajanWarning/20 border border-jajanWarning hover:shadow-md hover:shadow-jajanWarning focus:shadow-md focus:shadow-jajanWarning transition-all ease-in-out duration-100"
                      isIconOnly
                      size="sm"
                      onPress={() => { navigate(`payouts/${payoutHistory.id}`) }}
                    >
                      <AiOutlineEye/>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              </TableBody>
          </Table>
              )}
        </Tab>
      </Tabs>
    </div>
  )
}

export default List
