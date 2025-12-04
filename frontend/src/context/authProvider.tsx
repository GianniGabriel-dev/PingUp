import { useEffect, useState } from "react";


import { jwtDecode } from "jwt-decode";
import { AuthContext, UserPayload } from "./authContext.js";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserPayload | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    //si no hay token, loading es false para cargar la app sin usuario, y no se hace nada más
    if (!token){
      setLoading(false);
      return;
    } 
    //si hay token, se decodifica y se guarda el usuario en el estado
    try {
      const payload = jwtDecode<UserPayload>(token);
      setUser(payload);
    } catch {
      localStorage.removeItem("token");
    }finally{
      setLoading(false);
    }
    
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}


