import { api } from "@/lib/axios.js";
import { useQuery } from "@tanstack/react-query";
import { Post, PostsResponse } from "./typesPost.js";
import { IndividualPost } from "./postCard.js";


export const AllPosts = () => {
  const limit = 10;
  const {data, isLoading, error}=useQuery<PostsResponse>({
    queryKey: ["allPosts"],
    queryFn: async()=>{ 
      const res= await api.get<PostsResponse>(`post?limit=${limit}&cursor=""`)
      return res.data
    },
    staleTime: 1000 * 60 * 5, // 5 minutos
  })
  if (isLoading) return <p>Cargando posts...</p>;
  if (error) return <p>Error al cargar posts</p>;
  if (!data) return null;

  return (
    <div>
        {data.posts.map((post:Post)=>(
          <IndividualPost {...post}/>
        ))}
    </div>
  )
};
