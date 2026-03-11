import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Check } from "lucide-react";
import { useState } from "react";

type FilterHeaderProps = {
  appliedFilters: string[];
  selectedFilters: string[];
  handleApplyFilters: () => void;
  handleFilterChange: (sentiment: string) => void;
};
export const FilterHeader = ({
  appliedFilters,
  selectedFilters,
  handleApplyFilters,
  handleFilterChange,
}: FilterHeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleApply = () => {
    handleApplyFilters();
    setIsOpen(false);
  };

  return (
    <div className="sticky top-0 z-40 bg-black/70 backdrop-blur-md w-full border-b border-gray-700">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <button className="px-4 cursor-pointer py-2 w-full flex justify-between items-center hover:bg-zinc-800 transition-colors">
            <span className="font-medium">Cambiar Filtros</span>

            {appliedFilters.length > 0 && (
              <span className="text-sm font-bold text-blue-500">
                ({appliedFilters.length})
              </span>
            )}
          </button>
        </PopoverTrigger>

        <PopoverContent className="w-80 p-4 mt-1 bg-black border border-gray-500 rounded-2xl">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-gray-300">
              Filtrar por sentimiento
            </h3>

            {/* Positivo */}
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={selectedFilters.includes("positivo")}
                  onChange={() => handleFilterChange("positivo")}
                  className="peer appearance-none w-6 h-6  border border-gray-500 rounded-md cursor-pointer checked:bg-blue-500 checked:border-blue-500"
                />

                <span className="absolute inset-0 flex items-center justify-center text-white text-xs opacity-0 peer-checked:opacity-100">
                  <Check />
                </span>
              </div>

              <span className=" group-hover:text-white text-gray-300">
                Positivo
              </span>
            </label>

            {/* Neutral */}
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={selectedFilters.includes("neutral")}
                  onChange={() => handleFilterChange("neutral")}
                  className="peer appearance-none w-6 h-6  border border-gray-500 rounded-md cursor-pointer checked:bg-blue-500 checked:border-blue-500"
                />

                <span className="absolute inset-0 flex items-center justify-center text-white text-xs opacity-0 peer-checked:opacity-100">
                  <Check />
                </span>
              </div>

              <span className=" group-hover:text-white text-gray-300">
                Neutral
              </span>
            </label>

            {/* Negativo */}
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={selectedFilters.includes("negativo")}
                  onChange={() => handleFilterChange("negativo")}
                  className="peer appearance-none w-6 h-6  border border-gray-500 rounded-md cursor-pointer checked:bg-blue-500 checked:border-blue-500"
                />

                <span className="absolute inset-0 flex items-center justify-center text-white text-xs opacity-0 peer-checked:opacity-100">
                  <Check />
                </span>
              </div>

              <span className=" group-hover:text-white text-gray-300">
                Negativo
              </span>
            </label>

            <button
              onClick={handleApply}
              disabled={selectedFilters.length === 0}
              className={` w-full mt-2 px-4 py-2 rounded-lg font-medium transition ${
                selectedFilters.length === 0
                  ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
              }`}
            >
              Aplicar filtros
            </button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
