import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { routeNames, routes } from '../router';

const appRouter = () => {
  return (
    <Switch>
      {routes.map((route) => (
        <Route
          path={route.path}
          exact={route.exact}
          component={route.component}
          key={route.path}
        />
      ))}
      <Redirect to={routeNames.STOREYS_LIST} />
    </Switch>
  );
};

export default appRouter;
