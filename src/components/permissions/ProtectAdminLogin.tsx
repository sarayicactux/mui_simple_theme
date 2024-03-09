import React from "react";
import { useSelector } from "react-redux";

import { RootState } from "../redux/reducers";

const ProtectAdminLogin = (props) => {
  // redux
  const { auth } = useSelector((state: RootState) => state.adminAuth);

  if (!auth.isAuthenticated) {
    return <props.component />;
  } else {
    window.location.replace(process.env.REACT_APP_STATIC_DIR);
  }
};
export default ProtectAdminLogin;
