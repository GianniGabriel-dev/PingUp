import {HomeIcon, ExploreIcon, NotificationIcon, UserIcon, ConfigIcon} from "@/assets/icons/index.js";
import { useAuth } from "@/context/useAuth.js";
import { NavItem } from "./navItems.js";
import { UserInfoCard } from "./userInfoCard.js";


export function LeftNavbar() {
  //se accede a las propiedades guardadas en el contexto de autenticación
  const { user, isLoading } = useAuth();

  return (
    <aside className="flex flex-col items-start max-sm:items-center gap-6 p-2 max-md:p-1 w-3xs max-md:w-max min-h-screen ">
      <div className="max-md:w-max flex justify-items-start">
        <img  className="p-2 rounded-full hover:bg-neutral-900 cursor-pointer transition-colors duration-300" width={50} height={50} src="/signalCircle.png" alt="Logo of PingUp"/>
      </div>
      
      {isLoading ? (
        <></>
      ) : user && (
        <>
          <nav className="w-full max-sm:w-max max-sm:h-full">
        <ul className="flex flex-col gap-4 max-sm:h-full max-sm:justify-between max-sm:gap-0">
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
          <section className="w-full max-md:hidden">
            <UserInfoCard user={user}/>
          </section>
          
        </>
      )}
    </aside>
  );
}