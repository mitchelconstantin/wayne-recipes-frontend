import { Navigate } from "react-router-dom";
import { isLoggedIn, isAdmin, isOwner } from "../../AppBehaviors";

export const PrivateRoute = ({ element }: { element: JSX.Element }) => {
  return isLoggedIn() ? element : <Navigate to="/all" replace />;
};

export const PublicRoute = ({ element }: { element: JSX.Element }) => {
  return !isLoggedIn() ? element : <Navigate to="/all" replace />;
};

export const AdminRoute = ({ element }: { element: JSX.Element }) => {
  return isAdmin() ? element : <Navigate to="/all" replace />;
};

export const OwnerRoute = ({ element }: { element: JSX.Element }) => {
  return isOwner() ? element : <Navigate to="/all" replace />;
};
