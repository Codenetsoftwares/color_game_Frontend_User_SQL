import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppContext } from '../../contextApi/context';

function PrivateRoute({ children }) {
  const { store } = useAppContext();
  return store.user.isLogin ? <>{children}</> : <Navigate to="/" />;
}

export default PrivateRoute;
