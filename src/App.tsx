import { Route, Routes } from "react-router-dom";
import List from "./components/pages/Admin/List";
import Login from "./components/pages/Login";
import FullLayout from "./components/layouts/FullLayout";
import StreetVendors from "./components/pages/StreetVendors/StreetVendors";
import Add from "./components/pages/Admin/Add";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <FullLayout
            sidebarMenu={[
              { label: "Manage Admin", link: "/admin" },
              { label: "Street Vendors", link: "/vendors" },
            ]}
          />
        }
      >
        <Route path="/admin">
          <Route index element={<List />} />
          <Route path="add" element={<Add />} />
        </Route>
        <Route path="vendors" element={<StreetVendors />} />
      </Route>
    </Routes>
  );
}

export default App;
