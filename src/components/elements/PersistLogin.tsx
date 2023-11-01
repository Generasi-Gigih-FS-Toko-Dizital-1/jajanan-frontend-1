import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import useRefreshToken from '../../hooks/useRefreshToken'
import useAuth from '../../hooks/useAuth'

const PersistLogin = (): React.ReactElement => {
  const [isLoading, setIsLoading] = useState(true)
  const refresh = useRefreshToken()
  const { auth }: any = useAuth()

  // console.log(`ini token dari persist: ${auth.session.accessToken}`)
  // return

  useEffect(() => {
    const verifyRefreshToken = async (): Promise<any> => {
      try {
        await refresh()
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }

    if (auth === undefined) {
      void (verifyRefreshToken())
    }
    if (auth !== undefined) {
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
    console.log(`aT: ${JSON.stringify(auth)}`)
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
