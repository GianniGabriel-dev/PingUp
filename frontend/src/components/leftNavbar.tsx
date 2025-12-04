import { Link } from "react-router-dom";
import RegisterModal from "./dialogs/register.js";

export function LeftNavbar() {
  return (
    <>
      <aside>
        <Link to="/">Home</Link>
        <Link to="/explore">Explore</Link>
        <Link to="/notifications">Notifications</Link>
        <RegisterModal/>
      </aside>
    </>
  )
}