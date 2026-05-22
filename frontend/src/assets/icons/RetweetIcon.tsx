interface IconProps {
  isReposted?: boolean;
  size?: number;
}

export function RetweetIcon({ isReposted, size = 20 }: IconProps) {
  return (
    <div className="hover:bg-emerald-600/25 transition-all rounded-full duration-300 w-7 h-7 flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        stroke="currentColor"
        strokeWidth={isReposted ? 1.8 : 1.5}
        fill="none"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="lucide lucide-repeat2-icon lucide-repeat-2"
      >
        <path d="m2 9 3-3 3 3" />
        <path d="M13 18H7a2 2 0 0 1-2-2V6" />
        <path d="m22 15-3 3-3-3" />
        <path d="M11 6h6a2 2 0 0 1 2 2v10" />
      </svg>
    </div>
  );
}
