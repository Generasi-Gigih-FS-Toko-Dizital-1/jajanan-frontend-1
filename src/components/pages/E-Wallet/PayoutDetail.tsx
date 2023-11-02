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
            <h3 className="font-medium lg:text-xl">Created at</h3>
            <p className="text-sm opacity-70 lg:text-base">31/12/2023, 23.59 WIB</p>
          </div>
          <div>
            <h3 className="font-medium lg:text-xl">Updated at</h3>
            <p className="text-sm opacity-70 lg:text-base">31/12/2023, 23.59 WIB</p>
          </div>
          <div>
            <h3 className="font-medium lg:text-xl">Deleted at</h3>
            <p className="text-sm opacity-70 lg:text-base">-</p>
          </div>
        </div>
        <div className='lg:w-1/2 flex-col'>
          <h2 className="mx-4 my-4 font-semibold text-xl sm:text-2xl md:text-xl lg:text-2xl">Jajan Stand</h2>
          <JajanStandCard className="py-4 mx-4 mb-4" />
        </div>
      </div>

      <div className="mx-4 w-full flex items-center gap-3 mt-5">
        <Button
          onPress={() => { navigate('/vendors/edit/1') }}
          className="bg-jajanDark2 text-white rounded-md"
        >
          Edit
        </Button>
        <Button
          className="bg-jajanDanger text-white rounded-md"
          onPress={
            () => {
              confirm('Are you sure you want to delete this vendor?') &&
              alert('Vendor deleted')
            }
          }
        >
          Delete
        </Button>
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
        <p className="text-base xl:text-base 2xl:text-lg">Your street food maestro. Fast, tasty bites for your cravings. Don&apos;t miss out!</p>
      </div>
    </div>
  )
}

export default Detail
