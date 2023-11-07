import React from 'react'

import useFetch from '../../../hooks/useFetch'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { Button, Chip } from '@nextui-org/react'
import { AiOutlineArrowLeft, AiOutlineUser } from 'react-icons/ai'

import { dateFormatter } from '../../../utils/DateFormatter'

const Detail = (): React.ReactElement => {
  const navigate = useNavigate()
  const { id } = useParams()

  const url = `api/v1/transaction-histories/${id}`

  const { data, loading } = useFetch(url)
  const loadingBar: React.ReactElement = <>{loading && 'Loading...'}</>

  return (
    <div className="bg-white py-5 md:px-3">
      <div className="flex justify-between mx-4 mb-4">
        <h2 className="font-semibold text-xl sm:text-2xl md:text-xl lg:text-2xl">Detail Transaction</h2>
        <Button
          onPress={() => { navigate('/transactions') }}
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
        <>
      <div className="flex flex-wrap gap-y-10 py-6 mx-4">
        <div className="w-full md:w-1/2 lg:w-[55%] flex flex-col gap-y-5">
          <div className="flex flex-col gap-y-5 md:mb-8 xl:mb-10">
            <div>
              <h3 className="font-medium lg:text-xl">Transaction ID</h3>
              <p className="text-sm lg:text-xl font-medium">{data?.data.id}</p>
            </div>
            <div>
              <h3 className="font-medium lg:text-xl">Payment Method</h3>
              <p className="text-sm lg:text-xl">{data?.data.paymentMethod}</p>
            </div>
            <div>
              <h3 className="font-medium lg:text-xl">Amount</h3>
              <p className="text-2xl font-semibold md:text-3xl lg:text-4xl">IDR 34,400</p>
            </div>
          </div>
          <div className="flex flex-wrap py-6">
            <div className="w-1/2 flex flex-col gap-y-5">
              <div>
                <h3 className="font-medium lg:text-xl">Created at</h3>
                <p className="text-sm opacity-70 lg:text-base">{dateFormatter(data?.data.createdAt)}</p>
              </div>
              <div>
                <h3 className="font-medium lg:text-xl">Updated at</h3>
                <p className="text-sm opacity-70 lg:text-base">{dateFormatter(data?.data.updatedAt)}</p>
              </div>
            </div>
            <div className="w-1/2 flex flex-col gap-y-5">
              <div>
                <h3 className="font-medium lg:text-xl">Last Latitude</h3>
                <p className="text-sm opacity-70 lg:text-base">{data?.data.lastLatitude}</p>
              </div>
              <div>
                <h3 className="font-medium lg:text-xl">Last Longtitude</h3>
                <p className="text-sm opacity-70 lg:text-base">{data?.data.lastLongitude}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-[45%] flex flex-col">
          <h3 className="font-medium lg:text-xl">Jajanan</h3>
          <JajananCard
            id={data?.data.jajanId}
          />
          <h3 className="font-medium lg:text-xl">Customer</h3>
          <CustomerProfileCard
            id={data?.data.userId}
          />
        </div>
      </div>
      </>
          )}
    </div>
  )
}

const JajananCard = ({ id }: { id: string }): React.ReactElement => {
  const url = `api/v1/jajan-items/${id}`

  const { data, loading } = useFetch(url)
  const loadingBar: React.ReactElement = <>{loading && 'Loading...'}</>
  return (
    <div className="mb-6 md:mb-8 p-4 flex items-center gap-x-4 bg-jajanWarning rounded-xl md:p-5 md:gap-x-5 lg:p-8">
      {loading
        ? loadingBar
        : (
        <>
      <img
        src={data?.data.imageUrl}
        className="rounded-full aspect-square w-28 h-28 sm:w-24 sm:h-24 md:w-28 md:h-28 xl:w-32 xl:h-32"
      />
      <div className="flex flex-col justify-between gap-1 md:py-1 md:gap-2 md:max-w-[65%] lg:max-w-[60%] xl:max-w-[55%]">
        <h2 className="font-semibold text-[24px] sm:text-2xl xl:text-3xl">{data?.data.price}</h2>
        <p className="text-base xl:text-base 2xl:text-lg">{data?.data.name}</p>
        <Link
          className="opacity-70 text-sm sm:text-base xl:text-lg underline"
          to={`/vendors/${data?.data.vendorId}`}
        >
          Vendor Name
        </Link>
      </div>
      </>
          )}
    </div>
  )
}

const CustomerProfileCard = ({ id }: { id: string }): React.ReactElement => {
  const url = `api/v1/users/${id}`

  const { data, loading } = useFetch(url)
  const loadingBar: React.ReactElement = <>{loading && 'Loading...'}</>

  return (
    <div className="mb-6 md:mb-8 p-4 border-2 border-jajanWarning rounded-xl flex flex-col md:flex-row justify-between gap-y-5 md:gap-x-3">
      {loading
        ? loadingBar
        : (
        <>
      <div className="flex gap-x-3 md:gap-x-4 w-full">
        <div className="text-white rounded-full bg-[#BFBFBF] w-28 h-28 sm:w-24 sm:h-24 md:w-28 md:h-28 xl:w-32 xl:h-32">
          <AiOutlineUser className="p-3 w-28 h-28 sm:w-24 sm:h-24 md:w-28 md:h-28 xl:w-32 xl:h-32" />
        </div>
        <div className="flex flex-col justify-between py-1">
          <div>
            <h2 className="font-semibold text-[24px] sm:text-xl xl:text-2xl">{data?.data.fullName}</h2>
            <Link
              className="opacity-70 text-sm sm:text-base xl:text-lg underline"
              to={`/customers/${data?.data.id}`}
            >
              @{data?.data.username}
            </Link>
          </div>
          <Chip size="sm" className="bg-jajanWarning mt-3 rounded" radius="none">
            EXP <b>{data?.data.experience}</b>
          </Chip>
        </div>
      </div>
      </>
          )}
    </div>
  )
}

export default Detail
