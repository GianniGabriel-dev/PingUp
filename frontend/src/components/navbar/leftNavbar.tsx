import { useAuth } from "../../context/useAuth.js";
import RegisterModal from "../dialogs/register/register.js";
import LoginModal from "../dialogs/login/login.js";
import {HomeIcon, ExploreIcon, NotificationIcon, UserIcon, ConfigIcon } from "../../assets/icons/index.js";
import { NavItem } from "./navItems.js";
import { UserInfoCard } from "./userInfoCard.js";


export function LeftNavbar() {
  //se accede a las propiedades guardadas en el contexto de autenticación
  const { user, loading } = useAuth();

  return (
    <aside className="flex flex-col items-center  gap-6 p-4 max-md:p-1 ">
      {loading ? (
        <p>cargando...</p>
      ) : user ? (
        <>
          <nav className="w-3xs max-md:w-max">
            <ul className="flex flex-col gap-2">
              <li>
                <NavItem to="/" icon={HomeIcon} label="Inicio" />
              </li>
              <li>
                <NavItem to="/explore" icon={ExploreIcon} label="Explorar" />
              </li>
              <li>
                <NavItem to="/notifications" icon={NotificationIcon} label="Notificaciones" />
              </li>
              <li>
                <NavItem to="/profile" icon={UserIcon} label="Perfil" />
              </li>
              <li>
                <NavItem to="/settings" icon={ConfigIcon} label="Ajustes" />
              </li>
            </ul>
          </nav>
          <section className="max-md:hidden">
            <UserInfoCard user={user}/>
          </section>
          
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