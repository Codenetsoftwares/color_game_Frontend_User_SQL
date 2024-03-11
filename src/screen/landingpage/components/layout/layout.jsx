import React from 'react';
import TopNav from '../../TopNavBar/TopNav';
import SideNav from './sidebar/SideNav';
import { Outlet, useLocation } from 'react-router-dom';
import LandingPage from '../../landingPage';
import AppDrawer from '../../../common/appDrawer';

const layout = () => {
  const location = useLocation();
  console.log(location);
  return (
    <div className="bg-light">
      <TopNav />
      <div className="row " style={{ minHeight: '85vh' }}>
        <div className={`${['/', '/home'].includes(location.pathname) ? '' : 'col-2'} border border-3`}>
          {['/', '/home'].includes(location.pathname) ? null : <AppDrawer />}
        </div>
        <div className={`${['/', '/home'].includes(location.pathname) ? 'col-12' : 'col-8'} border border-3`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default layout;
