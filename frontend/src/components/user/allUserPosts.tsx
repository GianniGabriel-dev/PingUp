import { IndividualPost } from "../feed/postCard.js";
import { LoadingIcon } from "@/assets/icons/LoadingIcon.js";
import { osbserverHook } from "@/hooks/observer.js";
import { useInifnitePosts } from "@/hooks/useAllPosts.js";
import { useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";

export const AllUserPosts = () => {
  const { username, tab } = useParams();
  //view decide a que ednpoint de la api pedir datos, replies, o posts de usuario
  const view = tab === "replies" ? "replies" : "posts";

  //Posts o respuestas del usuario
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
  } = useInifnitePosts({
    url: `${username}/${view}`,
    queryKey: ["userPosts", username, view],
    limit: 10,
    enabledParam: !!username,
  });

  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    osbserverHook(loadMoreRef, hasNextPage, fetchNextPage);
  }, [fetchNextPage, hasNextPage]);

  if (isLoading) return <LoadingIcon size={40} />;
  if (isError) return null;

  return (
    <>
      <nav>
        <ul className="flex justify-between border-b border-gray-600 ">
          <li className="w-full h-10 transition-all hover:bg-zinc-900">
            <Link
              to={`/${username}`}
              className="flex items-center justify-center w-full h-full"
            >
              <span className="relative inline-block px-4 py-2 font-bold">
                Posts
                {view === "posts" && (
                  <span className="absolute left-0 bottom-0 w-full h-1 bg-blue-500 rounded-md"></span>
                )}
              </span>
            </Link>
          </li>
          <li className="w-full h-10 transition-all hover:bg-zinc-900">
            <Link
              to={`/${username}/replies`}
              className="flex items-center justify-center w-full h-full"
            >
              <span className="relative inline-block px-4 py-2 font-bold">
                Replies
                {view === "replies" && (
                  <span className="absolute left-0 bottom-0 w-full h-1 bg-blue-500 rounded-md"></span>
                )}
              </span>
            </Link>
          </li>
        </ul>
      </nav>
      {data?.pages.map((page) =>
        Array.isArray(page.posts)
          ? page.posts.map((post) => <IndividualPost key={post.id} {...post} />)
          : null,
      )}
      {isFetchingNextPage && <LoadingIcon size={30} />}
      {/*Observer que detecta cuando se llega al final de la lista de comentarios para cargar más */}
      {hasNextPage && <div ref={loadMoreRef} style={{ height: 1 }} />}
    </>
  );
};
