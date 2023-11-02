import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import {
  AiOutlineDashboard,
  AiOutlineShop,
  AiOutlineSwap,
  AiOutlineUser,
  AiOutlineUserSwitch,
  AiOutlineWallet
} from 'react-icons/ai'

import FullLayout from './components/layouts/FullLayout'

import Login from './components/pages/login'
import Dashboard from './components/pages/dashboard'

import AdminList from './components/pages/admin/List'
import AdminAdd from './components/pages/admin/Add'
import AdminEdit from './components/pages/admin/Edit'
import AdminDetail from './components/pages/admin/Detail'

import CustomerList from './components/pages/customer/List'
import CustomerAdd from './components/pages/customer/Add'
import CustomerDetail from './components/pages/customer/Detail'
import CustomerEdit from './components/pages/customer/Edit'

import VendorList from './components/pages/vendor/List'
import VendorAdd from './components/pages/vendor/Add'
import VendorDetail from './components/pages/vendor/Detail'
import VendorEdit from './components/pages/vendor/Edit'

import EWalletList from './components/pages/e_wallet/List'

import RequireAuth from './components/elements/RequireAuth'
import PersistLogin from './components/elements/PersistLogin'

export default function App (): React.ReactElement {
  const navList = [
    {
      title: 'Index',
      link: '/dashboard',
      icon: <AiOutlineDashboard />
    },
    {
      title: 'Street Vendors',
      link: '/vendors',
      icon: <AiOutlineShop />
    },
    {
      title: 'Customers',
      link: '/customers',
      icon: <AiOutlineUser />
    },
    {
      title: 'Manage admin',
      link: '/admins',
      icon: <AiOutlineUserSwitch />
    },

    {
      title: 'Manage Transaction',
      link: '/transactions',
      icon: <AiOutlineSwap />
    },
    {
      title: 'Manage e_wallet',
      link: '/wallets',
      icon: <AiOutlineWallet />
    }
  ]

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<PersistLogin />} >
        <Route element={<RequireAuth />} >
          <Route
            path="/"
            element={<FullLayout navList={navList} />}
          >
            <Route index element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admins">
              <Route index element={<AdminList />} />
              <Route path="add" element={<AdminAdd />} />
              <Route path="edit/:id" element={<AdminEdit />} />
              <Route path=":id" element={<AdminDetail />} />
            </Route>
            <Route path="/customers">
              <Route index element={<CustomerList />} />
              <Route path="add" element={<CustomerAdd />} />
              <Route path="edit/:id" element={<CustomerEdit />} />
              <Route path=":id" element={<CustomerDetail />} />
            </Route>
            <Route path="/vendors">
              <Route index element={<VendorList />} />
              <Route path="add" element={<VendorAdd />} />
              <Route path="edit/:id" element={<VendorEdit />} />
              <Route path=":id" element={<VendorDetail />} />
            </Route>
            <Route path="/wallets">
              <Route index element={<EWalletList />} />
              <Route path=":id" element={<VendorDetail />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}
