import { Route, Routes } from "react-router-dom";
import React from "react";
import ProtectAdminRoute from "./permissions/ProtectAdminRoute";
import ProtectAdminLogin from "./permissions/ProtectAdminLogin";

import Dash from "./pages/Dash";

import AdminLogin from "./pages/Login";
import P404 from "./pages/P404";
// import RecoverAdminPassword from "./pages/RecoverPassword";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProtectAdminRoute component={Dash} exact />} />
      <Route path="" element={<ProtectAdminRoute component={Dash} exact />} />

      <Route
        path="/login"
        element={<ProtectAdminLogin component={AdminLogin} />}
      />
      {/* <Route
        path="/forgetPassword"
        element={<ProtectAdminLogin component={RecoverAdminPassword} />}
      /> */}
      <Route path="*" element={<ProtectAdminRoute component={P404} />} />
    </Routes>
  );
};
export default AppRoutes;