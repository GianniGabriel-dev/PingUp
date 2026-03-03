import {useState } from "react";
import { api } from "@/lib/axios.js";
import { useAuth } from "@/context/useAuth.js";
import { AuthDialog } from "../../../layout/authDialog.js";
import { useModal } from "@/hooks/useModal.js";
import { ProfileStep1 } from "./ProfileStep1.js";
import { ProfileStep2 } from "./ProfileStep2.js";
import { ProfileStep3 } from "./ProfileStep3.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { canvasToFile } from "../../../hooks/canvasHandler.js";

export default function EditProfile() {
  const queryClient = useQueryClient();
  const { user, token } = useAuth();
  const [step, setStep] = useState(1);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fullName, setFullName] = useState<string>(user?.name || "");
  const [bio, setBio] = useState<string>(user?.bio || "");
  const [avatarCanvas, setAvatarCanvas] = useState<HTMLCanvasElement | null>(
    null,
  );
  const [bannerCanvas, setBannerCanvas] = useState<HTMLCanvasElement | null>(
    null,
  );
  const [editingType, setEditingType] = useState<"avatar" | "banner">("avatar");

  const { closeModal } = useModal();
  //al cerrar el modal se resetean los pasos y los errores de la api
  const handleCloseModal = () => {
    closeModal();
    setStep(1);
    setBannerCanvas(null);
    setAvatarCanvas(null);
    setSelectedFile(null);
  };

  //Función que maneja el guardado de los datos y el update de los mismos en la bd
  const profileMutation = useMutation({
    mutationFn: async () => {
      const avatarFile = avatarCanvas ? await canvasToFile(avatarCanvas) : null;
      const bannerFile = bannerCanvas ? await canvasToFile(bannerCanvas) : null;

      const formData = new FormData();
      formData.append("name", fullName);
      formData.append("bio", bio);
      console.log("Full name to update:", fullName);
      console.log("Bio to update:", bio);
      if (avatarFile) formData.append("avatar", avatarFile);
      if (bannerFile) formData.append("banner", bannerFile);
      console.log("FormData entries:");
      for (const pair of formData.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }
      console.log(formData.get("bannerFile"));


      await api.patch("/updateProfile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  });

  const handleSubmit = () => {
    if (!token) return;
    console.log("Submitting profile update...");
    profileMutation.mutate(undefined, {
      //se invalidan la querry de posts para que se recarguen los post con la nueva info del usuario
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["allPosts"] });
        queryClient.invalidateQueries({ queryKey: ["user"] });
        queryClient.invalidateQueries({ queryKey: ["userPosts", user?.username, "replies"], });
        queryClient.invalidateQueries({ queryKey: ["userPosts", user?.username, "replies"], });
        handleCloseModal();
      },
    });
  };

  return (
    <AuthDialog
      showLogo={false}
      open={true}
      onClose={handleCloseModal}
      style={"h-9/12 w-xl max-sm:h-full "}
      step={step}
      onStepBack={() => {
        setStep(1);
      }}
      showBackButton={step === 2 || step === 3}
    >
      {/*Se comprueba en que step está el usuario y si user obtenido del contexto existe para evitar errores*/}
      {step === 1 && user && (
        <ProfileStep1
          setStep={setStep}
          user={user}
          fullName={fullName}
          setFullName={setFullName}
          bio={bio}
          setBio={setBio}
          setSelectedFile={setSelectedFile}
          selectedFile={selectedFile}
          token={token}
          avatarCanvas={avatarCanvas}
          setAvatarCanvas={setAvatarCanvas}
          bannerCanvas={bannerCanvas}
          setBannerCanvas={setBannerCanvas}
          setEditingType={setEditingType}
          handleSubmit={handleSubmit}
          onClose={handleCloseModal}
        />
      )}
      {step === 2 && user && selectedFile && editingType === "avatar" && (
        <ProfileStep2
          setStep={setStep}
          selectedFile={selectedFile}
          onConfirm={(canvas) => {
            setAvatarCanvas(canvas);
          }}
        />
      )}
      {step === 3 && user && selectedFile && editingType === "banner" && (
        <ProfileStep3
          setStep={setStep}
          selectedFile={selectedFile}
          onConfirm={(canvas) => {
            setBannerCanvas(canvas);
          }}
        />
      )}
    </AuthDialog>
  );
}
