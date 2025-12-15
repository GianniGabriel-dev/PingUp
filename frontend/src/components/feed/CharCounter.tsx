export const CharCounter = ({ length }: { length: number }) => {
  const MAX_CHARS = 280;
  const radius = 13;
  const circumference = 2 * Math.PI * radius;

  const progress = Math.min(length / MAX_CHARS, 1);
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div className="flex gap-0.5 items-center border-r border-gray-500 pr-1">
      <span className={`${length>= MAX_CHARS ? "text-rose-500": ""} font-bold `}>
        {MAX_CHARS - length}
      </span>
      <svg width="40" height="40">
        {/* Círculo base */}
        <circle
          cx="20"
          cy="20"
          r={radius}
          stroke="#4A5565"
          strokeWidth="3"
          fill="transparent"
        />
        {/* Progreso */}
        <circle
          cx="20"
          cy="20"
          r={radius}
          stroke={length >= MAX_CHARS ? "oklch(64.5% 0.246 16.439) " : "rgb(2,132,199)"}
          strokeWidth="3"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform="rotate(-90 20 20)"
          style={{ transition: "stroke-dashoffset 0.2s ease" }}
        />
      </svg>
    </div>
  );
};