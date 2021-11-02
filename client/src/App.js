import React from 'react';
import Login from './pages/login';
import DashBoard from './pages/dashboard';
import Register from './pages/register';
import Error from './pages/error';
import ProtectedRoute from './auth/ProtectedRoute';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthRoute from './auth/AuthRoute';

function App() {
  return (
    <div>
      <Router>
        {/* <Navbar /> */}
        <Switch>
          <ProtectedRoute exact path="/" component={DashBoard} />
          <AuthRoute path="/login" component={Login} />
          <AuthRoute path="/register" component={Register} />
          <Route path="*" component={Error} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
