import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import useRefreshAccessToken from '../../hooks/useRefreshAccessToken.tsx'
import useAuthentication from '../../hooks/useAuthentication.ts'

const PersistLogin = (): React.ReactElement => {
  const [isLoading, setIsLoading] = useState(true)
  const refreshAccessToken = useRefreshAccessToken()
  const { authentication }: any = useAuthentication()

  // console.log(`ini token dari persist: ${auth.session.accessToken}`)
  // return

  useEffect(() => {
    const verifyRefreshToken = async (): Promise<any> => {
      try {
        await refreshAccessToken()
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }

    if (authentication === undefined) {
      void (verifyRefreshToken())
    }
    if (authentication !== undefined) {
      setIsLoading(false)
    }
    // if (!auth) {
    //   console.log('auth is undefined')
    //   // verifyRefreshToken()
    // } else {
    //   console.log('auth is defined')
    //   setIsLoading(false)
    // }
  }, [])

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`)
    console.log(`aT: ${JSON.stringify(authentication)}`)
  }, [isLoading])

  return (
    <>
      {isLoading
        ? <div>Loading...</div>
        : <Outlet />
        // Berhasil ke Outlet tetapi diminta login lagi dan token yang ada di console.log(`at: ...`) di atas menjadi kosong
      }
    </>
  )
}

export default PersistLogin
