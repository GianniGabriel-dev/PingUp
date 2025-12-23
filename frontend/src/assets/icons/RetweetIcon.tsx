interface IconProps {
  isRetweeted: boolean;
  size?: number;
}

export function RetweetIcon({
  isRetweeted,
  size = 20,
}: IconProps) {
    return (
      <div className="hover:bg-emerald-600/25 transition-all rounded-full duration-300 w-7 h-7 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={isRetweeted ? 1.8 : 1.5}
          fill="none"
          width={size}
          height={size}
        >
          <path d="M17 1l4 4-4 4" />
          <path d="M3 11V9a4 4 0 0 1 4-4h14" />
          <path d="M7 23l-4-4 4-4" />
          <path d="M21 13v2a4 4 0 0 1-4 4H3" />
        </svg>
      </div>
    );
  }

