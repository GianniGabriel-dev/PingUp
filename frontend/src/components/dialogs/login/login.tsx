import { useState } from "react";
import { api } from "../../../lib/axios.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LoginStep2 } from "./loginStep2.js";
import { LoginStep1 } from "./loginStep1.js";
import { AuthDialog } from "../../authDialog.js";

export default function LoginModal() {
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
      identifier: formData.get("identifier"),
      password: formData.get("password"),
    };

    console.log("Datos del formulario enviados:", data);
    // Validación simple

    try {
      const res = await api.post("/login", data);

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
        {step === 2 && <LoginStep2 handleSubmit={handleSubmit} />}
      </AuthDialog>
    </div>
  );
}
