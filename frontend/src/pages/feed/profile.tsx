import { AllUserPosts } from "@/components/user/allUserPosts.js";
import { ErrorFindingUser } from "@/components/user/errorFindingUser.js";
import { HeroUser } from "@/components/user/heroUser.js";
import { useAuth } from "@/context/useAuth.js";
import { api } from "@/lib/axios.js";
import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export function Profile() {
  const {token}= useAuth()
  const username = useParams().username;
  const location = useLocation();
  const navigate = useNavigate();
  //se guarda la ubicación del scroll con useRef para evitar que se pierda al cerrar el modal de compose por ejemplo
  const scrollRef = useRef(location.state?.scrollY);

  const handleBack = () => {
    navigate(-1); // volver a la página anterior
    window.scrollTo(0, scrollRef.current); // restaurar scroll
  };
  const { data, isLoading } = useQuery({
    queryKey: ["user", username],
    queryFn: async () => {
      const res = await api.get(`/${username}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },
    refetchOnWindowFocus: false,
  });
  console.log(data)
  //si no está cargando y no se han encontrado datos del usuario, se muestra un mensaje de error
  if (!isLoading && !data.username) {
    return <ErrorFindingUser username={username} handleBack={handleBack} />;
  }
  return (
    <>
      <HeroUser data={data} isLoading={isLoading} handleBack={handleBack} />
      <AllUserPosts />
    </>
  );
}
