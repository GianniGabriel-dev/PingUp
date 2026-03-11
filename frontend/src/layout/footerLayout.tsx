import { LoadingIcon } from "@/assets/icons/LoadingIcon.js";
import { User } from "@/components/feed/typesPost.js";

type FooterProps = {
  user: User | null
  isLoading: boolean
  openModal: (type: "login" | "register") => void
}

export const Footer = ({ user, openModal, isLoading }: FooterProps) => {

  return (
    <footer className="fixed bottom-0 left-0 w-full bg-blue-500 p-4 flex justify-center items-center lg:hidden">
      {!user &&
        (isLoading ? (
          <LoadingIcon size={40} />
        ) : (
          <section className="w-full max-w-md flex flex-col gap-3">
            <article className="text-center">
              <p className="text-lg font-extrabold text-white">
                ¿Nuevo en PingUp?
              </p>
              <span className="text-sm text-blue-100">
                Regístrate para disfrutar de todas sus funcionalidades
              </span>
            </article>

            <article className="flex gap-3">
              <button
                onClick={() => openModal("register")}
                className="flex-1 p-2 text-md font-bold text-black bg-white hover:bg-white/80 transition-all duration-300 rounded-full shadow"
              >
                Registrarse
              </button>

              <button
                onClick={() => openModal("login")}
                className="flex-1 p-2 text-md font-bold bg-blue-600 hover:bg-blue-700 transition-all duration-300 rounded-full shadow"
              >
                Iniciar sesión
              </button>
            </article>
          </section>
        ))}
    </footer>
  );
};
