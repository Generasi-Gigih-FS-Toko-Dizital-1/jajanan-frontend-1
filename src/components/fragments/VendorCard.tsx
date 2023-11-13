import React from 'react'
import { type VendorTypes } from '../../types/UserTypes'
import { Link } from 'react-router-dom'

const VendorCard = ({ className, vendor }: { className?: string, vendor: VendorTypes | undefined }): React.ReactElement => {
  return (
    <div className={`${className} flex items-center gap-x-4 bg-jajanWarning p-4 rounded-xl md:p-5 md:gap-x-5`}>
      <img
        src={vendor?.jajanImageUrl}
        className="border-2 border-jajanDark bg-white rounded-full object-cover aspect-square w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 xl:w-32 xl:h-32"
      />
      <div className="flex flex-col justify-between gap-1 md:py-1 md:gap-2 md:max-w-[65%] lg:max-w-[60%] xl:max-w-[55%]">
        <h2 className="font-semibold text-[24px] sm:text-2xl xl:text-3xl">{vendor?.fullName}</h2>
        <Link
          className="text-base xl:text-base 2xl:text-lg underline"
          to={`/vendors/${vendor?.id}`}
        >
          @{vendor?.username}
        </Link>
        <p className="text-base xl:text-base 2xl:text-lg">{vendor?.address}</p>
      </div>
    </div>
  )
}

export default VendorCard
