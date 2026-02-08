import { CommentIcon } from "@/assets/icons/index.js";
import { useNavigate } from "react-router-dom";
import { Post } from "./typesPost.js";
import { useQueryClient } from "@tanstack/react-query";

export default function CommentButton({
  totalComments,
  post,
}: {
  totalComments: number | null;
  post: Post;
}) {
  const navigate = useNavigate();
  const queryClient= useQueryClient()
  if (totalComments == null) totalComments = 0;
  const isReply = true;
  return (
    <>
      <button
        onClick={(e) => {
          e?.stopPropagation(); // Evita el click en el comentario se propague al post y lo abra
          queryClient.invalidateQueries({ queryKey: ["posts", "detail", post.id] }); //actualiza la cache
          //al navegar al modal que se abre en la ruta del post clickeado, se el pasa informacion para modificar el estado del layout sin consutar la bd
          navigate(`/post/${post.id}/?modal=compose`,  {
            replace:false,
            state: {
              post,
              isReply,
              //guardado de coord del scroll actual
              scrollY: window.scrollY,
            },
          });
        }}
        className="flex gap-0.5 items-center cursor-pointer transition-all duration-300 hover:text-blue-500 active:scale-95"
      >
        <CommentIcon size={20} />
        <span>{totalComments > 0 ? totalComments : ""}</span>
      </button>
    </>
  );
}
