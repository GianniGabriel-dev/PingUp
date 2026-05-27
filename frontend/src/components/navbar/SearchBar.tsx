import { ExploreIcon } from "@/assets/icons/ExploreIcon.js";
import { useSearchUsers } from "@/hooks/useSearchUsers.js";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export const SearchBar = () => {
  const [inputValue, setInputValue]     = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isOpen, setIsOpen]             = useState(false);
  const containerRef                    = useRef<HTMLDivElement>(null);
  const navigate                        = useNavigate();

  // Debounce: wait 300 ms after the user stops typing before firing the query
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedQuery(inputValue.trim());
    }, 300);
    return () => clearTimeout(timeout);
  }, [inputValue]);

  // Close the dropdown when clicking outside the component
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const { data: users, isLoading } = useSearchUsers(debouncedQuery);

  const handleSelect = (username: string) => {
    navigate(`/${username}`);
    setInputValue("");
    setDebouncedQuery("");
    setIsOpen(false);
  };

  const showDropdown = isOpen && debouncedQuery.length > 0;

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Input */}
      <article className="flex items-center gap-3 border border-gray-500 rounded-full px-4 py-2 focus-within:border-0 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
        <ExploreIcon className="text-white shrink-0" />
        <input
          type="text"
          placeholder="Buscar"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="bg-transparent outline-none text-sm text-white placeholder-gray-400 w-full"
        />
      </article>

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute top-full mt-2 w-full bg-black border border-gray-700 rounded-2xl shadow-xl z-50 overflow-hidden">
          {isLoading ? (
            <p className="text-gray-400 text-sm px-4 py-3">Buscando...</p>
          ) : users && users.length > 0 ? (
            users.map((user) => (
              <button
                key={user.id}
                // onMouseDown instead of onClick so it fires before the input's onBlur
                onMouseDown={() => handleSelect(user.username)}
                className="flex items-center gap-3 w-full px-4 py-3 hover:bg-white/5 transition-colors text-left cursor-pointer"
              >
                <img
                  src={user.avatar_url}
                  alt={user.username}
                  className="w-9 h-9 rounded-full object-cover shrink-0"
                />
                <div className="flex flex-col min-w-0">
                  <span className="text-white font-semibold text-sm truncate">
                    {user.name ?? user.username}
                  </span>
                  <span className="text-gray-400 text-xs truncate">
                    @{user.username}
                  </span>
                </div>
              </button>
            ))
          ) : (
            <p className="text-gray-400 text-sm px-4 py-3">
              No se encontraron usuarios
            </p>
          )}
        </div>
      )}
    </div>
  );
};
