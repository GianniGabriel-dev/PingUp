import { AddPhotoIcon, CloseIcon } from "@/assets/icons/index.js";
import { Input } from "@/components/ui/inputs.js";
import { UserInfo } from "@/context/authContext.js";
import { useRef, useState } from "react";
import { useFileUpload } from "./hooks/handleFileChange.js";

type Props = {
  user: UserInfo;
  setStep: (step: number) => void;
  setSelectedFile: (selectedFile: File) => void;
  selectedFile: File;
};
export const ProfileStep1 = ({ user, setStep, setSelectedFile, selectedFile}: Props) => {
  const [fullName, setFullName]= useState(user.username)
  //estado que detecta si ha cambiado la imagen o el usuario por defecto
    const { validateFile } = useFileUpload({});
  const [hasChanged, setHasChanged] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

    // Abrir el input al hacer click en el div
  const handleClick = () => {
    inputRef.current?.click();
  };
  return (
    <div className="pr-9 pl-9 max-sm:p-3 flex flex-col justify-between items-center h-full">
      <article className="self-start">
        <h2 className="text-3xl  font-bold">Edita tu perfil</h2>
        <p className="text-gray-500">
          Deja que los usarios de PingUp te conozcan mejor
        </p>
        <p className="text-gray-500">
          (el nombre no tiene que ser único)
        </p>
      </article>
      <article className="flex justify-center">
        <div className="relative w-40 h-40 rounded-full border-2 border-white overflow-hidden bg-zinc-950">
          <img
            src={user.avatar_url}
            alt="Your profile image"
            className="absolute top-1/2 left-1/2 w-[110%] h-[110%] -translate-x-1/2 -translate-y-1/2 object-cover rounded-full"
          />
          <div className="w-max absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-3 justify-center">
          {/*div para agregar avatar, lleva al step2 */}
            <div 
              className=" cursor-pointer bg-gray-900/50 rounded-full p-1.5 text-white/70 hover:text-white hover:bg-gray-900/60 transition-all"
              onClick={handleClick}
            >
              <AddPhotoIcon size={27} className={""}/>
              {/*input oculto se activa al hacer click en el div*/}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                ref={inputRef}
                onChange={(e) => {
                  if (!e.target.files?.[0]) return;

                  const file = e.target.files[0];
                  if (!validateFile(file)) return;

                  setSelectedFile(file); 
                  setStep(2);
                }}
                className="hidden"
              />
            </div>
            {
              selectedFile &&(
                <div className=" cursor-pointer bg-gray-900/50 rounded-full p-1.5 text-white/70 hover:text-white hover:bg-gray-900/60 transition-all">
                  <CloseIcon size={27} className={""}/>
                </div>
              )
            }
          </div>
        </div>
      </article>
                <Input
                  value={fullName}
                  type="text"
                  name="fullName"
                  id="fullName"
                  placeholder="Nombre"
                  error={""}
                  onChange={(e) => setFullName(e.target.value)}
                />
      <button
        type="submit"
        className={`${
          hasChanged
            ? "text-zinc-950 bg-white hover:bg-white/55"
            : "text-white border-2 border-gray-500 hover:bg-zinc-500/5"
        } cursor-pointer  h-12 w-10/12 max-sm:w-full text-2xl py-2 transition-all duration-300  font-bold rounded-3xl shadow`}
      >
        {hasChanged ? "Siguiente" : "Descartar por ahora"}
      </button>
    </div>
  );
};
