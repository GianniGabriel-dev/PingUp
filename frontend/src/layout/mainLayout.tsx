import { Outlet } from "react-router-dom"
import { LeftNavbar } from "../components/leftNavbar"
import { RightNavbar } from "../components/rightNavbar.js"


export function MainLayout() {
  return (
    <>
        <main>
            <LeftNavbar/>
            <section>
                <Outlet/>
            </section>
            <RightNavbar />
        </main>
    </>
  )
}