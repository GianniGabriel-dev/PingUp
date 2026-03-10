import { useState } from "react";
import { AuthContext, UserInfo } from "./authContext.js";
import { api } from "@/lib/axios.js";
import { useQuery } from "@tanstack/react-query";



export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));

const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      if (!token) return null;
      const res = await api.get<UserInfo>("/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    enabled: !!token, // solo ejecuta si hay token
    refetchOnWindowFocus: false,
  });

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <AuthContext.Provider value={{ user, isLoading, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}


