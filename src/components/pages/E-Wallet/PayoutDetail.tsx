import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@nextui-org/react'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import React from 'react'
import useFetch from '../../../hooks/useFetch'
import { dateFormatter } from '../../../utils/DateFormatter'
import { IDRFormatter } from '../../../utils/IDRFormatter'
import { paramsEncoder } from '../../../utils/ParamsEncoder'
import { type PayoutHistory } from '../../../types/E-walletTypes'
import VendorCard from '../../fragments/VendorCard'
import useDocumentTitle from '../../../hooks/useDocumentTitle'

const Detail = (): React.ReactElement => {
  useDocumentTitle('Detailed Payout History')

  const navigate = useNavigate()
  const { id } = useParams()
  const { data, loading } = useFetch(`api/v1/payout-histories?page_number=1&page_size=10&where=${paramsEncoder({ id })}&include=${paramsEncoder({ vendor: true })}`)
  const payoutHistory: PayoutHistory = data?.data.payoutHistories[0]
  const loadingBar: React.ReactElement = <>{loading && 'Loading...'}</>

  return (
    <div className="bg-white py-5 md:px-3">
      <div className="flex justify-between mx-4 mb-4">
        <h2 className="font-semibold text-xl sm:text-2xl md:text-xl lg:text-2xl">Detail Payout History</h2>
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
        <div className="w-full md:w-3/5 lg:w-[55%] flex flex-col gap-y-5 mb-10 md:mb-12 xl:mb-14">
          <div>
            <h3 className="font-medium lg:text-xl">Payout Id</h3>
            <p className="text-sm opacity-70 lg:text-base underline">{payoutHistory.id}</p>
          </div>
          <div>
            <h3 className="font-medium lg:text-xl">Amount</h3>
            <p className="text-2xl font-semibold md:text-3xl lg:text-4xl">{IDRFormatter(payoutHistory.amount)}</p>
          </div>
          <div>
            <h3 className="font-medium lg:text-xl">Claimed At</h3>
            <p className="text-sm opacity-70 lg:text-base">{dateFormatter(payoutHistory.createdAt)}</p>
          </div>
          <div>
            <h3 className="font-medium lg:text-xl">Media</h3>
            {
              payoutHistory.media.includes('jpeg') || payoutHistory.media.includes('png') || payoutHistory.media.includes('jpg')
                ? <img
                  src={payoutHistory.media}
                  className="object-cover h-full w-1/2 border border-jajanDark2"
                />
                : 'No Media'
            }
          </div>
        </div>
        <div className='w-full lg:w-[45%] flex flex-col'>
          <h2 className="font-semibold text-xl sm:text-2xl md:text-xl lg:text-2xl">Vendor</h2>
          <VendorCard className="py-4 mb-4" vendor={payoutHistory.vendor} />
        </div>
      </div>
          )}
    </div>
  )
}

export default Detail
