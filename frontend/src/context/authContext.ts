import { createContext } from "react";

export interface UserPayload {
  id: string;
  username: string;
}

export interface AuthContextType {
  user: UserPayload | null;
  loading:boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
