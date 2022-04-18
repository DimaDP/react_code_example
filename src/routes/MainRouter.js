import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import Login from '../scenes/Login/Login';
import PublicRoute from './PublicRouter';
import NoFound from '../scenes/NoFound';
import PrivateRoute from './PrivateRoute';
import Users from '../scenes/Users/Users';
import Orders from '../scenes/Orders/Orders';
import Header from '../components/Header/Header';
import { useRootModel } from '../models/RootModel';

const container = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
};

const MainRouter = () => {
  const {
    auth: { isAuthenticated },
  } = useRootModel();

  return (
    <BrowserRouter>
      <div style={container}>
        <Header />
        <Switch>
          <PublicRoute path='/login' isAuthenticated={isAuthenticated}>
            <Login />
          </PublicRoute>
          <PrivateRoute path='/users' isAuthenticated={isAuthenticated}>
            <Users />
          </PrivateRoute>
          <PrivateRoute path='/orders' isAuthenticated={isAuthenticated}>
            <Orders />
          </PrivateRoute>
          <Redirect exact from='/' to='/users' />
          <Route path='*'>
            <NoFound />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default observer(MainRouter);
