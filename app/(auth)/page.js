"use client";

import { useEffect, useState } from "react";
import { Logintemplate } from "../components";
import { loginUser } from "../redux";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.login
  );
  const [formData, setFormData] = useState({});

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated]);

  return (
    <Logintemplate
      handleLogin={handleLogin}
      handleChange={handleChange}
      loading={loading}
      error={error}
    />
  );
}
