import React from 'react';
import { useSelector } from 'react-redux';
import Layout from '../layout/admin/public';

// redux setters
import { RootState } from '../redux/reducers';

const ProtectAdminRoute = (props) => {
  const { auth } = useSelector((state: RootState) => state.adminAuth);

  if (auth.isAuthenticated) {
    return <Layout />;
  } else {
    window.location.replace(`${process.env.REACT_APP_STATIC_DIR}login`);
  }
};
export default ProtectAdminRoute;
