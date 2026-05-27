import { IndividualPost } from "./postCard.js";
import { LoadingIcon } from "@/assets/icons/LoadingIcon.js";
import { osbserverHook } from "@/hooks/observer.js";
import { useInifnitePosts } from "@/hooks/useAllPosts.js";
import { useEffect, useRef } from "react";

export const FollowingPosts = () => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, error } =
    useInifnitePosts({
      url: "posts-user-follows",
      queryKey: ["followingPosts"],
      limit: 10,
      enabledParam: true,
    });

  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  
useEffect(() => {
  return osbserverHook(loadMoreRef, hasNextPage, fetchNextPage, isFetchingNextPage)
}, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) return <LoadingIcon />;
  if (error) return <p className="text-center text-gray-400 py-8">Error al cargar posts</p>;
  
  const posts = data?.pages.flatMap((page) => (Array.isArray(page.posts) ? page.posts : [])) || [];

  if (!data || posts.length === 0) {
    return (
      <div className="flex items-center justify-center py-16">
        <p className="text-gray-400 text-lg">No hay posts de gente que sigas</p>
      </div>
    );
  }

  return (
    <>
      {posts.map((post) => (
        <IndividualPost key={post.id} {...post} />
      ))}
      {isFetchingNextPage && <LoadingIcon />}
      {hasNextPage && <div ref={loadMoreRef} style={{ height: 1 }} />}
    </>
  );
};
