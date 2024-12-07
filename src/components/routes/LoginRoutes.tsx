import React, { lazy } from 'react';

// project import
import Loadable from '../common/Loadable';
import ProtectAdminLogin from '../permissions/ProtectAdminLogin';

// render - login
const Login = Loadable(lazy(() => import('../pages/Login')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
  path: '',
  children: [
    {
      path: 'login',
      element: <ProtectAdminLogin />,
      children: [
        {
          path: '',
          element: <Login />,
        },
      ],
    },
  ],
};

export default LoginRoutes;
