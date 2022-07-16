import React from "react";
import { Navigate, Outlet } from "react-router-dom";

interface IProtectedRoute {
  allowed: boolean;
  redirect: string;
  component: React.ReactNode;
}
export default function ProtectedRoute(props: IProtectedRoute) {
  if (!props.allowed) {
    return <Navigate to="/login" />;
  }

  return <>{props.component}</>;
}
