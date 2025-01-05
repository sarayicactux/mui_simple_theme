import React from 'react';
import { useSelector } from 'react-redux';
import Layout from '../layout/user/public';
import Redirect from '../common/Redirect';

// redux setters
import { RootState } from '../redux/reducers';

const ProtectuserRoute = (props) => {
  const { auth } = useSelector((state: RootState) => state.userAuth);

  if (auth.isAuthenticated) {
    return <Layout />;
  } else {
    return <Redirect route="/login" />;
  }
};
export default ProtectuserRoute;
