import { Outlet } from "react-router-dom"
import { LeftNavbar } from "../components/navbar/leftNavbar"
import { RightNavbar } from "../components/navbar/rightNavbar.js"
import RegisterModal from "@/components/dialogs/register/register.js";
import LoginModal from "@/components/dialogs/login/login.js";
import { useModal } from "@/hooks/useModal.js";
import OnboardingProfile from "@/components/dialogs/uploadAvatar/OnboardingProfile.js";
import ComposePost from "@/components/dialogs/writePost/composePost";


export function MainLayout() {
  const { isOpen, modalType} = useModal();

  return (
    <>
      <main className="flex  justify-center p-0">
        <LeftNavbar/>
        <section className="border-r border-l max-sm:border-r-0 border-gray-600 grow  max-w-2xl max-lg:w-full ">
          <Outlet/>
        </section>
        <RightNavbar />
      </main>

      {/* Conjunto de modales */}
      {isOpen && modalType === 'login' && <LoginModal/>}
      {isOpen && modalType === 'register' && <RegisterModal/>}
      {isOpen && modalType === 'onboarding-profile' && <OnboardingProfile/>}
      {isOpen && modalType === 'compose' && <ComposePost/>}
    </>
  )
}
