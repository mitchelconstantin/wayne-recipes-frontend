import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { isLoggedIn, isAdmin, isOwner } from "../../AppBehaviors";

export const PrivateRoute = ({ ...props }) => {
  const loggedIn = isLoggedIn();

  return loggedIn ? <Route {...props} /> : <Redirect to="/all" />;
};

export const PublicRoute = ({ ...props }) => {
  const loggedOut = !isLoggedIn();

  return loggedOut ? <Route {...props} /> : <Redirect to="/all" />;
};

export const AdminRoute = ({ ...props }) => {
  const admin = isAdmin();

  return admin ? <Route {...props} /> : <Redirect to="/all" />;
};

export const OwnerRoute = ({ ...props }) => {
  const owner = isOwner();

  return owner ? <Route {...props} /> : <Redirect to="/all" />;
};
