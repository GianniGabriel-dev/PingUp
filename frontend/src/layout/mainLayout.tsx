import { Outlet } from "react-router-dom"
import { LeftNavbar } from "../components/navbar/leftNavbar"
import { RightNavbar } from "../components/navbar/rightNavbar.js"
import RegisterModal from "@/components/dialogs/register/register.js";
import LoginModal from "@/components/dialogs/login/login.js";
import { useModal } from "@/hooks/useModal.js";


export function MainLayout() {
  const { isOpen, modalType} = useModal();

  return (
    <>
      <main className="flex justify-center">
        <LeftNavbar/>
        <section className="border-r-1 border-l-1 max-sm:border-r-0 border-gray-600 flex-grow min-h-screen max-w-2xl max-lg:w-full">
          <Outlet/>
        </section>
        <RightNavbar />
      </main>

      {/* Modal Layer */}
      {isOpen && modalType === 'login' && <LoginModal/>}
      {isOpen && modalType === 'register' && <RegisterModal/>}
    </>
  )
}
