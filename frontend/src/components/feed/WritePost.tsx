import { UserInfo } from "@/context/authContext.js";
import { useRef } from "react";

type Props = {
  user: UserInfo;
};
export const WritePost = ({user}: Props) => {
  const handleSubmit = () => {};
  //creacion de referecnia al textAre para acceder directamente a su contenido
  const textareaRef = useRef(null);

  // Función que se ejecuta cada vez que se escribe en el textarea.
  // Ajusta dinámicamente la altura del textarea para que crezca con el contenido
  // evitando que aparezca scroll interno.
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>): void  => {
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    <form
      className="border-t border-b border-gray-600 w-full p-4 pb-0"
      onSubmit={handleSubmit}
    >
      <div className="flex items-center gap-4 p-4">
        <img className="w-10 h-10 self-start -mt-1" src="/user1.svg" alt={`image of user${user.username}`} />
        <textarea
          ref={textareaRef}
          onInput={handleInput}
          className="w-full h-auto max-h-60 text-lg outline-none overflow-hidden focus:outline-none focus:ring-0 border-none resize-none placeholder-gray-500"
          placeholder="¿En qué estás pensando?"
        ></textarea>
      </div>
      <div className="border-t flex place-items-center justify-end border-gray-600 p-4 ">
        <button className="p-1 bg-white text-s rounded-2xl w-28 text-black font-bold" type="submit">Publicar</button>
      </div>
    </form>
  );
};
