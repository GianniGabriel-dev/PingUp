import { UserIcon, MoreOptionsIcon, LogoutIcon } from "../../assets/icons/index.js";
import { UserInfo } from "../../context/authContext.js";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover.js";
type Props = {
  user: UserInfo;
};
export const UserInfoCard = ({ user }: Props) => {
  return (
    <Popover>
      {/*Lo que abre el popover, componente de shadcn */}
      <PopoverTrigger asChild>
        <div className="cursor-pointer w-3xs flex items-center justify-between px-2  py-2 rounded-full transition-colors hover:bg-neutral-900">
          <div className="flex gap-2">
            {user.avatar_url ? (
              <img
                src={user.avatar_url}
                width={40}
                alt={`User ${user.username} without profile picture`}
              />
            ) : (
              <img
                src="/user1.svg"
                width={50}
                alt={`Profile picture of ${user.username}`}
              />
            )}
            <div className="flex flex-col ">
              <p className="text-s">{user.username}</p>
              <p className="text-gray-600 text-sm">@{user.username}</p>
            </div>
          </div>
          <MoreOptionsIcon size={30}/>
        </div>
      </PopoverTrigger>
      {/*Contenido dentro del popUp*/}
      <PopoverContent className="mt-1 w-3xs relative max-md:hidden ">
        {/*Flecha que aparce arriba del popover para indicar de donde viene */}
        <svg
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full"
          width="16"
          height="8"
          style={{
            filter: `drop-shadow(0.5px -1px 1px rgba(255,255,255,0.2))`,
          }}
        >
          <polygon fill="black" points="0,8 8,0 16,8" />
        </svg>
        <div className=" w-full p-3 flex z-90 flex-col gap-2">
          <a
            className="p-1 flex place-items-center gap-3 text-lg rounded transition-colors hover:bg-neutral-900 cursor-pointer "
            href={`/${user.username}`}
          >
            <UserIcon filled={true} size={25} />
            Ir a mi perfil
          </a>
          <a
            className="p-1 flex place-items-center gap-3 text-lg rounded transition-colors hover:bg-neutral-900 cursor-pointer "
            href={`/logout`}
          >
            <LogoutIcon size={25}/>
            Cerrar sesión
          </a>
        </div>
      </PopoverContent>
    </Popover>
  );
};
