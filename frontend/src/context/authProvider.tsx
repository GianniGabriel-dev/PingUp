import { useEffect, useState } from "react";
import { AuthContext, UserInfo } from "./authContext.js";
import { api } from "@/lib/axios.js";



export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  useEffect(() => {
    const fetchUser = async ()=>{
      //si no hay token, loading es false para cargar la app sin usuario, y no se hace nada más
      if (!token){
        setUser(null)
        setLoading(false);
        return;
      } 
      //si hay token, se intenta obtener la información del usuario con ese token mediante una petición a la API, cada token contiene el id y el nombre de usuario
      try {
        const res =  await api.get("/me",{
          headers:{
            Authorization:`Bearer ${token}`
          }
        })
        setUser(res.data);
        console.log("consolaaaaa")
      } catch {
        setToken(null);
      }finally{
        setLoading(false);
      }
    }
    fetchUser()
    
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, loading, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}


