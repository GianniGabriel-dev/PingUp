import { LoadingIcon } from "@/assets/icons/LoadingIcon.js";
import { useAuth } from "@/context/useAuth.js";
import { useModal } from "@/hooks/useModal.js";

export function RightNavbar() {
  const { openModal } = useModal();
  const { user, loading } = useAuth();
  return (
    <aside className="w-2xs flex flex-col items-center gap-6 p-2 max-md:p-1 min-h-screen  max-lg:hidden">
      {
        /*Si no hay usuario, se musetran los botones de login y register*/
        !user &&
          (loading ? (
            <LoadingIcon size={50} />
          ) : (
            <div className="w-full border-gray-500 border-1 flex flex-col gap-3 rounded-2xl p-2 max-md:w-max">
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
          ))
      }
    </aside>
  );
}
