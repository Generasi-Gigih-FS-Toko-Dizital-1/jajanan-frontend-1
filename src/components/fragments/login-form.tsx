import { Link } from 'react-router-dom'
import { AiOutlineEye, AiOutlineLock, AiOutlineMail } from 'react-icons/ai'
import React from 'react'

export default function LoginForm (): React.ReactElement {
  return (
    <div className="flex rounded-xl border-2 border-jajanDark2 shadow-xl items-center justify-center w-11/12 sm:w-[480px] md:w-[732.86px] md:h-[500px] bg-white lg:w-[879.43px] lg:h-[600px]">
      <div className="flex flex-col items-center justify-center h-full w-full md:w-[55%] pb-10">
        <img src="/images/jajanmania-logo.svg" alt="Logo-1" className="w-28 sm:w-36 object-cover mt-6 sm:mt-10 mb-1 md:hidden" />
        <h1 className="font-medium text-xl sm:text-2xl text-center mb-5">Login Admin</h1>
        <form className="flex flex-col items-start justify-left w-[86%] sm:w-4/5 md:w-[75%]">
          <div className="relative w-full mt-4 sm:mt-5">
            <div className="absolute left-5 top-3 sm:top-3.5">
              <AiOutlineMail />
            </div>
            <input
              className="w-full border-2 border-jajanDark2 rounded-full text-sm md:text-base py-2 pl-10 pr-4 focus:shadow-md focus:shadow-jajanWarning transition-all ease-in-out duration-100"
              type="text" placeholder="Email"
            />
          </div>
          <div className="relative w-full mt-4 sm:mt-5">
            <div className="absolute left-5 top-3 sm:top-3.5">
              <AiOutlineLock />
            </div>
            <input
              className="w-full border-2 border-jajanDark2 rounded-full text-sm md:text-base py-2 px-10 focus:shadow-md focus:shadow-jajanWarning transition-all ease-in-out duration-100"
              type="password"
              placeholder="Password"
            />
            <div className="absolute right-2 top-1 sm:top-2">
              <button
                className="bg-white p-2 rounded-full"
                type="button"
              >
                <AiOutlineEye />
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
        <div className="mt-14 md:hidden scale-90">
          <p className="text-xs flex justify-center items-center mb-4">
            by
            <img src="/images/toko-dizital-logo.svg" alt="Logo-1" className="object-cover mt-1" />
          </p>
          <p className="text-xs scale-95 text-center">In collaboration with</p>
          <img src="/images/goto-logo.svg" alt="Logo-1" className="object-cover mt-1" />
        </div>
      </div>
      <div className="hidden md:flex flex-col text-center justify-between items-center border-l-2 border-jajanDark2 h-full w-[45%] py-10">
        <div>
          <img src="/images/jajanmania-logo.svg" alt="Logo-1" className="object-cover mt-1" />
          <p className="text-sm flex justify-center items-center">
            by
            <img src="/images/toko-dizital-logo.svg" alt="Logo-1" className="object-cover mt-1" />
          </p>
        </div>
        <div>
          <p className="text-xs">In collaboration with</p>
          <img src="/images/goto-logo.svg" alt="Logo-1" className="object-cover mt-1" />
        </div>
      </div>
    </div>
  )
}
