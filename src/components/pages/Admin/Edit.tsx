import { Button } from '@nextui-org/react'
import React from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { useNavigate, useParams } from 'react-router-dom'
import AdminForm from '../../fragments/admin-form'
import useFetch, { type Config } from '../../../hooks/useFetch'
import BackendOneClient from '../../../clients/BackendOneClient'

const AdminEdit = (): React.ReactElement => {
  const navigate = useNavigate()
  const { id } = useParams()

  const url = `${import.meta.env.VITE_BACKEND_ONE_URL}api/v1/admins/${id}`
  const config: Config = {
    headers: {
      // localStorage.getItem("token")
      Authorization:
        'Bearer ' +
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOiJhNjU3ZDVlMy1mYjRjLTQ2NTMtOTNhNC1jZjQwOGFmMjI5NTQiLCJhY2NvdW50VHlwZSI6IkFETUlOIiwiaWF0IjoxNjk4ODIzMjIxLCJleHAiOjE2OTg4MjM4MjF9.N2iqxd47QwFGdCCgZywsaHPRmPLVxk_728prHY5uxsk',
      Accept: 'application/json'
    }
  }
  const { data, loading } = useFetch(url, config)
  const loadingBar: React.ReactElement = <>{loading && 'Loading...'}</>

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const client = new BackendOneClient()
    const editAdmin = async (form: HTMLFormElement): Promise<void> => {
      const fullName = form.fullName.value
      const email = form.email.value
      const gender = form.gender.value
      const password = form.password.value

      try {
        await client.instance.patch(url, {
          fullName,
          email,
          gender,
          password
        },
        {
          headers: {
            Authorization: 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOiJhNjU3ZDVlMy1mYjRjLTQ2NTMtOTNhNC1jZjQwOGFmMjI5NTQiLCJhY2NvdW50VHlwZSI6IkFETUlOIiwiaWF0IjoxNjk4ODEzNjc3LCJleHAiOjE2OTg4MTQyNzd9.EvRPWRXlL7TcyAHBdcXCs0vtfUoLf23Zo5zDQCYJwE0',
            Accept: 'application/json'
          }
        })

        alert('Edit admin success')
        navigate(`/admin/${id}`)
      } catch (err) {
        alert('Error: ' + fullName + email + gender + password)
        console.log(err)
      }
    }

    void editAdmin(e.target as HTMLFormElement)
  }

  return (
    <div className="bg-white py-5 md:px-3">
      <div className="flex justify-between mx-4 mb-4">
        <h2 className="font-semibold text-xl sm:text-2xl md:text-xl lg:text-2xl">Edit Admin {data?.data.fullName}</h2>
        {/* Belum semua data muncul (baru fullname sama email) */}
        <Button
          onPress={() => { navigate('/admin') }}
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
        <AdminForm
          className="p-4"
          action={handleSubmit}
          data={data?.data}
        />

          )}
    </div>
  )
}

export default AdminEdit
