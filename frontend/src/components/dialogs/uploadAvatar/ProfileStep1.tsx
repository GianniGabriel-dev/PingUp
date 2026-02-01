import { AddPhotoIcon, CloseIcon } from "@/assets/icons/index.js";
import { Input } from "@/components/ui/inputs.js";
import { UserInfo } from "@/context/authContext.js";
import { useEffect, useRef, useState } from "react";
import { useFileUpload } from "./hooks/handleFileChange.js";

type Props = {
  user: UserInfo;
  setFullName: (name: string) => void;
  setStep: (step: number) => void;
  setSelectedFile: (selectedFile: File | null) => void;
  selectedFile: File | null;
  token: string | null;
  avatarCanvas: HTMLCanvasElement | null;
  setAvatarCanvas: (canvas: HTMLCanvasElement | null) => void;
  handleSubmit: () => void;
  onClose: () => void;
};
export const ProfileStep1 = ({
  user,
  setStep,
  setSelectedFile,
  selectedFile,
  avatarCanvas,
  setAvatarCanvas,
  handleSubmit,
  onClose,
}: Props) => {
  const [fullName, setFullName] = useState(user.name);

  // hook personalizado para validar el archivo
  const { validateFile } = useFileUpload({});

  //estado que detecta si ha cambiado la imagen o el usuario por defecto para activar o cambiar estilo del boton de siguiente
  const [hasChanged, setHasChanged] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // efecto que detecta si ha habido cambios en el nombre o la imagen de perfil
  useEffect(() => {
    const nameChanged = fullName.trim() !== user.name && fullName.trim() !== "";
    const avatarChanged = avatarCanvas !== null;

    setHasChanged(nameChanged || avatarChanged);
  }, [fullName, avatarCanvas, user.name]);

  // se abre el selector de archivos al hacer click en el icono
  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="pr-9 pl-9  h-full max-sm:p-3 justify-between flex flex-col  items-center">
      <article className="self-start">
        <h2 className="text-3xl  font-bold">Edita tu perfil</h2>
        <p className="text-gray-500">
          Deja que los usarios de PingUp te conozcan mejor
        </p>
        <p className="text-gray-500">(el nombre no tiene que ser único)</p>
      </article>
      <article className="flex justify-center">
        <div className="relative w-50 h-50 rounded-full border-2 border-white overflow-hidden bg-zinc-950">
          <img
            src={
              avatarCanvas
                ? avatarCanvas.toDataURL("image/png")
                : user.avatar_url
            }
            alt="Your profile image"
            className="absolute top-1/2 left-1/2 w-[110%] h-[110%] -translate-x-1/2 -translate-y-1/2 object-cover "
          />
          <div className="w-max absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-3 justify-center">
            {/*div para agregar avatar, lleva al step2 */}
            <div
              className=" cursor-pointer bg-gray-900/50 rounded-full p-1.5 text-white/70 hover:text-white hover:bg-gray-900/60 transition-all"
              onClick={handleClick}
            >
              <AddPhotoIcon size={27} className={""} />
              {/*input oculto se activa al hacer click en el div*/}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                ref={inputRef}
                onChange={(e) => {
                  //si no se selecciona un archivo impide ir al sigiuente paso
                  if (!e.target.files?.[0]) return;
                  const file = e.target.files[0];
                  //si el archivo pesa mas de lo permitido o no es un tipo valido, impide ir al siguiente paso
                  if (!validateFile(file)) return;
                  setSelectedFile(file);
                  setStep(2);
                }}
                className="hidden"
              />
            </div>
            {selectedFile && (
              <div
                className=" cursor-pointer bg-gray-900/50 rounded-full p-1.5 text-white/70 hover:text-white hover:bg-gray-900/60 transition-all"
                onClick={() => {
                  setAvatarCanvas(null);
                  setSelectedFile(null);
                }}
              >
                <CloseIcon size={27} className={""} />
              </div>
            )}
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
        onChange={(e) => {
          const value = e.target.value;
          //impide que se escriban mas de 30 caracteres sin incluir espacios al inicio o final
          if (value.trim().length <= 30) {
            setFullName(value);
          }
        }}
      />
      <button
        type="submit"
        className={`${
          hasChanged
            ? "text-zinc-950 bg-white hover:bg-white/55"
            : "text-white border-2 border-gray-500 hover:bg-zinc-500/5"
        } cursor-pointer  h-12 w-10/12 max-sm:w-full text-2xl mb-4 py-2 transition-all duration-300  font-bold rounded-3xl shadow`}
        onClick={hasChanged ? handleSubmit : onClose}
      >
        {hasChanged ? "Siguiente" : "Descartar por ahora"}
      </button>
    </div>
  );
};
