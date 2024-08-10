import React from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useContext(CurrentUserContext);

  // If the user is not logged in, redirect to the home page
  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  // If the user is logged in, render the children components (protected content)
  return children;
};

export default ProtectedRoute;
