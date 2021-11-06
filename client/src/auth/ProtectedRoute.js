import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { setTokenAndUser } from '../utils/rerfeshUser';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  console.log('protected route rendered...');
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      if (!user) {
        const newUser = await setTokenAndUser();
        setUser(newUser);
      }
    })();
  });

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
