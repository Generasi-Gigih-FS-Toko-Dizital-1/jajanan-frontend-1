import React from 'react'

import useFetch from '../../../hooks/useFetch'
import useBackendOneClientPrivate from '../../../hooks/useBackendOneClientPrivate'
import { useNavigate, useParams } from 'react-router-dom'

import { Button, Chip } from '@nextui-org/react'
import { AiOutlineArrowLeft, AiOutlineMail, AiOutlinePushpin, AiOutlineUser } from 'react-icons/ai'
import { confirmAlert, successAlert, errorAlert } from '../../elements/CustomAlert'

import { dateFormatter } from '../../../utils/DateFormatter'
import { IDRFormatter } from '../../../utils/IDRFormatter'

import { type VendorTypes } from '../../../types/UserTypes'
import useDocumentTitle from '../../../hooks/useDocumentTitle'

const Detail = (): React.ReactElement => {
  useDocumentTitle('Detail Vendor')

  const navigate = useNavigate()
  const backendOneClientPrivate = useBackendOneClientPrivate()
  const { id } = useParams()

  const url = `api/v1/vendors/${id}`

  const { data, loading } = useFetch(url)
  const loadingBar: React.ReactElement = <>{loading && 'Loading...'}</>

  const handleDelete = (): void => {
    void confirmAlert(
      'Soft delete or Hard delete?',
      'Soft delete will only change the status of the user to inactive. Hard delete will delete the user permanently.',
      'Soft delete',
      'Hard delete'
    ).then((result) => {
      void (result.isConfirmed === true
        ? confirmAlert(
          'Are you sure to Soft delete this vendor?',
          '',
          'Yes, delete it!',
          'No, cancel!'
        ).then((result) => {
          void (result.isConfirmed === true &&
            backendOneClientPrivate.delete(`api/v1/vendors/${id}?method=soft`)
              .then(() => {
                successAlert(
                  'Deleted!',
                  'Your vendor has been deleted.'
                )
                navigate('/vendors')
              }).catch((error: Error) => {
                errorAlert(
                  'Error!',
                  `${error.message}`
                )
              })
          )
        })
        : confirmAlert(
          'Are you sure to Hard delete this vendor?',
          'You won\'t be able to revert this!',
          'Yes, delete it!',
          'No, cancel!'
        ).then((result) => {
          void (result.isConfirmed === true &&
            backendOneClientPrivate.delete(`api/v1/vendors/${id}?method=hard`)
              .then(() => {
                successAlert(
                  'Deleted!',
                  'Your vendor has been deleted.'
                )
                navigate('/vendors')
              }).catch((error: Error) => {
                errorAlert(
                  'Error!',
                  `${error.message}`
                )
              })
          )
        })
      )
    })
  }

  return (
    <div className="bg-white py-5 md:px-3">
      <div className="flex justify-between mx-4 mb-4">
        <h2 className="font-semibold text-xl sm:text-2xl md:text-xl lg:text-2xl">Detail Vendor</h2>
        <Button
          onPress={() => { navigate('/vendors') }}
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
      <VendorProfileCard
        className="border-b-2 border-jajanDanger py-4 mx-4"
        profile={data?.data}
      />
      <div className="flex flex-wrap py-6 mx-4 lg:w-3/4 xl:3/5 2xl:w-1/2">
        <div className="w-1/2 flex flex-col gap-y-5">
          <div>
            <h3 className="font-medium lg:text-xl">Created at</h3>
            <p className="text-sm opacity-70 lg:text-base">{dateFormatter(data?.data.createdAt)}</p>
          </div>
          <div>
            <h3 className="font-medium lg:text-xl">Updated at</h3>
            <p className="text-sm opacity-70 lg:text-base">{dateFormatter(data?.data.updatedAt)}</p>
          </div>
          <div>
            <h3 className="font-medium lg:text-xl">Deleted at</h3>
            <p className="text-sm opacity-70 lg:text-base">
              {data?.data.deletedAt === null ? '-' : dateFormatter(data?.data.deletedAt)}
            </p>
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
      <h2 className="mx-4 my-4 font-semibold text-xl sm:text-2xl md:text-xl lg:text-2xl">Jajan Stand</h2>
      <JajanStandCard
        className="py-4 mx-4 mb-4"
        profile={data?.data}
      />
      <div className="mx-4 w-full flex items-center gap-3 mt-5">
        <Button
          onPress={() => { navigate(`/vendors/edit/${id}`) }}
          className="bg-jajanDark2 text-white rounded-md"
        >
          Edit
        </Button>
        <Button
          className="bg-jajanDanger text-white rounded-md"
          onPress={handleDelete}
        >
          Delete
        </Button>
      </div>
      </>
          )}
    </div>
  )
}

const VendorProfileCard = ({ className, profile }: { className?: string, profile: VendorTypes }): React.ReactElement => {
  return (
    <div className={`${className} flex flex-col md:flex-row justify-between gap-y-5 md:gap-x-3`}>
      <div className="flex gap-x-3 md:gap-x-4 md:w-1/2 lg:w-[45%]">
        <div className="text-white rounded-full bg-[#BFBFBF] w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 xl:w-32 xl:h-32">
          <AiOutlineUser className="p-3 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 xl:w-32 xl:h-32" />
        </div>
        <div className="flex flex-col justify-between py-1">
          <div>
            <h2 className="font-semibold text-[24px] sm:text-2xl xl:text-3xl">{profile.fullName}</h2>
            <p className="opacity-70 text-sm sm:text-base xl:text-lg 2xl:text-xl">@{profile.username}</p>
          </div>
          <Chip size="sm" className="bg-jajanWarning/50 mt-3" radius="full">
            EXP <b>{profile.experience}</b> <br />
          </Chip>
        </div>
      </div>
      <div className="flex flex-col justify-between max-md:border-b-2 max-md:border-jajanDanger max-md:pb-3 py-1 gap-y-1 md:gap-y-2 xl:gap-y-3 w-auto text-lg md:text-base xl:text-lg 2xl:text-xl">
        <div className="flex flex-wrap items-center">
          <AiOutlineUser className="mr-1 xl:mr-2" />
          <span className="w-4/5">{profile.gender}</span>
        </div>
        <div className="flex flex-wrap items-center">
          <AiOutlineMail className="mr-1 xl:mr-2" />
          <span className="w-4/5">{profile.email}</span>
        </div>
        <div className="flex flex-wrap items-center">
          <AiOutlinePushpin className="mr-1 xl:mr-2" />
          <span className="w-4/5">{profile.address}</span>
        </div>
      </div>
      <div className="border-l-2 border-jajanDark2 min-h-full hidden md:block w-[1%]"></div>
      <div className="flex flex-col justify-between md:text-right md:w-1/4 lg:w-[30%]">
        <span className="text-base sm:text-lg xl:text-xl 2xl:text-2xl">Balance</span>
        <div>
          <span className="block text-3xl xl:text-4xl mb-1 font-semibold">{IDRFormatter(profile.balance)}</span>
          <span className="block text-sm 2xl:text-base">Current on Wallet</span>
        </div>
      </div>
    </div>
  )
}

const JajanStandCard = ({ className, profile }: { className?: string, profile: VendorTypes }): React.ReactElement => {
  return (
    <div className={`${className} flex items-center gap-x-4 bg-jajanWarning p-4 rounded-xl md:p-5 md:gap-x-5 md:w-2/3 lg:p-8 lg:w-3/5 xl:w-[55%]`}>
      <img
        src={profile.jajanImageUrl}
        className="border-2 border-jajanDark bg-white rounded-full aspect-square object-cover w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 xl:w-32 xl:h-32"
      />
      <div className="flex flex-col justify-between gap-1 md:py-1 md:gap-2 md:max-w-[65%] lg:max-w-[60%] xl:max-w-[55%]">
        <h2 className="font-semibold text-[24px] sm:text-2xl xl:text-3xl">{profile.jajanName}</h2>
        <p className="text-base xl:text-base 2xl:text-lg">{profile.jajanDescription}</p>
      </div>
    </div>
  )
}

export default Detail
