import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import PokeGalleryPage from './pages/PokeGallery';

import NotFoundView from 'src/pages/errors/NotFoundView';
import ProductListView from 'src/pages/product/ProductListView';

const routes = [
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      { path: '404', element: <NotFoundView /> }, 
      { path: '/Products', element: <ProductListView/> },
      { path: '/', element: <PokeGalleryPage/> },
    ]
  }
];

export default routes;
