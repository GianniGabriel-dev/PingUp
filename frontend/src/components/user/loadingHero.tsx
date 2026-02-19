import { Header } from "../ui/header.js";

export const LoadingHero = () => {
  return (
    <>
      <Header>
        <div className="flex gap-8 items-center">
          <div className="w-8 h-8 rounded-full bg-zinc-800 animate-pulse" />
          <div className="h-6 w-32 bg-zinc-800 rounded animate-pulse" />
        </div>
      </Header>

      <div className="w-full max-w-2xl mx-auto bg-black overflow-hidden animate-pulse">
        {/* Banner skeleton */}
        <div className="w-full h-40 bg-zinc-800" />

        {/* Info skeleton */}
        <div className="px-6 pb-6">
          <div className="relative -mt-15 mb-4 flex items-end justify-between">
            {/* Avatar */}
            <div className="w-30 h-30 rounded-full bg-zinc-800 border-4 border-black" />

            {/* Button */}
            <div className="w-24 h-9 rounded-full bg-zinc-800 -translate-y-2" />
          </div>

          {/* Name */}
          <div className="h-6 w-40 bg-zinc-800 rounded mb-2" />

          {/* Username */}
          <div className="h-4 w-28 bg-zinc-800 rounded mb-3" />

          {/* Bio */}
          <div className="space-y-2">
            <div className="h-3 w-full bg-zinc-800 rounded" />
            <div className="h-3 w-5/6 bg-zinc-800 rounded" />
          </div>

          {/* Date */}
          <div className="h-3 w-32 bg-zinc-800 rounded mt-4" />
        </div>
      </div>
    </>
  );
};
