import React, { lazy } from 'react';
import Loadable from '../common/Loadable';

// project layouts

import ProtectAdminRoute from '../permissions/ProtectAdminRoute';

// render - pages
import Landing from '../pages/Landing';
import P404 from '../pages/P404';

const Froms = Loadable(
  lazy(() => import('../pages/forms/index')),
);
const Datagtid = Loadable(
  lazy(() => import('../pages/datagrid/index')),
);
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  // element: <ProtectAdminRoute />,
  children: [
    {
      path: '',
      element: <ProtectAdminRoute />,
      children: [
        {
          path: '',
          element: <Landing />,
        },
        {
          path: '/froms',
          element: <Froms />,
        },
        {
          path: '/datagrid',
          element: <Datagtid />,
        },
        {
          path: '/modal',
          element: <Froms />,
        },

      ],
    },
    {
      path: '*',
      element: <P404 />,
    },
  ],
};

export default MainRoutes;
