"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <nav className="bg-white border-b px-6 py-4 flex justify-between items-center">
      <Link href="/dashboard" className="font-bold text-lg">
        Task Manager
      </Link>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">{user}</span>

        <button
          onClick={logout}
          className="bg-black text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}