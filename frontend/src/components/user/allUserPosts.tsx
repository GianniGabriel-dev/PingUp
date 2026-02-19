import { IndividualPost } from "../feed/postCard.js";
import { LoadingIcon } from "@/assets/icons/LoadingIcon.js";
import { osbserverHook } from "@/hooks/observer.js";
import { useInifnitePosts } from "@/hooks/useAllPosts.js";
import { useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";

export const AllUserPosts = () => {
  const { username, tab } = useParams();
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

  console.log(data);

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
          <li className="cursor-pointer w-full text-center h-10 place-content-center transition-all hover:bg-zinc-900">
            <Link
              to={`/${username}/posts`}
              className="relative inline-block px-4 py-2 font-bold"
            > 
              Posts
             {view == "posts" && <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 rounded-l-md rounded-r-md"></span>}
            </Link>
          </li>
          <li className="cursor-pointer w-full text-center h-10 place-content-center transition-all hover:bg-zinc-900">
            <Link
              to={`/${username}/replies`}
              className="relative inline-block px-4 py-2 font-bold"
            >
              Respuestas
              {view == "replies" && <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 rounded-l-md rounded-r-md"></span>}
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
