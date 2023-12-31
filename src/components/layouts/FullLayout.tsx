import React, { useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

const FullLayout = (props: any): React.ReactElement => {
  const [sidebarOpened, setSidebarOpened] = useState(true)
  const toggleSidebar = (): void => {
    setSidebarOpened(!sidebarOpened)
  }
  return (
    <div className="flex">
      <Sidebar navList={props.navList} oppened={sidebarOpened} />
      <div
        className={`fixed top-0 left-0 z-[999] w-full h-screen bg-jajanDark2 ${sidebarOpened ? 'hidden bg-opacity-0' : 'block bg-opacity-30'} transition-opacity ease-in-out duration-150`}
        onClick={toggleSidebar}>
      </div>
      <div className="w-full flex flex-col">
        <Header sidebarToggle={toggleSidebar} />
        <main className="bg-[#ECECEC] mt-[72px] md:p-5 min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default FullLayout
