import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@nextui-org/react'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import React from 'react'
import useFetch from '../../../hooks/useFetch'
import { IDRFormatter } from '../../../utils/IDRFormatter'
import { dateFormatter } from '../../../utils/DateFormatter'
import { paramsEncoder } from '../../../utils/ParamsEncoder'
import { type TopUpHistory } from '../../../types/E-walletTypes'
import UserCard from '../../fragments/UserCard'

const Detail = (): React.ReactElement => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { data, loading } = useFetch(`api/v1/top-up-histories?page_number=1&page_size=10&where=${paramsEncoder({ id })}&include=${paramsEncoder({ user: true })}`)
  const topUpHistory: TopUpHistory = data?.data.topUpHistories[0]
  const loadingBar: React.ReactElement = <>{loading && 'Loading...'}</>

  return (
    <div className="bg-white py-5 md:px-3">
      <div className="flex justify-between mx-4 mb-4">
        <h2 className="font-semibold text-xl sm:text-2xl md:text-xl lg:text-2xl">Detailed Top Up History</h2>
        <Button
          onPress={() => { navigate('/e-wallets') }}
          variant="bordered"
          className="flex items-center border border-jajanDark2 text-jajanDark2 rounded-md p-2 hover: shadow-md hover:shadow-jajanWarning focus:shadow-md focus:shadow-jajanWarning transition-all ease-in-out duration-100"
        >
          <AiOutlineArrowLeft/>
          Back
        </Button>
      </div>
      {loading
        ? loadingBar
        : (
      <div className="flex flex-wrap py-6 mx-4">
        <div className="lg:w-1/2 flex flex-col gap-y-5">
          <div>
            <h3 className="font-medium lg:text-xl">Top Up Id</h3>
            <p className="text-sm opacity-70 lg:text-base underline">{topUpHistory.id}</p>
          </div>
          <div>
            <h3 className="font-medium lg:text-xl">Amount</h3>
            <p className="text-sm opacity-70 lg:text-base">{IDRFormatter(Number(topUpHistory.amount))}</p>
          </div>
          <div>
            <h3 className="font-medium lg:text-xl">Received At</h3>
            <p className="text-sm opacity-70 lg:text-base">{dateFormatter(topUpHistory.createdAt)}</p>
          </div>
          <div>
            <h3 className="font-medium lg:text-xl">Media</h3>
            <p className="text-sm opacity-70 lg:text-base">{topUpHistory.media}</p>
          </div>
        </div>
        <div className='lg:w-1/2 flex-col'>
          <h2 className="my-4 font-semibold text-xl sm:text-2xl md:text-xl lg:text-2xl">User</h2>
          <UserCard className="py-4 mb-4" user={topUpHistory.user} />
        </div>
      </div>
          )}
    </div>
  )
}

export default Detail
