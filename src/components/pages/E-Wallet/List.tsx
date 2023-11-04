import React from 'react'
import { Link } from 'react-router-dom'
import {
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

const List = (): React.ReactElement => {
  const { data: topUpHistories, loading: topUpHistoryLoading } = useFetch(`api/v1/top-up-histories?page_number=1&page_size=10&include=${paramsEncoder({ user: true })}`)

  const { data: payoutHistories, loading: payoutHistoryLoading } = useFetch(`api/v1/payout-histories?page_number=1&page_size=10&include=${paramsEncoder({ vendor: true })}`)

  const topUpHistoryLoadingBar: React.ReactElement = <>{topUpHistoryLoading && 'Loading...'}</>
  const payoutHistoryLoadingBar: React.ReactElement = <>{topUpHistoryLoading && 'Loading...'}</>

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
          <Table className="overflow-x-auto">
            <TableHeader>
              <TableColumn>#</TableColumn>
              <TableColumn>Top Up Id</TableColumn>
              <TableColumn>Username</TableColumn>
              <TableColumn>Amount</TableColumn>
              <TableColumn>Received At</TableColumn>
              <TableColumn>Media</TableColumn>
            </TableHeader>
            <TableBody>
              {topUpHistories?.data.topUpHistories.map((topUpHistory: TopUpHistory) => (
                <TableRow key={topUpHistory.id} className="border-b">
                  <TableCell>1</TableCell>
                  <TableCell>
                    <Link to={`/e-wallets/topups/${topUpHistory.id}`}
                    className="text-jajanDark2 underline">
                      {topUpHistory.id}
                    </Link>
                  </TableCell>
                  <TableCell>{topUpHistory.user?.username}</TableCell>
                  <TableCell>{topUpHistory.amount}</TableCell>
                  <TableCell>{dateFormatter(topUpHistory.createdAt)}</TableCell>
                  <TableCell>{topUpHistory.media}</TableCell>
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
          <Table className="overflow-x-auto">
            <TableHeader>
              <TableColumn>#</TableColumn>
              <TableColumn>Payout Id</TableColumn>
              <TableColumn>Username</TableColumn>
              <TableColumn>Amount</TableColumn>
              <TableColumn>Claimed At</TableColumn>
              <TableColumn>Media</TableColumn>
            </TableHeader>
            <TableBody>
              {payoutHistories?.data.payoutHistories.map((payoutHistory: PayoutHistory) => (
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
