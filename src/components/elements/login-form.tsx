import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineLock, AiOutlineMail } from "react-icons/ai";

export default function LoginForm() {
  return (
    <div className="flex rounded-xl border-2 border-jajanDark2 shadow-xl items-center justify-center bg-white md:w-[879.43px] md:h-[600px]">
      <div className="flex flex-col items-center justify-center border-r-2 border-jajanDark2 h-full w-[55%] pb-10">
        <h1 className="font-medium sm:text-2xl text-center mb-8">Login Admin</h1>
        <form className="flex flex-col items-start justify-left w-[75%]">
          <div className="relative w-full mt-5">
            <div className="absolute left-5 top-3.5">
              <AiOutlineMail />
            </div>
            <input 
              className="w-full border-2 border-jajanDark2 rounded-full py-2 pl-10 pr-4 focus:shadow-md focus:shadow-jajanWarning transition-all ease-in-out duration-100"
              type="text" placeholder="Email"
            />
          </div>
          <div className="relative w-full mt-5">
            <div className="absolute left-5 top-3.5">
              <AiOutlineLock />
            </div>
            <input 
              className="w-full border-2 border-jajanDark2 rounded-full py-2 px-10 focus:shadow-md focus:shadow-jajanWarning transition-all ease-in-out duration-100"
              type="password" 
              placeholder="Password" 
            />
            <div className="absolute right-2 top-2">
              <button 
                className="bg-white p-2 rounded-full"
                type="button"
              >
                <AiOutlineEye />
              </button>
            </div>
          </div>
          <div className="flex w-full justify-between mt-5">
            <div>
              <input type="checkbox" id="remember" name="remember" className="mr-2 border-2 border-jajanWarning rounded-full accent-jajanWarning" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <Link to="/forgot-password" className="text-jajanDark2 underline">Forgot password?</Link>
          </div>
          <button 
            className="bg-jajanDark2 text-white rounded-md py-2 px-8 mt-6 focus:shadow-md focus:shadow-jajanWarning transition-all ease-in-out duration-100"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
      <div className="flex flex-col text-center justify-between items-center h-full w-[45%] py-10">
        <div>
          <img src="/images/jajanmania-logo.svg" alt="Logo-1" className="object-cover mt-1" />
          <p className="text-xs flex justify-center items-center">
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
  );
}