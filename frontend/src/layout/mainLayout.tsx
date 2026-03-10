import { Outlet, useNavigate } from "react-router-dom";
import { LeftNavbar } from "../components/navbar/leftNavbar";
import { RightNavbar } from "../components/navbar/rightNavbar.js";
import RegisterModal from "@/components/dialogs/register/register.js";
import LoginModal from "@/components/dialogs/login/login.js";
import { useModal } from "@/hooks/useModal.js";
import OnboardingProfile from "@/components/dialogs/uploadAvatar/OnboardingProfile.js";
import ComposePost from "@/components/dialogs/writePost/composePost";
import { useAuth } from "@/context/useAuth";
import { useEffect } from "react";
import EditProfile from "@/components/dialogs/editProfile/editProfile.js";

export function MainLayout() {
  const { user, isLoading } = useAuth();
  const { isOpen, modalType } = useModal();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading || user === undefined) return;

    // Si intenta abrir compose u onboarding sin estar logueado → bloqueamos
    if (
      isOpen &&
      (modalType === "compose" || modalType === "onboarding-profile") &&
      user === null
    ) {
      console.log(`open:${isOpen}, modalTy:${modalType}, user:${user} `);
      navigate("/", { replace: true });
    }
  }, [isLoading, isOpen, modalType, user, navigate]);

  // Si los modales están abiertos, se bloque el scroll de la app
  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  return (
    <>
      <main className="flex  justify-center p-0">
        <LeftNavbar />
        <section className={`border-r border-l max-sm:border-r-0 border-gray-600 grow  max-w-2xl max-lg:w-full `}>
          <Outlet />
        </section>
        <RightNavbar />
      </main>

      {/* Conjunto de modales */}
      {isOpen && modalType === "login" && <LoginModal />}
      {isOpen && modalType === "register" && <RegisterModal />}
      {isOpen && modalType === "onboarding-profile" && user && (
        <OnboardingProfile />
      )}
      {isOpen && modalType === "edit-profile" && user && <EditProfile />}
      {isOpen && modalType === "compose" && user && <ComposePost />}
    </>
  );
}
