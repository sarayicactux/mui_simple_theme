import React from 'react';
import { useSelector } from 'react-redux';
 import { Outlet } from 'react-router-dom';

// redux setters
import { RootState } from '../redux/reducers';

const ProtectAdminLogin = (props) => {
  const { auth } = useSelector((state: RootState) => state.adminAuth);

  if (!auth.isAuthenticated) {
    return <Outlet />;
  } else {
     window.location.replace(`${process.env.REACT_APP_STATIC_DIR}`);
  }
};
export default ProtectAdminLogin;
