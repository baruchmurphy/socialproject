import React from 'react';
import { Switch, Route } from 'react-router-dom'
import { PrivateRoute } from './privateroute';
import Home from './main'
import Login from './views/auth/login';
import Register from './views/auth/register';
import Forgot from './views/auth/forgot';

const Routes = () => {
  return (
    <Switch>
      <Route exact path='/' component={Login} />
      <Route exact path='/login' component={Login} />
      <Route path='/register' component={Register} />
      <Route exact path='/forgot' component={Forgot} />
      <PrivateRoute exact path='/home' component={Home}/>
      <PrivateRoute exact path='/favorites' component={Home} />
      <PrivateRoute exact path='/settings' component={Home} />
      <PrivateRoute exact path='/error1' component={Home} />
    </Switch>
  );
}

export default Routes;