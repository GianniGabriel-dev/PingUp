import { api } from "@/lib/axios.js";
import { useQuery } from "@tanstack/react-query";

export type UserSearchResult = {
  id: number;
  username: string;
  name: string | null;
  avatar_url: string;
  _count: { followers: number };
};

export const useSearchUsers = (query: string) => {
  return useQuery<UserSearchResult[]>({
    queryKey: ["searchUsers", query],
    queryFn: async () => {
      const res = await api.get<UserSearchResult[]>("search", {
        params: { q: query },
      });
      return res.data;
    },
    enabled: query.trim().length > 0,
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
  });
};
