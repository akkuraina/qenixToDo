"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setError("");

    // For now: registering logs user in
    login(email);
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-80 space-y-6">
        <h1 className="text-2xl font-bold text-center">Register</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            required
            placeholder="Email"
            className="w-full border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            required
            placeholder="Password"
            className="w-full border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            required
            placeholder="Confirm Password"
            className="w-full border p-2 rounded"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-black text-white p-2 rounded"
          >
            Create Account
          </button>
        </form>

        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="underline font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}