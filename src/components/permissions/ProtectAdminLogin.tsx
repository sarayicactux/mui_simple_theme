import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Redirect from '../common/Redirect';

// redux setters
import { RootState } from '../redux/reducers';

const ProtectuserLogin = (props) => {
  const { auth } = useSelector((state: RootState) => state.userAuth);

  if (!auth.isAuthenticated) {
    return <Outlet />;
  } else {
    return <Redirect route="/" />;
  }
};
export default ProtectuserLogin;
