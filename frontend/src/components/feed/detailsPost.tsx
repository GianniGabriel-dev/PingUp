import { BackIcon } from "@/assets/icons/BackIcon.js";
import { Header } from "../ui/header.js";
import { useLocation, useNavigate } from "react-router-dom";
import { useRef } from "react";

export const DetailsPost = () => {
  const navigate = useNavigate();
  const location = useLocation();
  //se guarda la ubicación del scroll con useRef para evitar que se pierda al cerrar el modal de compose por ejemplo
  const scrollRef = useRef(location.state?.scrollY);

  const handleBack = () => {
    navigate(-1); // volver a la página anterior
    window.scrollTo(0, scrollRef.current); // restaurar scroll
  };

  return (
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
  );
};
