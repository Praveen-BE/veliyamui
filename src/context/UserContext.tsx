import { createContext, useContext, Dispatch, SetStateAction } from "react";

// Define the shape of your User object
export interface User {
  id: string;
  email: string;
  role: string;
  display_name: string;
  bio: string;
  language_code: string;
  created_at: string;
}

// Define the shape of the Context Value
interface UserContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

// Initialize with undefined so we can check if it's used within a Provider
export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

// A custom hook to use the UserContext easily
export const useAuth = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a UserProvider");
  }
  return context;
};
