"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: string | null;
  loading: boolean;
  login: (email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Initialize auth state from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(storedUser);
      }
      setLoading(false);
    }
  }, []);

  const login = (email: string) => {
    localStorage.setItem("user", email);
    setUser(email);
    router.replace("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.replace("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};