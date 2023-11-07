import React from 'react'
import { type CustomerTypes } from '../../types/UserTypes'

const UserCard = ({ className, user }: { className?: string, user: CustomerTypes | undefined }): React.ReactElement => {
  return (
    <div className={`${className} flex items-center gap-x-4 bg-jajanWarning p-4 rounded-xl md:p-5 md:gap-x-5`}>
      <img
        src="https://openai-labs-public-images-prod.azureedge.net/user-jTJ7A5puDaUD79bsLHVgWCyy/generations/generation-ZXpxrA1J2HneW7qCNQEJ9wQZ/image.webp"
        className="rounded-full aspect-square w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 xl:w-32 xl:h-32"
      />
      <div className="flex flex-col justify-between gap-1 md:py-1 md:gap-2 md:max-w-[65%] lg:max-w-[60%] xl:max-w-[55%]">
        <h2 className="font-semibold text-[24px] sm:text-2xl xl:text-3xl">{user?.fullName}</h2>
        <p className="text-base xl:text-base 2xl:text-lg underline">@{user?.username}</p>
        <p className="text-base xl:text-base 2xl:text-lg">{user?.address}</p>
      </div>
    </div>
  )
}

export default UserCard