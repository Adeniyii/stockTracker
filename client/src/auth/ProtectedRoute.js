import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  console.log('protected route rendered...');
  const { data, error } = useFetch('/verify');

  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <div>
            {error && (
              <Redirect
                to={{
                  pathname: '/login',
                  state: {
                    from: props.location,
                  },
                }}
              />
            )}
            {data && <Component {...rest} {...props} />}
          </div>
        );
      }}
    />
  );
};

export default ProtectedRoute;
