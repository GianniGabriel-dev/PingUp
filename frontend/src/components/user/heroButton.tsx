import { useAuth } from "@/context/useAuth.js";
import { UserData } from "./heroUser.js";
import { useState } from "react";
import { api } from "@/lib/axios.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const HeroButton = ({ user }: { user: UserData }) => {
  const { user: currentUser, token } = useAuth();
  const [isFollowing, setIsFollowing] = useState(user.isFollowing);
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);
  const queryClient = useQueryClient();

  const followMutation = useMutation({
    mutationFn: async () => {
      await api.post(
        `follow/${user.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    },
    onMutate: () => {
      setIsFollowing((prev) => !prev);
    },
    onSuccess: () => {
      console.log("followed/unfollowed successfully");
      queryClient.invalidateQueries({ queryKey: ["user", user.username] });
    },
    onError: () => {
      setIsFollowing((prev) => !prev);
    },
  });

  const handleFollow = () => {
    if (!token) return;
    if (followMutation.isPending) return;
    followMutation.mutate();
  };

  return (
    <>
      {/*Si has accedido a otro perfil muestra botón de seguir, si ha accedido a tu perfil muestra botón de editar perfil (abre modal)*/}
      {currentUser?.id !== user.id ? (
        <button
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          disabled={followMutation.isPending || !token}
          onClick={handleFollow}
          className={`cursor-pointer w-40 px-4 py-2 rounded-full border  -translate-y-2 font-bold transition-all duration-200 
        ${
          isFollowing
            ? "bg-transparent text-white border-gray-500 hover:border-red-500 hover:text-red-500 hover:bg-red-500/10"
            : "bg-white text-black border-white hover:bg-white/90"
        }
        ${followMutation.isPending || !token ? "cursor-none bg-gray-500" : ""}
        `}
        >
          {isFollowing ? (hover ? "Dejar de seguir" : "Siguiendo") : "Seguir"}
        </button>
      ) : (
        <button 
        onClick={()=>{navigate("?modal=edit-profile")}}
        className="cursor-pointer px-4 py-2 rounded-full border border-gray-500 font-bold hover:bg-white hover:text-black transition-all duration-200 -translate-y-2"
        >
          Editar Perfil
        </button>
      )}
    </>
  );
};
