import { useAuth } from "@/context/useAuth.js";
import { UserData } from "./heroUser.js";
import { useState } from "react";

export const HeroButton = ({ user }: { user: UserData }) => {
  const { user: currentUser } = useAuth();
  const isFollowing = user.isFollowing;
  const [hover, setHover] = useState(false);

  return (
    <>
      {currentUser?.id !== user.id ? (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`cursor-pointer w-40 px-4 py-2 rounded-full border  -translate-y-2 font-bold transition-all duration-200 
        ${
          isFollowing
            ? "bg-transparent text-white border-gray-500 hover:border-red-500 hover:text-red-500 hover:bg-red-500/10"
            : "bg-white text-black border-white hover:bg-white/90"
        }`}
    >
      {isFollowing ? (hover ? "Dejar de seguir" : "Siguiendo") : "Seguir"}
    </button>
      ) : (
        <button className="cursor-pointer px-4 py-2 rounded-full border border-gray-500 font-bold hover:bg-white hover:text-black transition-all duration-200 -translate-y-2">
          Editar Perfil
        </button>
      )}
    </>
  );
};
