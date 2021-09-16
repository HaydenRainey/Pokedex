import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';

import AllWorkView from 'src/pages/inquiry/AllWorkView';
import MyWorkView from 'src/pages/inquiry/MyWorkView';

import NotFoundView from 'src/pages/errors/NotFoundView';
import ProductListView from 'src/pages/product/ProductListView';

const routes = [
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      { path: '404', element: <NotFoundView /> }, 
      { path: '/Products', element: <ProductListView/> },
      { path: '/', element: <MyWorkView/> },
    ]
  }
];

export default routes;
