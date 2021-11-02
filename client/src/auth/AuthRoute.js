import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

const AuthRoute = ({ component: Component, ...rest }) => {
  console.log('auth route rendered...');
  const { data, error } = useFetch('/verify');

  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <div>
            {error && <Component {...rest} {...props} />}
            {data && (
              <Redirect
                to={{
                  pathname: '/',
                  state: {
                    from: props.location,
                  },
                }}
              />
            )}
          </div>
        );
      }}
    />
  );
};

export default AuthRoute;
