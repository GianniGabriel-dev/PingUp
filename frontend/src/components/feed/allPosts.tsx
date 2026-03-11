import { IndividualPost } from "./postCard.js";
import { LoadingIcon } from "@/assets/icons/LoadingIcon.js";
import { osbserverHook } from "@/hooks/observer.js";
import { useInifnitePosts } from "@/hooks/useAllPosts.js";
import { useEffect, useRef } from "react";


export const AllPosts = ({ filters }: { filters: string[] }) => { 
  const urlParams = filters.length > 0 ? `?sentiment=${filters.join(",")}` : "";

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, error } =
    useInifnitePosts({
      url: `post${urlParams}`,
      queryKey: ["allPosts", filters],
      limit: 10,
      enabledParam: true,
    });

    const loadMoreRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
      osbserverHook(loadMoreRef, hasNextPage, fetchNextPage)
    }, [fetchNextPage, hasNextPage]);

  if (isLoading) return <LoadingIcon />
  if (error) return <p>Error al cargar posts</p>;
  if (!data) return null;
  

  return (
    <>
        {data?.pages.map((page) =>
          Array.isArray(page.posts) ? page.posts.map((post) => (
            <IndividualPost key={post.id} {...post} />
          )) : null
        )}
        {isFetchingNextPage && <LoadingIcon/>}
        {/*Observer que detecta cuando se llega al final de la lista de comentarios para cargar más */}
        {hasNextPage && <div ref={loadMoreRef} style={{ height: 1 }} />}
    </>
  )
};
