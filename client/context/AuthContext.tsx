import React, { createContext, useContext, useState, useEffect } from "react";

export interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("fesnuk_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to parse saved user");
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    const savedUsers = JSON.parse(localStorage.getItem("fesnuk_users") || "[]");
    const foundUser = savedUsers.find(
      (u: any) => u.email === email && u.password === password
    );

    if (!foundUser) {
      throw new Error("Invalid email or password");
    }

    const userData: User = {
      id: foundUser.id,
      email: foundUser.email,
      name: foundUser.name,
    };

    setUser(userData);
    localStorage.setItem("fesnuk_user", JSON.stringify(userData));
  };

  const signup = async (email: string, password: string, name: string) => {
    if (!email || !password || !name) {
      throw new Error("All fields are required");
    }

    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }

    const savedUsers = JSON.parse(localStorage.getItem("fesnuk_users") || "[]");

    if (savedUsers.some((u: any) => u.email === email)) {
      throw new Error("Email already exists");
    }

    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      password,
      name,
    };

    savedUsers.push(newUser);
    localStorage.setItem("fesnuk_users", JSON.stringify(savedUsers));

    const userData: User = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
    };

    setUser(userData);
    localStorage.setItem("fesnuk_user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("fesnuk_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
