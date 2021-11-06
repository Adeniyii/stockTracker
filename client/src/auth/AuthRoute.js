import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { setTokenAndUser } from '../utils/rerfeshUser';

const AuthRoute = ({ component: Component, ...rest }) => {
  console.log('auth route rendered...');
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
