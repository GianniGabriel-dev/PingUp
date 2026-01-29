import { createContext } from "react";

export type UserInfo = {
   id:number,
   username:string,
   email:string,
   googleId:string,
   avatar_url:string,
   bio:string,
   created_at:Date,
   name:string
}

export interface AuthContextType {
  user: UserInfo | null;
  loading:boolean;
  token: string | null;
  setToken:(token:string|null)=>void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
