import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import z from "zod";
import { api, ApiErrors } from "@/lib/axios.js";
import { useAuth } from "@/context/useAuth.js";
import { registerSchema } from "@/validations/authValidations.js";
import { AuthDialog } from "../authDialog.js";
import { useModal } from "@/hooks/useModal.js";
import { WritePost } from "@/components/feed/WritePost.js";
import { formatDate } from "@/utils/formatDate.js";

export default function ComposePost() {
  const location = useLocation();
  const { post, isReply } = location.state || {};

  const [step, setStep] = useState(1);
  const [apiError, setApiError] = useState<ApiErrors>([]);
  const navigate = useNavigate();
  const { user, token } = useAuth();

  const { closeModal } = useModal();
  //al cerrar el modal se resetean los pasos y los errores de la api y redirige a una configuración opcional extra
  const handleCloseModal = () => {
    setStep(1);
    setApiError([]);
    navigate("/?modal=onboarding-profile");
  };

  type RegisData = z.infer<typeof registerSchema>;
  //Función que maneja el envío del formulario
  const handleSubmit = async (data: RegisData) => {
    console.log("Datos dulario enviados:", data);

    try {
      const res = await api.post("/signup", data);

      console.log(res);
      console.log(res.data);

      // Backend devuelve { token: "JWT_TOKEN", user: { ... } }
      const { token } = res.data;
      localStorage.setItem("token", token);
      //se usa setToken del contexto para actualizar el token globalmente y actualizar la página sin recargar
      setToken(token);

      //se establece aparte del token en el local storage si el usuario ya ha completado la config inicial despues de registrarse, en este caaso es falso
      localStorage.setItem("onboardingProfileCompleted", "false");

      handleCloseModal();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data.errors);
        setApiError(error.response?.data.errors); // Si hay un error al comunicarte con el backend, lo guardas en el estado
        console.log(apiError);
      }
    }
  };

  return (
    <div className="text-white">
      <AuthDialog
        style="h-max w-xl max-sm:h-full"
        showLogo={false}
        open={true}
        onClose={closeModal}
      >
<div>
  {post && (
    <div className="flex px-8 gap-3">
      {/* Columna izquierda: avatar + línea */}
      <div className="relative flex flex-col items-center shrink-0">
        <img
          className="w-12 h-12 rounded-full z-10"
          src={
            post.user.avatar_url ||
            "https://res.cloudinary.com/dssbrks07/image/upload/v1766150505/user1_wznohf.svg"
          }
          alt={`image of user ${post.user.username}`}
        />

        {/* Línea vertical que crece automáticamente */}
        <div className="flex-1 w-0.5 bg-gray-600 my-1"></div>
      </div>

      {/* Contenido del post */}
      <div className="flex flex-col w-full pb-2">
        <header className="flex gap-1 pb-1">
          <span className="text-white font-extrabold">{post.user.name}</span>
          <span className="text-gray-500">@{post.user.username}</span>
          <span className="text-gray-500">
            · {formatDate(post.created_at)}
          </span>
        </header>
        <p className="font-normal">{post.content}</p>

        <p className="text-gray-500 mt-2">
          Respondiendo a <span className="text-blue-500">@{post.user.username}</span>
        </p>
      </div>
    </div>
  )}

  {user && token && (
    <WritePost user={user} token={token} isReply={isReply} />
  )}
</div>
      </AuthDialog>
    </div>
  );
}
