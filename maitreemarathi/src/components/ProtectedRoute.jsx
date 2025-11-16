import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const user = localStorage.getItem("loggedInUser");

  // if not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // otherwise show the requested page
  return children;
}
