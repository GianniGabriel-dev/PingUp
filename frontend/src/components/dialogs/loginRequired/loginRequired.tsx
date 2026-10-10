import { AuthDialog } from "@/layout/authDialog.js";
import { useModal } from "@/hooks/useModal.js";

export default function LoginRequiredModal() {
  const { closeModal, openModal } = useModal();

  return (
    <AuthDialog
      showLogo={true}
      open={true}
      onClose={closeModal}
      style="h-max w-max max-sm:h-full"
    >
      <div className="flex flex-col items-center gap-6 p-8">
        <h2 className="text-2xl font-bold text-white text-center">
          Inicia sesión para continuar
        </h2>

        <p className="text-gray-400 text-center max-w-sm">
          Debes iniciar sesión o registrarte para interactuar con los posts.
        </p>

        <div className="flex flex-col gap-4 w-full">
          <button
            onClick={() => openModal("login")}
            className="flex-1 px-4 py-2 bg-blue-500 cursor-pointer hover:bg-blue-600 text-white font-bold rounded-full transition-all duration-300"
          >
            Iniciar sesión
          </button>
          <button
            onClick={() => openModal("register")}
            className="flex-1 px-4 py-2 bg-white cursor-pointer hover:bg-white/80 text-black font-bold rounded-full transition-all duration-300"
          >
            Registrarse
          </button>
        </div>
      </div>
    </AuthDialog>
  );
}
