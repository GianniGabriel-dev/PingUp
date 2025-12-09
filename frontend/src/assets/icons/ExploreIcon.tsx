interface IconProps {
  filled?: boolean;
  size?: number;
  className?: string;
}

export function ExploreIcon({ filled = false, size = 20, className = "" }: IconProps) {
  if (filled) {
    // Versión SOLID (cuando está activo)
    return (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    className={className}
    viewBox="0 0 24 24"
  >
    <path
      fill="#FFF"
      fillRule="evenodd"
      d="M5 11a6 6 0 1 1 12 0 6 6 0 0 1-12 0m6-8a8 8 0 1 0 4.906 14.32l3.387 3.387a1 1 0 0 0 1.414-1.414l-3.387-3.387A8 8 0 0 0 11 3m4 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0"
      clipRule="evenodd"
    ></path>
  </svg>
    );
  }

  // Versión OUTLINE (cuando NO está activo)
  return (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    className={className}
    viewBox="0 0 24 24"
  >
    <path
      fill="#FFF"
      fillRule="evenodd"
      d="M11 5a6 6 0 1 0 0 12 6 6 0 0 0 0-12m-8 6a8 8 0 1 1 14.32 4.906l3.387 3.387a1 1 0 0 1-1.414 1.414l-3.387-3.387A8 8 0 0 1 3 11"
      clipRule="evenodd"
    ></path>
  </svg>
  );
}
