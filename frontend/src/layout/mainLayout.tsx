import { Outlet } from "react-router-dom";
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
import { Footer } from "./footerLayout.js";

export function MainLayout() {
  const { user, isLoading } = useAuth();
  const { isOpen, modalType, openModal, closeModal } = useModal();


  useEffect(() => {
    const PROTECTED_MODALS = ["compose", "onboarding-profile", "edit-profile"];

    if (isLoading) return;

    // Si intenta abrir compose u onboarding sin estar logueado → bloqueamos
    if (isOpen && PROTECTED_MODALS.includes(modalType!) && user === undefined) {
      closeModal()
    }
  }, [isLoading, isOpen, modalType, user, closeModal]);

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
        <Footer user={user} openModal={openModal} isLoading={isLoading}/>
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
