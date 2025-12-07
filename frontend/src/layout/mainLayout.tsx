import { Outlet } from "react-router-dom"
import { LeftNavbar } from "../components/leftNavbar"
import { RightNavbar } from "../components/rightNavbar.js"


export function MainLayout() {
  return (
    <>
        <main className="flex justify-center">
            <LeftNavbar/>
            <section className="border-r-1 border-l-1 max-sm:border-r-0 border-gray-600 flex-grow min-h-screen  max-sm:max-w-10/12 max-md:max-w-6/12 max-w-4/12">
                <Outlet/>
            </section>
            <RightNavbar />
        </main>
    </>
  )
}