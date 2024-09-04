
import { Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../backendAddress/AuthProvider';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const { user } = useAuth();       // Access user from AuthProvider
  const location = useLocation();   // Get the current location for redirection

  return user ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
