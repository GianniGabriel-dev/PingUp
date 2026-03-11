import { UserInfo } from "@/context/authContext.js";
import { api } from "@/lib/axios.js";
import { useState } from "react";
import { CharCounter } from "./CharCounter.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useModal } from "@/hooks/useModal.js";
import { AddPhotoIcon } from "@/assets/icons/AddPhotoIcon.js";

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

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [type, setType] = useState<"image" | "video" | null>(null);

  //constante que utilizo para detectar si el contenido del post es valido, para desactivar el boton de envio o no
  const isValidContent = contentTrimmed > 0 && contentTrimmed < 280 || previewUrl !== null;

  const queryClient = useQueryClient();

  // función que maneja la creación del post comunicándose con el backend, si no se responde a un post, parent_post_id se envía vacío y el abckend lo asigna como null
  const createPostMutation = useMutation({
    mutationFn: async () => {
      return await api.post(
        "/post",
        {media: file, content,  parent_post_id },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        },
      );
    },

    // cuando el post se crea correctamente
    onSuccess: () => {
      // si el post se publica se borra el texto del input
      setContent("");
      setPreviewUrl(null);
      setFile(null);
      setType(null)
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

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setFile(file);

    if (file.type.startsWith("video")) {
      setType("video");
    } else if (file.type.startsWith("image")) {
      setType("image");
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
      className={`w-full p-4  border-b border-gray-600 pb-0 ${isReply ? "pt-3" : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={`flex items-start gap-3 p-4 ${isReply ? "pt-1" : ""}`}>
        <img
          className="w-12 h-12 self-start -mt-2 rounded-full"
          src={user.avatar_url}
          alt={`image of user ${user.username}`}
        />
        {/*Donde se escribe el post*/}
        <section className="w-full">
          <textarea
            name="content"
            value={content}
            onChange={handleInput}
            className="w-full h-auto text-lg outline-none  focus:outline-none focus:ring-0 border-none resize-none placeholder-gray-500"
            placeholder={
              isReply ? "Postea tu respuesta" : "¿En qué estás pensando?"
            }
          ></textarea>
          {/* Vista previa del media adjunto */}
          {previewUrl && type === "image" && (
            <img
              src={previewUrl}
              alt="Media content"
              className="mt-1 border border-gray-600 w-max h-auto max-h-125 object-cover rounded-lg"
            />
          )}

          {previewUrl && type === "video" && (
            <video
              src={previewUrl}
              controls
              className="mt-1 rounded-lg max-h-96"
            />
          )}
        </section>
      </div>
      <section className="border-t h-12 flex place-items-center  gap-3 justify-between border-gray-600 p-3">
        <label className="hover:bg-blue-500/25 transition-all cursor-pointer rounded-full duration-300 p-1 w-8 h-8 flex items-center justify-center">
          <AddPhotoIcon className="text-blue-500" />

          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleFile}
            className="hidden"
          />
        </label>
        <div className="flex gap-3 items-center">
          <div className="w-15 flex justify-end">
            {contentTrimmed > 0 && <CharCounter length={contentTrimmed} />}
          </div>

          <button
            disabled={createPostMutation.isPending || !isValidContent}
            className={`p-1 text-s rounded-2xl w-28  transition-colors duration-300 text-black font-bold ${
              isValidContent && !createPostMutation.isPending
                ? "bg-white hover:bg-gray-300 cursor-pointer"
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
      </section>
    </form>
  );
};
