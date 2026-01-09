import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import z from "zod";
import { api, ApiErrors } from "@/lib/axios.js";
import { useAuth } from "@/context/useAuth.js";
import { loginSchema } from "@/validations/authValidations.js";
import { AuthDialog } from "../authDialog.js";
import { LoginStep1 } from "./loginStep1.js";
import { LoginStep2 } from "./loginStep2.js";
import { useModal } from "@/hooks/useModal.js";



export default function LoginModal() {
  const [step, setStep] = useState(1);
  const[apiError,setApiError]=useState<ApiErrors>([]);
  const navigate = useNavigate();
  const {setToken}= useAuth()

  const { closeModal } = useModal()
  //al cerrar el modal se resetean los pasos y los errores de la api
  const handleCloseModal = () => {
    closeModal();
    setStep(1);
    setApiError([]);
  };

  type LoginData= z.infer<typeof loginSchema>
   //Función que maneja el envío del formulario
  const handleSubmit = async (data:LoginData) => {
    console.log("Datos del formulario enviados:", data);

    try {
      const res = await api.post("/login", data);

      console.log(res);
      console.log(res.data);

      // Backend devuelve { token: "JWT_TOKEN", user: { ... } }
      const { token } = res.data;
      localStorage.setItem("token", token);
      setToken(token)

      navigate("/");
      handleCloseModal()
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log(error)
        setApiError(error.response?.data.errors)
        console.log(apiError)
      }
    }
  };

  return (
    <AuthDialog
      showLogo={true}
      open={true}
      onClose={handleCloseModal}
      step={step}
      onStepBack={() => setStep(step - 1)}
      showBackButton={step === 2}
    >
      {step === 1 && <LoginStep1 setStep={setStep} />}
      {step === 2 && <LoginStep2 handleSubmit={handleSubmit} apiError={apiError} setApiError={setApiError} />}
    </AuthDialog>
  );
}
