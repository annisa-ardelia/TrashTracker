import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import React from 'react';
import './index.css';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import MainPage from './page/mainpage.jsx';
import MapPage from './page/mapPage.jsx';
import LoginPage from './page/loginPage.jsx';
import DataPage from './page/dataPage.jsx';
import DataManagementPage from './page/dataManagementPage.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<MainPage />} />
      <Route path='map' element={<MapPage />} />
      <Route path='login' element={<LoginPage />} />
      <Route path='sampah/:id' element={<DataPage />} />
      <Route path='DataManagement' element={<DataManagementPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
    </RouterProvider>
  </React.StrictMode>
);