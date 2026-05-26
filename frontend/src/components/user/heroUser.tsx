import { Header } from "../ui/header.js";
import { BackIcon } from "@/assets/icons/BackIcon.js";
import { LoadingHero } from "./loadingHero.js";
import { HeroButton } from "./heroButton.js";

export interface UserData {
  id: number;
  username: string;
  banner_url?: string | null;
  avatar_url: string;
  name?: string;
  bio?: string;
  created_at: string;
  isFollowing: boolean;
  _count: {
    followers: number;
    following: number;
    posts: number;
  };
}

export const HeroUser = ({
  data,
  isLoading,
  handleBack,
}: {
  data: UserData | null;
  isLoading: boolean;
  handleBack: () => void;
}) => {
  if (isLoading) {
    return <LoadingHero />;
  }

  if (!data) {
    return null;
  }

  const banner = data.banner_url || null;

  return (
    <>
      <Header>
        <div className="flex gap-8 place-items-center">
          <button type="button" onClick={handleBack}>
            <BackIcon
              size={30}
              className={
                "transition-all duration-300 rounded-3xl p-0.75 hover:bg-zinc-800 cursor-pointer"
              }
            />
            <span className="sr-only">Volver</span>
          </button>
          <div className="flex flex-col">
            <p className="font-extrabold text-xl">{data.name}</p>
            <p className="text-gray-500   font-stretch-ultra-expanded text-sm font-medium">{data._count.posts} posts</p>
          </div>
        </div>
      </Header>
      <div className="w-full max-w-2xl mx-auto bg-black overflow-hidden">
        {/* Banner */}
        <div
          className={"w-full h-50"}
          style={
            banner
              ? {
                  backgroundImage: `url(${banner})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
              : undefined
          }
        />

        {/* Info */}
        <div className="px-6 pb-6">
          {/* Avatar + Follow */}
          <div className="relative -mt-17.5 mb-3 flex items-end justify-between">
            <img
              src={data.avatar_url}
              alt={data.username}
              className="w-35 h-35 rounded-full border-4 border-black object-cover"
            />
            <HeroButton user={data} />
          </div>

          {/* Name + username */}
          <div className="mb-2">
            <h1 className="text-2xl font-extrabold">
              {data.name || data.username}
            </h1>
            <p className="text-gray-500">@{data.username}</p>
          </div>

          {/* Bio */}
          <p className="text-sm text-white whitespace-pre-line">{data.bio}</p>

          {/* Meta */}
          <div className="mt-3 text-sm text-gray-500">
            Se unió el {new Date(data.created_at).toLocaleDateString()}
          </div>

          {/* Stats - Like Twitter */}
          <div className="mt-4 flex gap-6 text-sm">
            <div className="flex gap-1 group cursor-pointer hover:opacity-80 transition-opacity">
              <span className="text-white font-bold">
                {data._count.following}
              </span>
              <span className="text-gray-500">Siguiendo</span>
            </div>
            <div className="flex gap-1 group cursor-pointer hover:opacity-80 transition-opacity">
              <span className="text-white font-bold">
                {data._count.followers}
              </span>
              <span className="text-gray-500">Seguidores</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
