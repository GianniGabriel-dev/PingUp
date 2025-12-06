import { useState } from "react";
import { api } from "../../../lib/axios.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { RegisterStep2 } from "./registerStep2.js";
import { RegisterStep1 } from "./registerStep1.js";
import { AuthDialog } from "../../authDialog.js";

export default function RegisterModal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const closeModal = () => {
    setOpen(false);
    setStep(1);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    };

    console.log("Datos del formulario enviados:", data);
    // Validación simple

    try {
      const res = await api.post("/signup", data);

      console.log(res);
      console.log(res.data);

      // Backend devuelve { token: "JWT_TOKEN", user: { ... } }
      const { token } = res.data;
      localStorage.setItem("token", token);

      navigate("/");
      closeModal();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data); // <- aquí verás exactamente qué validación falla
      }
      console.error(error);
      const errorMessage =
        error instanceof Error ? error.message : "Error al registrar";
      alert(errorMessage);
    }
  };

  return (
    <div className="text-white">
      <button
        onClick={() => setOpen(true)}
        className="p-1 text-sm cursor-pointer font-bold hover:bg-blue-600 bg-blue-500 transition-all duration-300 rounded-xl shadow"
      >
        Registrarte
      </button>

      <AuthDialog
        open={open}
        onClose={closeModal}
        step={step}
        onStepBack={() => setStep(step - 1)}
        showBackButton={step === 2}
      >
        {step === 1 && <RegisterStep1 setStep={setStep} />}
        {step === 2 && <RegisterStep2 handleSubmit={handleSubmit} />}
      </AuthDialog>
    </div>
  );
}
