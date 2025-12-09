import { Outlet } from "react-router-dom"
import { LeftNavbar } from "../components/leftNavbar"
import { RightNavbar } from "../components/rightNavbar.js"


export function MainLayout() {
  return (
    <>
        <main className="flex justify-center">
            <LeftNavbar/>
            <section className="border-r-1 border-l-1 max-sm:border-r-0 border-gray-600 flex-grow min-h-screen  max-w-2xl">
                <Outlet/>
            </section>
            <RightNavbar />
        </main>
    </>
  )
}