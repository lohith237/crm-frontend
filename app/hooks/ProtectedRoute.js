"use client";

import { useSelector } from "react-redux";
import { redirect } from "next/navigation";

export function ProtectedRoute({ children }) {
  const { isAuthenticated } = useSelector((state) => state.login);
  if (!isAuthenticated) {
    redirect("/"); 
  }

  return children;
}
