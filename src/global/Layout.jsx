import React from 'react';
import { Routes } from 'react-router-dom';
import PrivateRoutes from './components/privateRoutes/PrivateRoutes';
import Games from '../screen/games/Games';

const Layout = () => {
  return (
    <Routes>
      <PrivateRoutes isLoggedIn={true} path={'/gamePage'} component={<Games />} componentName={'GamePage'} />
    </Routes>
  );
};

export default Layout;
