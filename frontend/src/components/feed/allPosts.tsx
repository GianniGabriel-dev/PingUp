import { IndividualPost } from "./postCard.js";
import { LoadingIcon } from "@/assets/icons/LoadingIcon.js";
import { osbserverHook } from "@/hooks/observer.js";
import { useInifnitePosts } from "@/hooks/useAllPosts.js";
import { useEffect, useRef } from "react";


export const AllPosts = () => {

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, error } =
    useInifnitePosts({
      url: `post`,
      queryKey: ["allPosts"],
      limit: 10,
      enabledParam: true,
    });
    console.log(data)

    const loadMoreRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
      osbserverHook(loadMoreRef, hasNextPage, fetchNextPage)
    }, [fetchNextPage, hasNextPage]);

  if (isLoading) return <LoadingIcon size={40}/>
  if (error) return <p>Error al cargar posts</p>;
  if (!data) return null;
  

  return (
    <>
        {data?.pages.map((page) =>
          Array.isArray(page.posts) ? page.posts.map((post) => (
            <IndividualPost key={post.id} {...post} />
          )) : null
        )}
        {isFetchingNextPage && <LoadingIcon size={30} />}
        {/*Observer que detecta cuando se llega al final de la lista de comentarios para cargar más */}
        {hasNextPage && <div ref={loadMoreRef} style={{ height: 1 }} />}
    </>
  )
};
