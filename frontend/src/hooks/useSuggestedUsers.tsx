import { useAuth } from "@/context/useAuth.js";
import { api } from "@/lib/axios.js";
import { useQuery } from "@tanstack/react-query";

export type SuggestedUser = {
  id: number;
  username: string;
  name: string | null;
  avatar_url: string;
  _count: { followers: number };
  isFollowing: boolean;
};

export const useSuggestedUsers = (excludeUsername?: string) => {
  const { token } = useAuth();
  return useQuery<SuggestedUser[]>({
    queryKey: ["suggestedUsers", excludeUsername],
    queryFn: async () => {
      const res = await api.get<SuggestedUser[]>("suggested-users", {
        params: excludeUsername ? { viewingUsername: excludeUsername } : undefined,
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      return res.data;
    },
    enabled: !!token,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
