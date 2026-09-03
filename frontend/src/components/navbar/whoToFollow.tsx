import { useAuth } from "@/context/useAuth.js";
import { useSuggestedUsers } from "@/hooks/useSuggestedUsers.js";
import { api } from "@/lib/axios.js";
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const WhoToFollow = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { username } = useParams();
  const { data: users, isLoading } = useSuggestedUsers(username);

  if (isLoading || !users || users.length === 0) return null;

  return (
    <article className="border border-gray-500 rounded-2xl p-4 flex flex-col gap-3">
      <h2 className="text-lg font-bold">A quién seguir</h2>
      {users.map((user) => (
        <SuggestedUserCard
          key={user.id}
          user={user}
          token={token}
          queryClient={queryClient}
          navigate={navigate}
        />
      ))}
    </article>
  );
};

type SuggestedUserCardProps = {
  user: {
    id: number;
    username: string;
    name: string | null;
    avatar_url: string;
    _count: { followers: number };
    isFollowing: boolean;
  };
  token: string | null;
  queryClient: QueryClient;
  navigate: ReturnType<typeof useNavigate>;
};

const SuggestedUserCard = ({ user, token, queryClient, navigate }: SuggestedUserCardProps) => {
  const [isFollowing, setIsFollowing] = useState(user.isFollowing);
  const [hover, setHover] = useState(false);

  const followMutation = useMutation({
    mutationFn: async () => {
      await api.post(
        `follow/${user.id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
    },
    onMutate: () => setIsFollowing((prev) => !prev),
    onError: () => setIsFollowing((prev) => !prev),
  });

  const handleFollow = () => {
    if (!token || followMutation.isPending) return;
    followMutation.mutate();
  };

  return (
    <div className="flex items-center gap-3">
      <img
        src={user.avatar_url}
        alt={user.username}
        onClick={() => navigate(`/${user.username}`)}
        className="w-10 h-10 rounded-full object-cover shrink-0 cursor-pointer"
      />
      <div className="flex flex-col min-w-0 flex-1">
        <span
          onClick={() => navigate(`/${user.username}`)}
          className="text-white font-semibold text-sm truncate cursor-pointer hover:underline"
        >
          {user.name ?? user.username}
        </span>
        <span className="text-gray-400 text-xs truncate">@{user.username}</span>
      </div>
      <button
        disabled={followMutation.isPending || !token}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={handleFollow}
        className={`text-sm px-3 py-1 rounded-full font-bold transition-all duration-200 shrink-0 cursor-pointer
          ${
            isFollowing
              ? "bg-transparent text-white border border-gray-500 hover:border-red-500 hover:text-red-500 hover:bg-red-500/10"
              : "bg-white text-black hover:bg-white/90"
          }
          ${followMutation.isPending || !token ? "opacity-50 cursor-not-allowed" : ""}
        `}
      >
        {isFollowing ? (hover ? "Dejar de seguir" : "Siguiendo") : "Seguir"}
      </button>
    </div>
  );
};
