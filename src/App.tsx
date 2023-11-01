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

import Login from './components/pages/Login'
import Dashboard from './components/pages/Dashboard'

import AdminList from './components/pages/Admin/List'
import AdminAdd from './components/pages/Admin/Add'
import AdminEdit from './components/pages/Admin/Edit'
import AdminDetail from './components/pages/Admin/Detail'

import CustomerList from './components/pages/Customer/List'
import CustomerAdd from './components/pages/Customer/Add'
import CustomerDetail from './components/pages/Customer/Detail'
import CustomerEdit from './components/pages/Customer/Edit'

import VendorList from './components/pages/Vendor/List'
import VendorAdd from './components/pages/Vendor/Add'
import VendorDetail from './components/pages/Vendor/Detail'
import VendorEdit from './components/pages/Vendor/Edit'

import EWalletList from './components/pages/E-Wallet/List'

import RequireAuth from './components/elements/require-auth'

export default function App (): React.ReactElement {
  const navList = [
    {
      title: 'Dashboard',
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
      title: 'Manage Admin',
      link: '/admins',
      icon: <AiOutlineUserSwitch />
    },

    {
      title: 'Manage Transaction',
      link: '/transactions',
      icon: <AiOutlineSwap />
    },
    {
      title: 'Manage E-Wallet',
      link: '/wallets',
      icon: <AiOutlineWallet />
    }
  ]

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
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
          <Route path="/wallet">
            <Route index element={<EWalletList />} />
            <Route path=":id" element={<VendorDetail />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}
