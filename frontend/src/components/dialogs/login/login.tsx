import { useState } from "react";
import { api, ApiErrors } from "../../../lib/axios.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LoginStep2 } from "./loginStep2.js";
import { LoginStep1 } from "./loginStep1.js";
import { AuthDialog } from "../../authDialog.js";
import z from "zod";
import { loginSchema } from "../../../validations/authValidations.js";



export default function LoginModal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const[apiError,setApiError]=useState<ApiErrors>([]);
  const navigate = useNavigate();

  const closeModal = () => {
    setOpen(false);
    setStep(1);
    setApiError([])
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

      navigate("/");
      closeModal();
      setApiError([]) //se limpian los errors si todo está correcto
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log(error)
        setApiError(error.response?.data.errors)
        console.log(apiError)
      }
    }
  };

  return (
    <div className="text-white">
      <button
        onClick={() => setOpen(true)}
        className="p-1 text-sm cursor-pointer font-bold hover:bg-blue-600 bg-blue-500 transition-all duration-300 rounded-xl shadow"
      >
        Iniciar sesión
      </button>

      <AuthDialog
        open={open}
        onClose={closeModal}
        step={step}
        onStepBack={() => setStep(step - 1)}
        showBackButton={step === 2}
      >
        {step === 1 && <LoginStep1 setStep={setStep} />}
        {step === 2 && <LoginStep2 handleSubmit={handleSubmit} apiError={apiError} setApiError={setApiError} />}
      </AuthDialog>
    </div>
  );
}
