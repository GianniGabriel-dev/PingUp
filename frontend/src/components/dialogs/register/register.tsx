import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import z from "zod";
import { api, ApiErrors } from "@/lib/axios.js";
import { useAuth } from "@/context/useAuth.js";
import { registerSchema } from "@/validations/authValidations.js";
import { AuthDialog } from "../authDialog.js";
import { RegisterStep1 } from "./registerStep1.js";
import { RegisterStep2 } from "./registerStep2.js";


export default function RegisterModal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const[apiError,setApiError]=useState<ApiErrors>([]);
  const navigate = useNavigate();
  const{setToken}= useAuth()

  const closeModal = () => {
    setOpen(false);
    setStep(1);
    setApiError([])
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

      navigate("/");
      closeModal();
      setApiError([])//se limpian los errors si todo está correcto
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
      <button
        onClick={() => setOpen(true)}
        className="p-1 text-sm cursor-pointer font-bold hover:bg-blue-600 bg-blue-500 transition-all duration-300 rounded-xl shadow"
      >
        Registrarse
      </button>
      <AuthDialog
        open={open}
        onClose={closeModal}
        step={step}
        onStepBack={() => setStep(step - 1)}
        showBackButton={step === 2}
      >
        {step === 1 && <RegisterStep1 setStep={setStep} />}
        {step === 2 && <RegisterStep2 handleSubmit={handleSubmit} apiError={apiError} setApiError={setApiError} />}
      </AuthDialog>
    </div>
  );
}
