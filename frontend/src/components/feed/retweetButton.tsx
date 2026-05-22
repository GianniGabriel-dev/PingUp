import { useState } from 'react';
import { RetweetIcon } from '@/assets/icons/index.js';
import { useParams } from 'react-router-dom';
import { api } from '@/lib/axios.js';
import { useAuth } from '@/context/useAuth.js';
import {  useMutation, useQueryClient } from "@tanstack/react-query";


type Props = {
  postId: number;
  reposts: number | null;
  initialIsReposted: boolean;
};

export default function RetweetButton({
  postId,
  reposts,
  initialIsReposted,
}: Props) {
 const { username} = useParams();
 const queryClient = useQueryClient();
  //se obtiene parent_post_id si existe para invalidar la query
  const  parent_post_id = useParams().postId
  const [numReposts, setNumReposts] = useState(reposts ?? 0);
  const [IsReposted, setIsReposted] = useState(initialIsReposted);
  const {token} = useAuth()
  // Mutación (funcion de react query) para manejar el repost/unrepost
  const repostMutation = useMutation({
    mutationFn: async () => {
      await api.post(
        `/repost/${postId}`,
        //vacio porque el endpoint de repost no necesita body
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )},

    //Se actualiza el estado de los Reposts  antes de que la petición se complete
    onMutate: () => {
      setIsReposted((prev) => !prev);
      setNumReposts((prev) => (IsReposted ? prev - 1 : prev + 1));
    },
    //se invalidan la querry de posts para que al cambiar de pestaña se actualicen los Reposts
    onSuccess: ()=>{
      queryClient.invalidateQueries({ queryKey:["allPosts"]})
      queryClient.invalidateQueries({ queryKey: ["posts", "detail", parent_post_id] });
      queryClient.invalidateQueries({ queryKey: ["userPosts", username, "posts"] });
    },

    // Si hay un error una vez realizada la petición, revertimos los cambios
    onError: () => {
      setIsReposted((prev) => !prev);
      setNumReposts((prev) => (IsReposted ? prev + 1 : prev - 1));
    },
  });
 //si no existe el token no actualiza el estado del num de Reposts
  const handleRetweet = (e: React.MouseEvent) => {
    e?.stopPropagation(); // Evita el click en el retweet se propague al post y lo abra
    if (token){
      if (repostMutation.isPending) return;
      repostMutation.mutate();
    }

  };
  return (
      <button
        onClick={handleRetweet}
        disabled={repostMutation.isPending}
        className={`${IsReposted ? "text-emerald-600" : ""} flex gap-0.5 items-center cursor-pointer transition-all duration-300 hover:text-emerald-600 active:scale-95`}
      >
        <RetweetIcon isReposted={IsReposted} size={20}/>
        <span>{numReposts >0? numReposts:""}</span>
      </button>
  );
}