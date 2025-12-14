import { UserInfo } from "@/context/authContext.js";
import { api } from "@/lib/axios.js";
import axios from "axios";
import { useState } from "react";
import { CharCounter } from "./CharCounter.js";

type Props = {
  user: UserInfo;
  token: string;
};
export const WritePost = ({ user, token }: Props) => {
  const [content, setContent] = useState("");
  const contentTrimmed= content.trim().length 
  //constante que utilizo para detectar si el contenido del post es valido, para desactivar el boton de envio o no
  const isValidContent = contentTrimmed > 0 && contentTrimmed<280;

  //fucnión que maneja la creción del post comunicándose con el backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post(
        "/post",
        {
          content: content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //si el post se publica se borra el texot del input
      setContent("");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log(token);
        console.log(error);
      }
    }
  };

  // Función que se ejecuta cada vez que se escribe en el textarea.
  // Ajusta dinámicamente la altura del textarea para que crezca con el contenido
  // evitando que aparezca scroll interno.
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
    setContent(textarea.value);
  };

  return (
    <form
      className="border-t border-b border-gray-600 w-full p-4 pb-0"
      onSubmit={handleSubmit}
    >
      <div className="flex items-center gap-4 p-4">
        <img
          className="w-10 h-10 self-start -mt-1"
          src="/user1.svg"
          alt={`image of user${user.username}`}
        />
        <textarea
          name="content"
          value={content}
          onChange={handleInput}
          className="w-full h-auto max-h-60 text-lg outline-none  focus:outline-none focus:ring-0 border-none resize-none placeholder-gray-500"
          placeholder="¿En qué estás pensando?"
        ></textarea>
      </div>
      <div className="border-t flex place-items-center gap-3 justify-end border-gray-600 p-4 ">
        {/*no carga el contador de carcteres si no se ha escrito nada*/}
        {contentTrimmed  >0 && <CharCounter length={contentTrimmed}/>}
        <button
          disabled={!isValidContent}
          className={`p-1 text-s rounded-2xl w-28 transition-colors duration-300 text-black font-bold ${
            isValidContent ? "bg-white" : "bg-gray-500"
          }`}
          type="submit"
        >
          Publicar
        </button>
      </div>
    </form>
  );
};
