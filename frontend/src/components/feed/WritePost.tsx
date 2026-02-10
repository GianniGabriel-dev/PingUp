import { UserInfo } from "@/context/authContext.js";
import { api } from "@/lib/axios.js";
import { useState } from "react";
import { CharCounter } from "./CharCounter.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useModal } from "@/hooks/useModal.js";

type Props = {
  user: UserInfo;
  token: string;
  isReply: boolean;
};
export const WritePost = ({ user, token, isReply }: Props) => {
  const [content, setContent] = useState("");
  const parent_post_id = useParams().postId;
  const contentTrimmed = content.trim().length;
  const { closeModal } = useModal();
  //constante que utilizo para detectar si el contenido del post es valido, para desactivar el boton de envio o no
  const isValidContent = contentTrimmed > 0 && contentTrimmed < 280;

  const queryClient = useQueryClient();

  // función que maneja la creación del post comunicándose con el backend, si no se responde a un post, parent_post_id se envía vacío y el abckend lo asigna como null
  const createPostMutation = useMutation({
    mutationFn: async () => {
      return await api.post(
        "/post",
        { content, parent_post_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    },

    // cuando el post se crea correctamente
    onSuccess: () => {
      // si el post se publica se borra el texto del input
      setContent("");
      closeModal();
      // se recargan los posts en la cache de react query para mostar el nuevo post sin actualizar la pagina
      queryClient.invalidateQueries({ queryKey: ["allPosts"] });
      queryClient.invalidateQueries({
        queryKey: ["posts", "detail", parent_post_id],
      });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isValidContent) {
      createPostMutation.mutate();
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
      className={`border-b border-gray-600 w-full p-4 pb-0 ${isReply ? "pt-3" : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={`flex items-center gap-3 p-4 ${isReply ? "pt-1" : ""}`}>
        <img
          className="w-12 h-12 self-start -mt-2 rounded-full"
          src={user.avatar_url}
          alt={`image of user ${user.username}`}
        />
        <textarea
          name="content"
          value={content}
          onChange={handleInput}
          className="w-full h-auto max-h-60 text-lg outline-none  focus:outline-none focus:ring-0 border-none resize-none placeholder-gray-500"
          placeholder={
            isReply ? "Postea tu respuesta" : "¿En qué estás pensando?"
          }
        ></textarea>
      </div>
      <div className="border-t flex place-items-center gap-3 justify-end border-gray-600 p-3 ">
        {/*no carga el contador de carcteres si no se ha escrito nada*/}
        {contentTrimmed > 0 && <CharCounter length={contentTrimmed} />}
        <button
          disabled={createPostMutation.isPending || !isValidContent}
          className={`p-1 text-s rounded-2xl w-28 transition-colors duration-300 text-black font-bold ${
            isValidContent && !createPostMutation.isPending
              ? "bg-white cursor-pointer"
              : "bg-gray-500"
          }`}
          type="submit"
        >
          {createPostMutation.isPending
            ? "Publicando"
            : isReply
              ? "Responder"
              : "Publicar"}
        </button>
      </div>
    </form>
  );
};
