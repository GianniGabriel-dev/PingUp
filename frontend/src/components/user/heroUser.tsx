import { Header } from "../ui/header.js";
import { BackIcon } from "@/assets/icons/BackIcon.js";
import { LoadingHero } from "./loadingHero.js";

interface UserData {
  username: string;
  banner_url?: string | null;
  avatar_url: string;
  name?: string;
  bio?: string;
  created_at: string;
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
          <p className="font-extrabold text-xl">{data.name}</p>
        </div>
      </Header>
      <div className="w-full max-w-2xl mx-auto bg-black overflow-hidden">
        {/* Banner */}
        <div
          className={`w-full h-40 ${banner ? "" : "bg-slate-600"}`}
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
          <div className="relative -mt-15 mb-3 flex items-end justify-between">
            <img
              src={data.avatar_url}
              alt={data.username}
              className="w-30 h-30 rounded-full border-4 border-black object-cover"
            />

            <button className="cursor-pointer px-5 py-1.5 rounded-full border border-gray-500 font-bold hover:bg-white hover:text-black transition -translate-y-2">
              Seguir
            </button>
          </div>

          {/* Name + username */}
          <div className="mb-2">
            <h1 className="text-2xl font-extrabold">
              {data.name || data.username}
            </h1>
            <p className="text-gray-500">@{data.username}</p>
          </div>

          {/* Bio */}
          <p className="text-sm text-gray-500 whitespace-pre-line">
            {data.bio}
          </p>

          {/* Meta */}
          <div className="mt-3 text-sm text-gray-500">
            Se unió el {new Date(data.created_at).toLocaleDateString()}
          </div>
        </div>
      </div>
    </>
  );
};
