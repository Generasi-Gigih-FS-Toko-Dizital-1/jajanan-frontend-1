import { Link } from 'react-router-dom'
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineLock, AiOutlineMail } from 'react-icons/ai'
import React from 'react'

interface LoginFormProps {
  passwordShown: boolean
  setPasswordShown: (value: boolean) => void
  fields: {
    email: string
    password: string
  }
  setFields: (value: {
    email: string
    password: string
  }) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

export default function LoginForm ({
  passwordShown, setPasswordShown,
  fields, setFields,
  handleSubmit
}: LoginFormProps): React.ReactElement {
  return (
    <form
      className="flex flex-col items-start justify-left w-[86%] sm:w-4/5 md:w-[75%]"
      onSubmit={handleSubmit}
    >
      <div className="relative w-full mt-4 sm:mt-5">
        <div className="absolute left-5 top-3 sm:top-3.5">
          <AiOutlineMail />
        </div>
        <input
          className="w-full border-2 border-jajanDark2 rounded-full text-sm md:text-base py-2 pl-10 pr-4 focus:shadow-md focus:shadow-jajanWarning transition-all ease-in-out duration-100"
          type="text" placeholder="Email"
          onChange={(e) => { setFields({ ...fields, email: e.target.value }) }}
          value={fields.email}
        />
      </div>
      <div className="relative w-full mt-4 sm:mt-5">
        <div className="absolute left-5 top-3 sm:top-3.5">
          <AiOutlineLock />
        </div>
        <input
          className="w-full border-2 border-jajanDark2 rounded-full text-sm md:text-base py-2 px-10 focus:shadow-md focus:shadow-jajanWarning transition-all ease-in-out duration-100"
          type={passwordShown ? 'text' : 'password'}
          placeholder="Password"
          onChange={(e) => { setFields({ ...fields, password: e.target.value }) }}
          value={fields.password}
        />
        <div className="absolute right-2 top-1 sm:top-2">
          <button
            className="bg-white p-2 rounded-full"
            type="button"
            onClick={() => { setPasswordShown(!passwordShown) }}
          >
            {passwordShown ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </button>
        </div>
      </div>
      <div className="flex w-full justify-between mt-5 text-sm lg:text-base">
        <div className="flex">
          <input type="checkbox" id="remember" name="remember" className="mr-0.5 sm:mr-2 border-2 border-jajanWarning rounded-full accent-jajanWarning" />
          <label htmlFor="remember">Remember me</label>
        </div>
        <Link to="/forgot-password" className="text-jajanDark2 underline">Forgot password?</Link>
      </div>
      <button
        className="bg-jajanDark2 text-white rounded-md py-2 px-10 md:px-8 mt-6 focus:shadow-md focus:shadow-jajanWarning transition-all ease-in-out duration-100"
        type="submit"
      >
        Login
      </button>
    </form>
  )
}
