import { api } from "@/lib/axios.js";
import { useQuery } from "@tanstack/react-query";
import { Post, PostsResponse } from "./typesPost.js";
import { IndividualPost } from "./postCard.js";
import { useAuth } from "@/context/useAuth.js";
import { LoadingIcon } from "@/assets/icons/LoadingIcon.js";


export const AllPosts = () => {
  const limit = 10;
  const {token}= useAuth()
  const {data, isLoading, error}=useQuery<PostsResponse>({
    //si el token cambia (si el usuario se loguea o desloguea), se vuelve a ejecutar la query para obtener los posts correspondientes
    queryKey: ["allPosts"],
    queryFn: async()=>{ 
         console.log(data)
      const res= await api.get<PostsResponse>("post",{
        params: { limit, cursor: "" },
        //En caso de que el usario esté autenticado se podrá obtener su id desde el token para mostrar si ha dado like a algún comentario
        headers: token
          ? { Authorization: `Bearer ${token}` }
          : undefined, // no enviamos header si no hay token
      })
      return res.data
    },
    staleTime: 1000 * 60 * 5, // 5 minutos
    refetchOnWindowFocus: false,
  })
  if (isLoading) return <LoadingIcon size={40}/>
  if (error) return <p>Error al cargar posts</p>;
  if (!data) return null;
  

  return (
    <>
        {data.posts.map((post:Post)=>(
          <IndividualPost key={post.id} {...post}/>
        ))}
    </>
  )
};
