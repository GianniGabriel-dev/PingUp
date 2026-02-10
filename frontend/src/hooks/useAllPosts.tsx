import { PostsResponse } from "@/components/feed/typesPost.js";
import { useAuth } from "@/context/useAuth.js";
import { api } from "@/lib/axios.js";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

type PostsQueryParams = {
  url:string
  queryKey:(string | number | undefined)[]
  parent_post_id?: number | undefined
  limit?: number
}

export const useInifnitePosts =({url, queryKey, parent_post_id, limit = 10 }: PostsQueryParams) => {
     const {token} =useAuth()
    return useInfiniteQuery<PostsResponse>({
        queryKey:queryKey,
        // page param es el cursor inicial, en principio está vacío
        initialPageParam: undefined,
        queryFn: async({pageParam})=>{
            const res = await api.get<PostsResponse>(url, {
                params: { limit,   cursor: JSON.stringify(pageParam)},
                headers: token ? { Authorization: `Bearer ${token}` } : undefined,
            })
            return res.data
        },
    //saca el cursor de la pagina anteriror y se cargan mas posts a partir del cursor
    getNextPageParam: (lastPage) => {
        //si no hay nextCursor, se devuelve undefined y useInfiniteQuery sabe que no hay más páginas que cargar
      return lastPage.nextCursor ?? undefined
    },
    //si no hay parent_post_id, se cargan los posts normalmente, si hay parent_post_id, se espera a que esté definido para cargar los posts (en el caso de los comentarios de un post)
    enabled: parent_post_id !== undefined ? !!parent_post_id : true,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  })
}

export const usePosts = ({url, queryKey, parent_post_id, limit = 10 }: PostsQueryParams) => {
    const {token} =useAuth()
  return useQuery<PostsResponse>({
    queryKey: queryKey,
    queryFn: async () => {
      const res = await api.get<PostsResponse>(url, {
        params: { limit, cursor: "" },
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      return res.data;
    },
    enabled: parent_post_id !== undefined ? !!parent_post_id : true,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};