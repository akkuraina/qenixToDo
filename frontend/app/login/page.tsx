"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) return;

    // For now we don't validate password (backend later)
    login(email);
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-80 space-y-6">
        <h1 className="text-2xl font-bold text-center">Login</h1>

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

          <button
            type="submit"
            className="w-full bg-black text-white p-2 rounded"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <Link href="/register" className="underline font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}