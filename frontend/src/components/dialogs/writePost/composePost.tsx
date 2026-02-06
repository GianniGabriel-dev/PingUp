import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import z from "zod";
import { api, ApiErrors } from "@/lib/axios.js";
import { useAuth } from "@/context/useAuth.js";
import { registerSchema } from "@/validations/authValidations.js";
import { AuthDialog } from "../authDialog.js";
import { useModal } from "@/hooks/useModal.js";
import { WritePost } from "@/components/feed/WritePost.js";


export default function ComposePost() {
  const [step, setStep] = useState(1);
  const[apiError,setApiError]=useState<ApiErrors>([]);
  const navigate = useNavigate();
  const{user, token}= useAuth()

  const { closeModal } = useModal()
  //al cerrar el modal se resetean los pasos y los errores de la api y redirige a una configuración opcional extra
  const handleCloseModal = () => {
    setStep(1);
    setApiError([]);
    navigate("/?modal=onboarding-profile");
  };

  type RegisData = z.infer<typeof registerSchema>;
 //Función que maneja el envío del formulario
  const handleSubmit = async (data:RegisData) => {
    console.log("Datos dulario enviados:", data);

    try {
      const res = await api.post("/signup", data);

      console.log(res);
      console.log(res.data);

      // Backend devuelve { token: "JWT_TOKEN", user: { ... } }
      const { token } = res.data;
      localStorage.setItem("token", token);
      //se usa setToken del contexto para actualizar el token globalmente y actualizar la página sin recargar
      setToken(token)

      //se establece aparte del token en el local storage si el usuario ya ha completado la config inicial despues de registrarse, en este caaso es falso
      localStorage.setItem("onboardingProfileCompleted", "false");
      
      handleCloseModal()
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data.errors)
        setApiError(error.response?.data.errors); // Si hay un error al comunicarte con el backend, lo guardas en el estado
        console.log(apiError)
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
        {user && token &&<WritePost user={user} token={token} />}
      </AuthDialog>
    </div>
  );
}