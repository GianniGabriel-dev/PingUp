import { ExploreIcon } from "@/assets/icons/ExploreIcon.js";
import { LoadingIcon } from "@/assets/icons/LoadingIcon.js";
import { useAuth } from "@/context/useAuth.js";
import { useModal } from "@/hooks/useModal.js";
import { WhoToFollow } from "./whoToFollow.js";
import { useLocation } from "react-router-dom";

export function RightNavbar() {
  const { openModal } = useModal();
  const location = useLocation();
  //si se está en la vista explore oculta la barra de buscar
  const isExplore = location.pathname === "/explore";
  const { user, isLoading } = useAuth();
  return (
    <aside className="w-xs flex flex-col items-center gap-6 p-3 max-md:p-1 sticky top-0 h-screen  max-lg:hidden">
      {
        /*Si no hay usuario, se musetran los botones de login y register*/
        !user ? (
          isLoading ? (
            <LoadingIcon />
          ) : (
            <div className="w-full border-gray-500 border flex flex-col gap-3 rounded-2xl p-2 max-md:w-max">
              <div>
                <p className="text-xl font-extrabold">¿Nuevo en PingUp?</p>
                <span className="text-sm text-gray-500">
                  Regístrate para disfrutar te todas sus funcionalidades
                </span>
              </div>
              <button
                onClick={() => openModal("register")}
                className="p-1 text-lg  w-full cursor-pointer font-bold text-black hover:bg-white/80 bg-white transition-all duration-300 rounded-full shadow"
              >
                Registrarse
              </button>
              <button
                onClick={() => openModal("login")}
                className="p-1 text-lg cursor-pointer font-bold hover:bg-blue-600 bg-blue-500 w-full transition-all duration-300 rounded-full shadow"
              >
                Iniciar sesión
              </button>
            </div>
          )
        ) : (
          <section className="w-full flex flex-col gap-6">
            {!isExplore && (
              <article className="flex items-center gap-3 border border-gray-500 rounded-full px-4 py-2 focus-within:border-0 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
                <ExploreIcon className="text-white cursor-pointer" />

                <input
                  type="text"
                  placeholder="Buscar"
                  className="bg-transparent outline-none text-sm text-white placeholder-gray-400 w-full"
                />
              </article>
            )}

            <WhoToFollow />
          </section>
        )
      }
    </aside>
  );
}
