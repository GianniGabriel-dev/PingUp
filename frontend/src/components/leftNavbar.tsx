import { Link } from "react-router-dom";

export function LeftNavbar() {
  return (
    <>
      <aside>
        <Link to="/">Home</Link>
        <Link to="/explore">Explore</Link>
        <Link to="/notifications">Notifications</Link>
      </aside>
    </>
  )
}