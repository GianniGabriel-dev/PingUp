import { IndividualPost } from "./postCard.js";
import { LoadingIcon } from "@/assets/icons/LoadingIcon.js";
import { useInifnitePosts } from "@/hooks/useAllPosts.js";
import { useEffect, useRef } from "react";


export const AllPosts = () => {

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, error } =
    useInifnitePosts({
      url: `post`,
      queryKey: ["allPosts"],
      parent_post_id: undefined,
      limit: 10,
    });
    console.log(data)

    const loadMoreRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
      //si no existe el ref o no hay más páginas que cargar, no se crea el observer
      if (!loadMoreRef.current) return;
      if (!hasNextPage) return;
  
      //Observer que detecta cuando se llega al final de la lista de comentarios para cargar más
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          //si el elemento es visible, se carga la siguiente página de comentarios
          if (entry.isIntersecting) {
            fetchNextPage();
          }
        },
        //threshold: 1 hace que el callback se ejecute cuando el 100% del elemento sea visible.
        { threshold: 1 },
      );
      observer.observe(loadMoreRef.current);
      //se desconecta el observer al desmontar el componente para evitar fugas de memoria
      return () => observer.disconnect();
    }, [fetchNextPage, hasNextPage]);



  if (isLoading) return <LoadingIcon size={40}/>
  if (error) return <p>Error al cargar posts</p>;
  if (!data) return null;
  

  return (
    <>
        {data?.pages.map((page) =>
          page.posts.map((post) => (
            <IndividualPost key={post.id} {...post} />
          )),
        )}
        {isFetchingNextPage && <LoadingIcon size={30} />}
        {/*Observer que detecta cuando se llega al final de la lista de comentarios para cargar más */}
        {hasNextPage && <div ref={loadMoreRef} style={{ height: 1 }} />}
    </>
  )
};
