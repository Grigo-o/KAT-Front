"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import httpClient from "@/axios";

interface User {
  first_name: string;
  last_name: string;
  email: string;
}

interface UserContextValue {
  user: User | null;
  fetchUser: () => void;
  
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("access_token");
    
      if (!token) {
        console.log(`calling user fetchUser: without token`);
        
        console.log("User is not authenticated");
        return;
      }
        console.log(`calling user fetchUser: with token user_id: ${localStorage.getItem("user_id")}`);

    
      const user_id = localStorage.getItem("user_id");

      const response = await httpClient.get(`/user/${user_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
} 