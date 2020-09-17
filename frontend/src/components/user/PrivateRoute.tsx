import React from 'react';
import { RouteProps, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectUser } from './userSlice';

export const PrivateRoute: React.FC<RouteProps> = (props) => {
  const { authenticated } = useSelector(selectUser);
  if (authenticated) 
    return <Route {...props} />;

  return (
    <Route {...props} render={undefined}>
      <Redirect to="/signin" />
    </Route>
  );
};
