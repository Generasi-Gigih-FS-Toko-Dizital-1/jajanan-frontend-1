import React from 'react'
import useFetch from '../../hooks/useFetch'

import { AiOutlineTeam, AiOutlineShop, AiOutlineUserSwitch, AiOutlineSwap, AiOutlineDollar, AiFillDollarCircle } from 'react-icons/ai'
import { Link } from 'react-router-dom'

export default function StatCards (): React.ReactElement {
  function getStatistics (entity: string): any {
    const whereInput = {
      deletedAt: null
    }
    const where: string = encodeURIComponent(JSON.stringify(whereInput))
    const url = `api/v1/statistics/counts?entity=${entity}&where=${where}`
    const { data } = useFetch(url)

    return data?.data.count
  }

  return (
    <div className="w-full grid grid-cols-12 gap-4">
      <Link
        className="col-span-12 sm:col-span-6 md:col-span-3 hover:shadow-lg hover:shadow-jajanWarning/50 hover:-translate-y-1 transition-all duration-200 ease-in-out"
        to="/customers"
      >
        <div className="flex flex-row bg-white shadow-sm rounded p-4">
          <div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-blue-100 text-blue-500">
            <AiOutlineTeam className="w-8 h-8" />
          </div>
          <div className="flex flex-col flex-grow ml-4">
            <div className="text-sm text-gray-500">Customer</div>
            <div className="font-bold text-lg">
              {getStatistics('user')}
            </div>
          </div>
        </div>
      </Link>
      <Link
        className="col-span-12 sm:col-span-6 md:col-span-3 hover:shadow-lg hover:shadow-jajanWarning/50 hover:-translate-y-1 transition-all duration-200 ease-in-out"
        to="/vendors"
      >
        <div className="flex flex-row bg-white shadow-sm rounded p-4">
          <div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-jajanWarning/20 text-jajanWarning">
            <AiOutlineShop className="w-8 h-8" />
          </div>
          <div className="flex flex-col flex-grow ml-4">
            <div className="text-sm text-gray-500">Vendor</div>
            <div className="font-bold text-lg">
              {getStatistics('vendor')}
            </div>
          </div>
        </div>
      </Link>
      <Link
        className="col-span-12 sm:col-span-6 md:col-span-3 hover:shadow-lg hover:shadow-jajanWarning/50 hover:-translate-y-1 transition-all duration-200 ease-in-out"
        to="/admins"
      >
        <div className="flex flex-row bg-white shadow-sm rounded p-4">
          <div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-slate-200 text-slate-600">
            <AiOutlineUserSwitch className="w-8 h-8" />
          </div>
          <div className="flex flex-col flex-grow ml-4">
            <div className="text-sm text-gray-500">Admin</div>
            <div className="font-bold text-lg">
              {getStatistics('admin')}
            </div>
          </div>
        </div>
      </Link>
      <Link
        className="col-span-12 sm:col-span-6 md:col-span-3 hover:shadow-lg hover:shadow-jajanWarning/50 hover:-translate-y-1 transition-all duration-200 ease-in-out"
        to="/transactions"
      >
        <div className="flex flex-row bg-white shadow-sm rounded p-4">
          <div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-orange-100 text-orange-500">
            <AiOutlineSwap className="w-8 h-8" />
          </div>
          <div className="flex flex-col flex-grow ml-4">
            <div className="text-sm text-gray-500">Transaction</div>
            <div className="font-bold text-lg">
              {getStatistics('transaction_history')}
            </div>
          </div>
        </div>
      </Link>
      <Link
        className="col-span-12 sm:col-span-6 md:col-span-3 hover:shadow-lg hover:shadow-jajanWarning/50 hover:-translate-y-1 transition-all duration-200 ease-in-out"
        to="/e-wallets"
      >
        <div className="flex flex-row bg-white shadow-sm rounded p-4">
          <div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-green-100 text-green-500">
            <AiOutlineDollar className="w-8 h-8" />
          </div>
          <div className="flex flex-col flex-grow ml-4">
            <div className="text-sm text-gray-500">Top Up</div>
            <div className="font-bold text-lg">
              {getStatistics('top_up_history')}
            </div>
          </div>
        </div>
      </Link>
      <Link
        className="col-span-12 sm:col-span-6 md:col-span-3 hover:shadow-lg hover:shadow-jajanWarning/50 hover:-translate-y-1 transition-all duration-200 ease-in-out"
        to="/e-wallets"
      >
        <div className="flex flex-row bg-white shadow-sm rounded p-4">
          <div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-green-100 text-green-500">
            <AiFillDollarCircle className="w-8 h-8" />
          </div>
          <div className="flex flex-col flex-grow ml-4">
            <div className="text-sm text-gray-500">Payout</div>
            <div className="font-bold text-lg">
              {getStatistics('top_up_history')}
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
