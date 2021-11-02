import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  console.log('protected route rendered...');
  const { user } = useContext(UserContext);
  console.log('current user: ', user);

  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <div>
            {!user && (
              <Redirect
                to={{
                  pathname: '/login',
                  state: {
                    from: props.location,
                  },
                }}
              />
            )}
            {user && <Component {...rest} {...props} />}
          </div>
        );
      }}
    />
  );
};

export default ProtectedRoute;
