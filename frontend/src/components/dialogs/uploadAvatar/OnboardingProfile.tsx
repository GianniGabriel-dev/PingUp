import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, ApiErrors } from "@/lib/axios.js";
import { useAuth } from "@/context/useAuth.js";
import { AuthDialog } from "../authDialog.js";
import { useModal } from "@/hooks/useModal.js";
import { ProfileStep1 } from "./ProfileStep1.js";
import { ProfileStep2 } from "./ProfileStep2.js";
import { useMutation } from "@tanstack/react-query";




export default function OnboardingProfile() {
  const {user, token}= useAuth()
  const [step, setStep] = useState(1);
  const [apiError,setApiError]=useState<ApiErrors>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fullName, setFullName]= useState<string>(user?.name || "");
  const navigate = useNavigate();

  console.log(user)

  const { closeModal } = useModal()
  //al cerrar el modal se resetean los pasos y los errores de la api
  const handleCloseModal = () => {
    closeModal();
    setStep(1);
    setApiError([]);
  };

   const data = {
    fullName,
    avatar: selectedFile,
  };
   //Función que maneja el guardado de los datos y el update de los mismos en la bd
    const profileMutation = useMutation({
      mutationFn: async () => {
        await api.patch(
          `/updateProfile`, data,
          {
            headers:{
              Authorization: `Bearer ${token}`,
            }
          }
        )},
      })

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
      {step === 1 && user && <ProfileStep1 setStep={setStep} user={user} setFullname={setFullName} setSelectedFile={setSelectedFile} selectedFile={selectedFile} token={token} />}
      {step === 2 && user && selectedFile && <ProfileStep2 setStep={setStep} selectedFile={selectedFile} />}
    </AuthDialog>
  );
}
