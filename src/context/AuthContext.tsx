
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { User } from "@/types";
import { toast } from "@/components/ui/sonner";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const defaultUser: User = {
  id: "1",
  name: "Demo User",
  email: "user@example.com",
  role: "user",
  avatar: "/placeholder.svg"
};

const defaultAdmin: User = {
  id: "2",
  name: "Admin User",
  email: "admin@example.com",
  role: "admin",
  avatar: "/placeholder.svg"
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is saved in localStorage on component mount
    const savedUser = localStorage.getItem("furniture-user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulating login API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Demo login logic
      if (email === "admin@example.com" && password === "admin") {
        setUser(defaultAdmin);
        localStorage.setItem("furniture-user", JSON.stringify(defaultAdmin));
        toast.success("Admin logged in successfully");
        setIsLoading(false);
        return true;
      } else if (email === "user@example.com" && password === "user") {
        setUser(defaultUser);
        localStorage.setItem("furniture-user", JSON.stringify(defaultUser));
        toast.success("Logged in successfully");
        setIsLoading(false);
        return true;
      } else {
        toast.error("Invalid credentials");
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed");
      setIsLoading(false);
      return false;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulating register API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Create a new user
      const newUser: User = {
        id: Math.random().toString(36).substring(2, 9),
        name,
        email,
        role: "user",
        avatar: "/placeholder.svg"
      };
      
      setUser(newUser);
      localStorage.setItem("furniture-user", JSON.stringify(newUser));
      toast.success("Registered successfully");
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed");
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("furniture-user");
    toast.info("Logged out");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
