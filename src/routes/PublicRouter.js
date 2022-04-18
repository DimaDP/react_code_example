import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

function PublicRoute({ children, isAuthenticated }) {
  // const location = useLocation();
  // const { from } = location.state || { from: { pathname: '/', search: location.search } };

  return <Route render={() => (!isAuthenticated ? children : <Redirect to='/users' />)} />;
}

PublicRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node, PropTypes.func]).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default PublicRoute;
