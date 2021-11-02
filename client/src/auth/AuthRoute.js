import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const AuthRoute = ({ component: Component, ...rest }) => {
  console.log('auth route rendered...');
  const { user } = useContext(UserContext);
  console.log('current user:', user);

  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <div>
            {!user && <Component {...rest} {...props} />}
            {user && (
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
