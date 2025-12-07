import { Link } from "react-router-dom";

import { useAuth } from "../context/useAuth.js";
import RegisterModal from "./dialogs/register/register.js";
import LoginModal from "./dialogs/login/login.js";

export function LeftNavbar() {
  const { user, loading } = useAuth();

  return (
    <aside>
      {loading ? (
        // Podrías mostrar un skeleton o spinner aquí si lo prefieres
        <p>cargando...</p>
      ) : user ? (
        <>
          <p>Hola {user.username}</p>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/explore">Explore</Link></li>
              <li><Link to="/notifications">Notifications</Link></li>
            </ul>
          </nav>
        </>
      ) : (
        <div>
          <RegisterModal />
          <LoginModal />
        </div>

      )}
    </aside>
  );
}