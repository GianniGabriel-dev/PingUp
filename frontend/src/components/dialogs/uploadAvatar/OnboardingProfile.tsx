import { useState } from "react";
import { api} from "@/lib/axios.js";
import { useAuth } from "@/context/useAuth.js";
import { AuthDialog } from "../authDialog.js";
import { useModal } from "@/hooks/useModal.js";
import { ProfileStep1 } from "./ProfileStep1.js";
import { ProfileStep2 } from "./ProfileStep2.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { canvasToFile } from "./hooks/canvasHandler.js";




export default function OnboardingProfile() {
  const queryClient = useQueryClient();
  const {user, token}= useAuth()
  const [step, setStep] = useState(1);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fullName, setFullName]= useState<string>(user?.name || "");
  const [avatarCanvas, setAvatarCanvas] = useState<HTMLCanvasElement | null>(null)


  console.log(user)

  const { closeModal } = useModal()
  //al cerrar el modal se resetean los pasos y los errores de la api
  const handleCloseModal = () => {
    closeModal();
    setStep(1);

  };

   //Función que maneja el guardado de los datos y el update de los mismos en la bd
  const profileMutation = useMutation({
    mutationFn: async () => {
      let avatarFile = avatarCanvas ? await canvasToFile(avatarCanvas) : null;

      if (avatarCanvas) {
        avatarFile = await canvasToFile(avatarCanvas)
      }

      const formData = new FormData()
      formData.append("name", fullName)
      if (avatarFile) formData.append("avatar", avatarFile)

      await api.patch("/updateProfile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }) 
    },
      //se invalidan la querry de posts para que se recarguen los post con la nueva info del usuario
    onSuccess: ()=>{
      queryClient.invalidateQueries({ queryKey:["allPosts"]})
      queryClient.invalidateQueries({ queryKey:["user"]})
    },
  })

const handleSubmit = () => {
  if (!token) return;
  profileMutation.mutate(undefined, {
    onSuccess: () => {
      // Se invalidan las queries necesarias después de la actualización del perfil
      queryClient.invalidateQueries({ queryKey: ["allPosts"] });

      handleCloseModal();
    },
  });
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
      {step === 1 && user &&(
         <ProfileStep1 
         setStep={setStep}
          user={user} 
          setFullName={setFullName} 
          setSelectedFile={setSelectedFile} 
          selectedFile={selectedFile} 
          token={token} 
          avatarCanvas={avatarCanvas} 
          setAvatarCanvas={setAvatarCanvas}
          handleSubmit={handleSubmit}
          onClose={handleCloseModal}
        />
      )}
      {step === 2 && user && selectedFile &&(
         <ProfileStep2 
          setStep={setStep} 
          selectedFile={selectedFile} 
          onConfirm={(canvas)=>{
            setAvatarCanvas(canvas)
          }}
        />
      )}
    </AuthDialog>
  );
}
