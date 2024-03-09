import React from "react";
import { useSelector } from "react-redux";

import AdminPage from "../layout/admin/AdminPage";
import { RootState } from "../redux/reducers";

const ProtectAdminRoute = (props) => {
  const { auth } = useSelector((state: RootState) => state.adminAuth);

  if (!auth.isAuthenticated) {
    window.location.replace(`${process.env.REACT_APP_STATIC_DIR}login`);
  } else {
    return (
      <AdminPage>
        <props.component />
      </AdminPage>
    );
  }
};
export default ProtectAdminRoute;
