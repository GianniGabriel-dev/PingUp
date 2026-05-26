import { BackIcon } from "@/assets/icons/BackIcon.js";
import { Header } from "../ui/header.js";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useAuth } from "@/context/useAuth.js";
import { LoadingIcon } from "@/assets/icons/LoadingIcon.js";
import { IndividualPost } from "./postCard.js";
import { WritePost } from "./WritePost.js";
import { useInifnitePosts } from "@/hooks/useAllPosts.js";
import { osbserverHook } from "@/hooks/observer.js";

export const DetailsPost = () => {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const location = useLocation();
  const parent_post_id = useParams().postId;
  //se guarda la ubicación del scroll con useRef para evitar que se pierda al cerrar el modal de compose por ejemplo
  const scrollRef = useRef(location.state?.scrollY);

  const handleBack = () => {
    navigate(-1); // volver a la página anterior
    window.scrollTo(0, scrollRef.current); // restaurar scroll
  };

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInifnitePosts({
      url: `post/${parent_post_id}`,
      queryKey: ["posts", "detail", parent_post_id],
      limit: 10,
      enabledParam: !!parent_post_id,
    });

  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    osbserverHook(loadMoreRef, hasNextPage, fetchNextPage);
  }, [fetchNextPage, hasNextPage]);

  if (isLoading) return <LoadingIcon />;
  if (!data) return null;

  //primera página recibida (el post principal)
  const firstPage = data?.pages[0];
  return (
    <>
      <Header>
        <div className="flex gap-10 place-items-center">
          <button type="button" onClick={handleBack}>
            <BackIcon
              size={30}
              className={
                "transition-all duration-300 rounded-3xl p-0.75 hover:bg-zinc-800 cursor-pointer"
              }
            />
            <span className="sr-only">Volver</span>
          </button>
          <p className="font-extrabold text-xl">Post</p>
        </div>
      </Header>
      <section>
        {/*Si el post ha sido eliminado no muestra el post ni la opcion de escribir un comentario, pero si muestra los comentarios del post iniciales */}
        {firstPage.posts.deleted_at ? (
          <div className="border border-gray-600 rounded-2xl mx-4 my-8 p-6 bg-neutral-900 text-center">
            <p className="text-gray-400 text-base">Este post ya no está disponible, ha sido eliminado por el autor</p>
          </div>
        ) : (
          <>
            <IndividualPost key={firstPage.posts.id} {...firstPage.posts} />
            {user && token && (
              <WritePost user={user} token={token} isReply={true} />
            )}
          </>
        )}

        {/* Separador con título de respuestas */}
        <div className="border-t border-gray-700 px-4 py-4">
          <p className="text-white text-lg font-semibold">Respuestas al post</p>
        </div>
        {data?.pages[0]?.posts?.replies.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 mt-10">
            <p className="text-gray-400 text-lg">No se han encontrado respuestas para este post.</p>
          </div>
        ) : (
          <>
            {data?.pages.map((page) =>
              page.posts.replies.map((reply) => (
                <IndividualPost key={reply.id} {...reply} />
              ))
            )}
          </>
        )}
        {isFetchingNextPage && <LoadingIcon />}
        {/*Observer que detecta cuando se llega al final de la lista de comentarios para cargar más */}
        {hasNextPage && <div ref={loadMoreRef} style={{ height: 1 }} />}
        
      </section>
    </>
  );
};
