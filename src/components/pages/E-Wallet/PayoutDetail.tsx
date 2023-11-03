import { useNavigate } from 'react-router-dom'
import { Button } from '@nextui-org/react'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import React from 'react'

const Detail = (): React.ReactElement => {
  const navigate = useNavigate()

  return (
    <div className="bg-white py-5 md:px-3">
      <div className="flex justify-between mx-4 mb-4">
        <h2 className="font-semibold text-xl sm:text-2xl md:text-xl lg:text-2xl">Detailed Payout History</h2>
        <Button
          onPress={() => { navigate('/e-wallets') }}
          variant="bordered"
          className="flex items-center border border-jajanDark2 text-jajanDark2 rounded-md p-2 hover: shadow-md hover:shadow-jajanWarning focus:shadow-md focus:shadow-jajanWarning transition-all ease-in-out duration-100"
        >
          <AiOutlineArrowLeft/>
          Back
        </Button>
      </div>

      <div className="flex flex-wrap py-6 mx-4">
        <div className="lg:w-1/2 flex flex-col gap-y-5">
          <div>
            <h3 className="font-medium lg:text-xl">Payout Id</h3>
            <p className="text-sm opacity-70 lg:text-base underline">12763528-347346378-hxbsjgd-234737467</p>
          </div>
          <div>
            <h3 className="font-medium lg:text-xl">Amount</h3>
            <p className="text-sm opacity-70 lg:text-base">IDR 10.0000</p>
          </div>
          <div>
            <h3 className="font-medium lg:text-xl">Claimed At</h3>
            <p className="text-sm opacity-70 lg:text-base">Sunday 27 Oct 2023</p>
          </div>
          <div>
            <h3 className="font-medium lg:text-xl">Media</h3>
            <p className="text-sm opacity-70 lg:text-base">VA-Mandiri</p>
          </div>
        </div>
        <div className='lg:w-1/2 flex-col'>
          <h2 className="my-4 font-semibold text-xl sm:text-2xl md:text-xl lg:text-2xl">Vendor</h2>
          <JajanStandCard className="py-4 mb-4" />
        </div>
      </div>
    </div>
  )
}

const JajanStandCard = ({ className }: { className?: string }): React.ReactElement => {
  return (
    <div className={`${className} flex items-center gap-x-4 bg-jajanWarning p-4 rounded-xl md:p-5 md:gap-x-5`}>
      <img
        src="https://openai-labs-public-images-prod.azureedge.net/user-jTJ7A5puDaUD79bsLHVgWCyy/generations/generation-ZXpxrA1J2HneW7qCNQEJ9wQZ/image.webp"
        className="rounded-full aspect-square w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 xl:w-32 xl:h-32"
      />
      <div className="flex flex-col justify-between gap-1 md:py-1 md:gap-2 md:max-w-[65%] lg:max-w-[60%] xl:max-w-[55%]">
        <h2 className="font-semibold text-[24px] sm:text-2xl xl:text-3xl">Mayfield Toast</h2>
        <p className="text-base xl:text-base 2xl:text-lg underline">@username</p>
        <p className="text-base xl:text-base 2xl:text-lg">Your street food maestro. Fast, tasty bites for your cravings. Don&apos;t miss out!</p>
      </div>
    </div>
  )
}

export default Detail
