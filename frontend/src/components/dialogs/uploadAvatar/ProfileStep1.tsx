import { Input } from "@/components/ui/inputs.js";
import { UserInfo } from "@/context/authContext.js";
import { useState } from "react";

type Props = {
  user: UserInfo;
  setStep: (step: number) => void;
};
export const ProfileStep1 = ({ user, setStep }: Props) => {
  //estado que detecta si ha cambiado la imagen o el usuario por defecto
  const [hasChanged, setHasChanged] = useState(true);
  return (
    <div className="pr-9 pl-9 flex flex-col justify-between items-center h-full">
      <article className="self-start">
        <h2 className="text-3xl  font-bold">Edita tu perfil</h2>
        <p className="text-gray-500">
          Deja que los usarios de PingUp te conozcan mejor (el nombre no tiene que ser único)
        </p>
      </article>
      <article className="flex justify-center">
        <div className="relative w-40 h-40 rounded-full border-2 border-white overflow-hidden bg-zinc-950">
          <img
            src={user.avatar_url}
            alt="Your profile image"
            className="absolute top-1/2 left-1/2 w-[110%] h-[110%] -translate-x-1/2 -translate-y-1/2 object-cover rounded-full"
          />
        </div>
      </article>
                <Input
                  type="fullName"
                  id="fullName"
                  placeholder="Nombre"
                  error={""}
                />
      <button
        type="submit"
        className={`${
          hasChanged
            ? "text-zinc-950 bg-white hover:bg-white/55"
            : "text-white border-2 border-gray-500 hover:bg-zinc-500/5"
        } cursor-pointer w-11/12 text-2xl py-2 transition-all duration-300  font-bold rounded-3xl shadow`}
      >
        {hasChanged ? "Siguiente" : "Descartar por ahora"}
      </button>
    </div>
  );
};
