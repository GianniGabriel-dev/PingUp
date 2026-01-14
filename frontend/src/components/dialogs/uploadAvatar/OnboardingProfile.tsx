import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { api, ApiErrors } from "@/lib/axios.js";
import { useAuth } from "@/context/useAuth.js";
import { AuthDialog } from "../authDialog.js";
import { useModal } from "@/hooks/useModal.js";
import { ProfileStep1 } from "./ProfileStep1.js";
import { ProfileStep2 } from "./ProfileStep2.js";




export default function OnboardingProfile() {
  const [step, setStep] = useState(1);
  const[apiError,setApiError]=useState<ApiErrors>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const {setToken, user}= useAuth()
  console.log(user)

  const { closeModal } = useModal()
  //al cerrar el modal se resetean los pasos y los errores de la api
  const handleCloseModal = () => {
    closeModal();
    setStep(1);
    setApiError([]);
  };


   //Función que maneja el guardado de los datos y el update de los mismos en la bd
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
      showLogo={false}
      open={true}
      onClose={handleCloseModal}
      step={step}
      onStepBack={() => setStep(step - 1)}
      showBackButton={step === 2}
    >
      {/*Se comprueba en que step está el usuario y si user obtenido del contexto existe para evitar errores*/}
      {step === 1 && user && <ProfileStep1 setStep={setStep} user={user} setSelectedFile={setSelectedFile} selectedFile={selectedFile} />}
      {step === 2 && user && selectedFile && <ProfileStep2 setStep={setStep} selectedFile={selectedFile} />}
    </AuthDialog>
  );
}
