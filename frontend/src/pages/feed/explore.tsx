import { ExploreIcon } from "@/assets/icons/ExploreIcon.js";


export function Explore() {
  return (
    <section className="px-6 mt-3">
      <article className="flex items-center gap-3 border border-gray-500 rounded-full px-4 py-2 focus-within:border-0 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
        <ExploreIcon className="text-white cursor-pointer" />

        <input
          type="text"
          placeholder="Buscar"
          className="bg-transparent outline-none text-sm text-white placeholder-gray-400 w-full"
        />
      </article>
    </section>
  );
}
