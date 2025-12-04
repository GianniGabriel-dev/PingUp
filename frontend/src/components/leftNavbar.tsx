import { Link } from "react-router-dom";
import RegisterModal from "./dialogs/register.js";
import { useAuth } from "../context/useAuth.js";

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
        <RegisterModal />
      )}
    </aside>
  );
}