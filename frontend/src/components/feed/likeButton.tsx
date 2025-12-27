import { useState } from "react";
import {  useMutation, useQueryClient } from "@tanstack/react-query";
import { HearthIcon } from "@/assets/icons";
import { api } from "@/lib/axios.js";
import { useAuth } from "@/context/useAuth.js";

type Props = {
  postId: number;
  likes: number | null;
  initialIsLiked: boolean
};

export default function LikeButton({
  postId,
  likes,
  initialIsLiked,
}: Props) {
  const queryClient = useQueryClient();
  const [numLikes, setNumLikes] = useState(likes ?? 0);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const {token} = useAuth()
  // Mutación (funcion de react query) para manejar el like/unlike
  const likeMutation = useMutation({
    mutationFn: async () => {
      await api.post(
        `/like/${postId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )},

    //Se actualiza el estado de los likes  antes de que la petición se complete
    onMutate: () => {
      setIsLiked((prev) => !prev);
      setNumLikes((prev) => (isLiked ? prev - 1 : prev + 1));
    },
    //se invalidan la querry de posts para que al cambiar de pestaña se actualicen los likes
    onSuccess: ()=>{
      queryClient.invalidateQueries({ queryKey:["allPosts"]})
    },

    // Si hay un error una vez realizada la petición, revertimos los cambios
    onError: () => {
      setIsLiked((prev) => !prev);
      setNumLikes((prev) => (isLiked ? prev + 1 : prev - 1));
    },
  });
 //si no existe el token no actualiza el estado del num de likes
  const handleLike = () => {
    if (token){
      if (likeMutation.isPending) return;
      likeMutation.mutate();
    }

  };

  return (
    <button
      onClick={handleLike}
      disabled={likeMutation.isPending}
      className={`${isLiked ? "text-pink-600" : ""} flex gap-0.5 items-center cursor-pointer rounded-full transition-all duration-300  hover:text-pink-600  active:scale-95 disabled:opacity-50`}
    >
      <HearthIcon isLiked={isLiked} size={20} />
      <span>{numLikes >0? numLikes:""}</span>
    </button>
  );
}