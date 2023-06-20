import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';

const RootLayout = () => {
  return (
    <>
        <Header />
        <Outlet />
    </>
  );
};

export default RootLayout;