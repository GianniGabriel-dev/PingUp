import { UserInfo } from "@/context/authContext.js";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover.js";
import { MoreOptionsIcon } from "@/assets/icons/MoreOptionsIcon.js";
import { UserIcon } from "@/assets/icons/UserIcon.js";
import { LogoutIcon } from "@/assets/icons/LogoutIcon.js";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/context/useAuth.js";
import { useNavigate } from "react-router-dom";

type Props = {
  user: UserInfo;
};
export const UserInfoCard = ({ user }: Props) => {
  const queryClient = useQueryClient()
  const { setToken }= useAuth()
  const navigate = useNavigate()
  return (
    <Popover>
      {/*Lo que abre el popover, componente de shadcn */}
      <PopoverTrigger asChild>
        <div className="cursor-pointer  flex w-full items-center px-3 py-2 justify-between rounded-full transition-colors hover:bg-neutral-900">
          <div className="flex items-center gap-2">
            <img
              className="rounded-full max-lg:w-10 max-lg:h-10"
              src={user.avatar_url}
              width={50}
              alt={`Profile picture of ${user.username}`}
            />
            <div className="flex flex-col w-30 max-lg:w-20 overflow-hidden">
              <p className="text-sm max-lg:text-xs truncate ">{user.name}</p>
              <p className="text-gray-500 text-sm  truncate max-lg:text-xs">@{user.username}</p>
            </div>
          </div>
          <MoreOptionsIcon size={30}/>
        </div>
      </PopoverTrigger>
      {/*Contenido dentro del popUp*/}
      <PopoverContent className="mb-1 w-50 relative max-md:hidden ">

        <div className="w-full p-3 flex z-90 flex-col gap-2">
          <a
            className="p-1 flex place-items-center gap-3 text-lg rounded transition-colors hover:bg-neutral-900 cursor-pointer "
            href={`/${user.username}`}
          >
            <UserIcon filled={true} size={25} />
            Ir a mi perfil
          </a>
          <a
            className="p-1 flex place-items-center gap-3 text-lg rounded transition-colors hover:bg-neutral-900 cursor-pointer "
            onClick={()=>{
              localStorage.removeItem("token")
              localStorage.removeItem("onboardingCompleted")
              setToken(null)
              queryClient.clear()
              navigate("/")
              
            }}
          >
            <LogoutIcon size={25}/>
            Cerrar sesión
          </a>
        </div>
      </PopoverContent>
    </Popover>
  );
};
