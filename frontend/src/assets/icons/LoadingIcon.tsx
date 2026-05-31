import { useServerAwake } from "../../hooks/useServerAwake";

export const LoadingIcon = () => {
  const isAwake = useServerAwake();

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12">
      <div className="animate-spin">
        <div className="w-8 h-8 border-4 border-gray-600 border-t-blue-500 rounded-full"></div>
      </div>
      {isAwake === false && (
        <p className="text-xl text-gray-400 animate-pulse">
          Despertando servidores...
        </p>
      )}
    </div>
  );
};
