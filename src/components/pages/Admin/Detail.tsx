import React from 'react'

import useFetch from '../../../hooks/useFetch'
import useBackendOneClientPrivate from '../../../hooks/useBackendOneClientPrivate'
import useDocumentTitle from '../../../hooks/useDocumentTitle'
import { useNavigate, useParams } from 'react-router-dom'

import { Button, Chip } from '@nextui-org/react'
import { AiOutlineArrowLeft, AiOutlineUser } from 'react-icons/ai'
import { confirmAlert, successAlert, errorAlert } from '../../elements/CustomAlert'

import { dateFormatter } from '../../../utils/DateFormatter'

import { type AdminTypes } from '../../../types/UserTypes'

const Detail = (): React.ReactElement => {
  useDocumentTitle('Detail Admin')

  const navigate = useNavigate()
  const backendOneClientPrivate = useBackendOneClientPrivate()
  const { id } = useParams()

  const url = `api/v1/admins/${id}`

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
          'Are you sure to Soft delete this admin?',
          '',
          'Yes, delete it!',
          'No, cancel!'
        ).then((result) => {
          void (result.isConfirmed === true &&
            backendOneClientPrivate.delete(`api/v1/admins/${id}?method=soft`)
              .then(() => {
                successAlert(
                  'Deleted!',
                  'Your admin has been deleted.'
                )
                navigate('/admins')
              }).catch((error: Error) => {
                errorAlert(
                  'Error!',
                  `${error.message}`
                )
              })
          )
        })
        : confirmAlert(
          'Are you sure to Hard delete this admin?',
          'You won\'t be able to revert this!',
          'Yes, delete it!',
          'No, cancel!'
        ).then((result) => {
          void (result.isConfirmed === true &&
            backendOneClientPrivate.delete(`api/v1/admins/${id}?method=hard`)
              .then(() => {
                successAlert(
                  'Deleted!',
                  'Your admin has been deleted.'
                )
                navigate('/admins')
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
        <h2 className="font-semibold text-xl sm:text-2xl md:text-xl lg:text-2xl">Detail Admin</h2>
        <Button
          onPress={() => { navigate('/admins') }}
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
      <AdminProfileCard profile={data?.data} className="py-4 mx-4"/>
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
        <div className="w-full flex items-center gap-3 mt-5">
          <Button
            onPress={() => { navigate(`/admins/edit/${id}`) }}
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
      </div>
      </>
          )}
    </div>
  )
}

const AdminProfileCard = ({ className, profile }: { className?: string, profile: AdminTypes }): React.ReactElement => {
  return (
    <div className={`${className} flex flex-col md:flex-row justify-between gap-y-5 md:gap-x-3`}>
      <div className="flex gap-x-3 md:gap-x-4 md:w-1/2 lg:w-[45%]">
        <div className="text-white rounded-full bg-[#BFBFBF] w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 xl:w-32 xl:h-32">
          <AiOutlineUser className="p-3 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 xl:w-32 xl:h-32" />
        </div>
        <div className="flex flex-col justify-between py-1">
          <div>
            <h2 className="font-semibold text-[24px] sm:text-2xl xl:text-3xl">{profile.fullName}</h2>
            <p className="opacity-70 text-sm sm:text-base xl:text-lg 2xl:text-xl">{profile.email}</p>
          </div>
          <Chip size="sm" className="bg-jajanWarning mt-3 rounded" radius="none">
            {profile.gender}
          </Chip>
        </div>
      </div>
    </div>
  )
}

export default Detail
