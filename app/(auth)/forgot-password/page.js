"use client";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your forgot password logic here
    setMessage(`If ${email} exists, a reset link has been sent.`);
    console.log("Forgot Password request for:", email);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full max-w-md p-8 bg-white shadow-lg rounded-lg"
    >
      <h1 className="text-2xl font-bold text-center">Forgot Password</h1>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Send Reset Link
      </button>
      {message && <p className="text-green-500 text-center mt-2">{message}</p>}
    </form>
  );
}
