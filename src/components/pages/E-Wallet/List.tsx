import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Button,
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
import { type TopUpHistory, type PayoutHistory } from '../../../types/E-walletTypes'
import { paramsEncoder } from '../../../utils/ParamsEncoder'
import { IDRFormatter } from '../../../utils/IDRFormatter'
import { AiOutlineEye, AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import useDocumentTitle from '../../../hooks/useDocumentTitle'
import useBackendOneClientPrivate from '../../../hooks/useBackendOneClientPrivate'

const List = (): React.ReactElement => {
  useDocumentTitle('Manage E-Wallet')

  const backendOneClientPrivate = useBackendOneClientPrivate()

  const navigate = useNavigate()
  const [topUpHistoiryPage, setTopUpHistoiryPage] = useState(1)
  const [payoutHistoriesPage, setPayoutHistoriesPage] = useState(1)
  const [pageSize] = useState(10)

  const [dataTopUp, setDataTopUp] = useState([])
  const [dataPayout, setDataPayout] = useState([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const url = `api/v1/top-up-histories?page_number=${topUpHistoiryPage}&page_size=${pageSize}&include=${paramsEncoder({ user: true })}`
    setLoading(true)

    backendOneClientPrivate.get(url)
      .then((response: any) => {
        setDataTopUp(response.data.data.topUpHistories)
      }).finally(() => {
        setLoading(false)
      })
  }, [topUpHistoiryPage, pageSize])

  useEffect(() => {
    const url = `api/v1/payout-histories?page_number=${payoutHistoriesPage}&page_size=${pageSize}&include=${paramsEncoder({ vendor: true })}`
    setLoading(true)

    backendOneClientPrivate.get(url)
      .then((response: any) => {
        setDataPayout(response.data.data.payoutHistories)
      }).finally(() => {
        setLoading(false)
      })
  }, [setTopUpHistoiryPage, pageSize])

  const loadingBar: React.ReactElement = <>{loading && 'Loading...'}</>

  return (
    <div className="bg-white py-5 md:px-3">
      <div className="flex justify-between mx-4 mb-4">
        <h2 className="font-semibold text-xl sm:text-2xl md:text-xl lg:text-2xl">
          Manage E-Wallet
        </h2>
      </div>
      <Tabs variant="underlined" aria-label="Tabs variants">
        <Tab key="topup" title="Top Up History">
          {loading
            ? loadingBar
            : (
          <Table
          aria-label="List of top up histories"
          className="overflow-x-auto"
          bottomContent={
          <div className="flex w-full">
            <Button
              className="rounded-r-none"
              onPress={() => { setTopUpHistoiryPage((prev) => prev - 1) }}
              isDisabled={topUpHistoiryPage === 1}
              isIconOnly
            >
              <AiOutlineLeft/>
            </Button>
            <Button
              className="rounded-l-none"
              onPress={() => { setTopUpHistoiryPage((prev) => prev + 1) }}
              isDisabled={dataTopUp.length < pageSize}
              isIconOnly
            >
              <AiOutlineRight/>
            </Button>
          </div>
        }>
            <TableHeader>
              <TableColumn>#</TableColumn>
              <TableColumn>Top Up ID</TableColumn>
              <TableColumn>Username</TableColumn>
              <TableColumn>Amount</TableColumn>
              <TableColumn>Received At</TableColumn>
              <TableColumn className="flex justify-center items-center">
                Action
              </TableColumn>
            </TableHeader>
            <TableBody>
              {dataTopUp.map((topUpHistory: TopUpHistory) => (
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
        <Tab key="payout" title="Payout History">
          {loading
            ? loadingBar
            : (
          <Table
          aria-label="List of payout histories"
          className="overflow-x-auto"
          bottomContent={
          <div className="flex w-full">
            <Button
              className="rounded-r-none"
              onPress={() => { setPayoutHistoriesPage((prev) => prev - 1) }}
              isDisabled={payoutHistoriesPage === 1}
              isIconOnly
            >
              <AiOutlineLeft/>
            </Button>
            <Button
              className="rounded-l-none"
              onPress={() => { setPayoutHistoriesPage((prev) => prev + 1) }}
              isDisabled={dataPayout.length < pageSize}
              isIconOnly
            >
              <AiOutlineRight/>
            </Button>
          </div>
        }
        >
            <TableHeader>
              <TableColumn>#</TableColumn>
              <TableColumn>Payout ID</TableColumn>
              <TableColumn>Username</TableColumn>
              <TableColumn>Amount</TableColumn>
              <TableColumn>Claimed At</TableColumn>
              <TableColumn className="flex justify-center items-center">
                Action
              </TableColumn>
            </TableHeader>
            <TableBody>
              {dataPayout.map((payoutHistory: PayoutHistory) => (
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
