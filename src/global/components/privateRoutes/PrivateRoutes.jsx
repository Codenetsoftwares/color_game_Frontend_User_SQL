import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import NotFoundPage from '../../../screen/landingpage/components/NotFoundPage';

const PrivateRoutes = ({ component: Component, isloggedin, componentName, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(routeProps) => {
        isloggedin ? componentName ? <component {...routeProps} /> : <NotFoundPage /> : <Navigate to="/login" />;
      }}
    />
  );
};

export default PrivateRoutes;
