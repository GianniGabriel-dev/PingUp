import { useState } from "react";
import { AuthContext, UserInfo } from "./authContext.js";
import { api } from "@/lib/axios.js";
import { useQuery } from "@tanstack/react-query";



export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  const { data: user, isLoading } = useQuery({
    queryKey: ["user", token], // Agregado token a las dependencias
    queryFn: async () => {
      if (!token) return null;
      try {
        const res = await api.get<UserInfo>("/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('🟢 Usuario obtenido del servidor:', res.data);
        return res.data;
      } catch (error) {
        console.error('❌ Error obteniendo datos del usuario:', error);
        return null;
      }
    },
    enabled: !!token, // solo ejecuta si hay token
    refetchOnWindowFocus: false,
  });

  // Actualizar localStorage cuando cambia el token
  const handleSetToken = (newToken: string | null) => {
    if (newToken) {
      localStorage.setItem("token", newToken);
    } else {
      localStorage.removeItem("token");
    }
    setToken(newToken);
  };

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <AuthContext.Provider value={{ user, isLoading, token, setToken: handleSetToken }}>
      {children}
    </AuthContext.Provider>
  );
}



