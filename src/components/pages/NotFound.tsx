/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React from 'react'

import useDocumentTitle from '../../hooks/useDocumentTitle'
import { useNavigate } from 'react-router-dom'
import { Button } from '@nextui-org/react'

export default function Index (): React.ReactElement {
  useDocumentTitle('Page Not Found')

  const navigate = useNavigate()

  return (
    <div className='flex flex-col items-center justify-center h-screen w-screen bg-jajanWarning'>
      <div className="text-center">
        <p className="text-base font-semibold text-jajanDark">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page not found</h1>
        <p className="mt-6 text-base leading-7 text-gray-600">Sorry, we couldn’t find the page you’re looking for.</p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button
            onPress={() => { navigate('/') }}
            className="rounded-md bg-jajanDark px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-jajanDark2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-jajanDark transition-all duration-300 ease-in-out"
          >
            &larr; Go back home
          </Button>
        </div>
      </div>
    </div>
  )
}
