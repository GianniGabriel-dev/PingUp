import { BackIcon } from "@/assets/icons/BackIcon.js";
import { Header } from "../ui/header.js";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useRef } from "react";
import { Post, PostsResponse } from "./typesPost.js";
import { api } from "@/lib/axios.js";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/context/useAuth.js";
import { LoadingIcon } from "@/assets/icons/LoadingIcon.js";
import { IndividualPost } from "./postCard.js";

export const DetailsPost = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const parent_post_id= useParams().postId
  const queryClient= useQueryClient()

  //se guarda la ubicación del scroll con useRef para evitar que se pierda al cerrar el modal de compose por ejemplo
  const scrollRef = useRef(location.state?.scrollY);

  const handleBack = () => {
    queryClient.invalidateQueries({queryKey: ["posts", "detail", parent_post_id]})
    navigate(-1); // volver a la página anterior
    window.scrollTo(0, scrollRef.current); // restaurar scroll
  };

  const limit = 10;
  const {token}= useAuth()
 
  const {data, isLoading, error}=useQuery<PostsResponse>({
    //si el token cambia (si el usuario se loguea o desloguea), se vuelve a ejecutar la query para obtener los posts correspondientes
    queryKey: ["posts", "detail", parent_post_id],
    queryFn: async()=>{ 
      const res= await api.get<PostsResponse>(`post/${parent_post_id}`,{
        params: { limit, cursor: "" },
        //En caso de que el usario esté autenticado se podrá obtener su id desde el token para mostrar si ha dado like a algún comentario
        headers: token
          ? { Authorization: `Bearer ${token}` }
          : undefined, // no enviamos header si no hay token
      })
      return res.data
    },
    enabled: !!parent_post_id,
    staleTime: 1000 * 60 * 5, // 5 minutos
    refetchOnWindowFocus: false,
  })
  console.log(data)
  if (isLoading) return <LoadingIcon size={40}/>
  if (error) return <p>Error al cargar posts</p>;
  if (!data) return null;

   

  return (
    <>
    <Header>
      <div className="flex gap-10 place-items-center">
        <button type="button" onClick={handleBack}>
          <BackIcon
            size={30}
            className={
              "transition-all duration-300 rounded-3xl p-0.75 hover:bg-zinc-800 cursor-pointer"
            }
          />
          <span className="sr-only">Volver</span>
        </button>
        <p className="font-extrabold text-xl">Post</p>
      </div>
    </Header>
        <>
        {data.posts.replies.map((reply:Post)=>(
          <IndividualPost key={reply.id} {...reply}/>
        ))}
        </>
    </>
  );
};
