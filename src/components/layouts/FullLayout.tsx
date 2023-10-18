import { useState } from "react";
import { NavigationListTypes } from "../../types/NavigationListTypes";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const FullLayout = ({ navList }: { navList: NavigationListTypes[] }) => {
  const [sidebarOpened, setSidebarOpened] = useState(true);
  const toggleSidebar = () => {
    setSidebarOpened(!sidebarOpened);
  };
  return (
    <div className="flex w-screen">
      <Sidebar navList={navList} oppened={sidebarOpened} />
      <div className="w-full h-screen flex flex-col">
        <Header sidebarToggle={toggleSidebar} />
        <main className="bg-[#ECECEC] px-5 py-5 h-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default FullLayout;
