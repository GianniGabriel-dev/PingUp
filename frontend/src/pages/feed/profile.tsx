import { BackIcon } from "@/assets/icons/BackIcon.js";
import { Header } from "@/components/ui/header.js";
import { AllUserPosts } from "@/components/user/allUserPosts.js";
import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function Profile() {
    const location = useLocation();
  const navigate= useNavigate()
    //se guarda la ubicación del scroll con useRef para evitar que se pierda al cerrar el modal de compose por ejemplo
  const scrollRef = useRef(location.state?.scrollY);

  const handleBack = () => {
    navigate(-1); // volver a la página anterior
    window.scrollTo(0, scrollRef.current); // restaurar scroll
  };
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
          <p className="font-extrabold text-xl">User</p>
        </div>
      </Header>
      <AllUserPosts/>
    </>
  );
}
