"use client";

import { useSelector } from "react-redux";
import { redirect } from "next/navigation";

export function ProtectedRoute({ children }) {
  const { isAuthenticated } = useSelector((state) => state.login);
  console.log(isAuthenticated,"isAuthenticated")
  if (!isAuthenticated) {
    redirect("/"); 
  }

  return children;
}
