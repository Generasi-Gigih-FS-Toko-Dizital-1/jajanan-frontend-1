import { Routes, Route } from "react-router-dom";

import Login from "./components/pages/Login";
import FullLayout from "./components/layouts/FullLayout";
import AdminList from "./components/pages/Admin/List";
import { AiOutlineDashboard, AiOutlineShop } from "react-icons/ai";
import AdminAdd from "./components/pages/Admin/Add";
import AdminEdit from "./components/pages/Admin/Edit";
import AdminDetail from "./components/pages/Admin/Detail";

export default function App() {
  // const location = useLocation();

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
                  title: "Admin",
                  link: "/admin",
                  icon: <AiOutlineDashboard />,
                },
                {
                  title: "Street Vendors",
                  link: "/vendors",
                  icon: <AiOutlineShop />,
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
        </Route>
      </Routes>
    </>
  );
}
