import { Routes, Route } from "react-router-dom";

import Login from "./components/pages/Login";
import FullLayout from "./components/layouts/FullLayout";
import { AiOutlineDashboard, AiOutlineShop, AiOutlineUser, AiOutlineUserSwitch } from "react-icons/ai";

import AdminList from "./components/pages/Admin/List";
import AdminAdd from "./components/pages/Admin/Add";
import AdminEdit from "./components/pages/Admin/Edit";
import AdminDetail from "./components/pages/Admin/Detail";

import CustomerList from "./components/pages/Customer/List";
import CustomerAdd from "./components/pages/Customer/Add";
import CustomerDetail from "./components/pages/Customer/Detail";
import CustomerEdit from "./components/pages/Customer/Edit";

export default function App() {

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <FullLayout
              navList={[
                {
                  title: "Dashboard",
                  link: "/dashboard",
                  icon: <AiOutlineDashboard />,
                },
                {
                  title: "Street Vendors",
                  link: "/vendors",
                  icon: <AiOutlineShop />,
                },
                {
                  title: "Customers",
                  link: "/customers",
                  icon: <AiOutlineUser />,
                },
                {
                  title: "Manage Admin",
                  link: "/admin",
                  icon: <AiOutlineUserSwitch />,
                },
              ]}
            />
          }
        >
          <Route path="/admin">
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
        </Route>
      </Routes>
    </>
  );
}
