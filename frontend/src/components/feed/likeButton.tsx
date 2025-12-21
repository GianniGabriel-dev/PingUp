import { useState } from 'react';

export default function LikeButton() {
  const [isLiked, setIsLiked] = useState(false);

  return (
      <button
        onClick={() => setIsLiked(!isLiked)}
        className="group relative p-2 rounded-full transition-all duration-300 hover:scale-110 active:scale-95"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10"
        >
          {/* Partículas de explosión */}
          {isLiked && (
            <>
              <circle
                cx="12"
                cy="6"
                r="1.5"
                fill="#ef4444"
                className="animate-ping"
                style={{ animationDuration: '0.6s' }}
              />
              <circle
                cx="18"
                cy="10"
                r="1"
                fill="#f87171"
                className="animate-ping"
                style={{ animationDuration: '0.7s', animationDelay: '0.1s' }}
              />
              <circle
                cx="6"
                cy="10"
                r="1"
                fill="#f87171"
                className="animate-ping"
                style={{ animationDuration: '0.7s', animationDelay: '0.1s' }}
              />
              <circle
                cx="19"
                cy="14"
                r="0.8"
                fill="#fca5a5"
                className="animate-ping"
                style={{ animationDuration: '0.8s', animationDelay: '0.2s' }}
              />
              <circle
                cx="5"
                cy="14"
                r="0.8"
                fill="#fca5a5"
                className="animate-ping"
                style={{ animationDuration: '0.8s', animationDelay: '0.2s' }}
              />
            </>
          )}
          
          {/* Corazón principal */}
          <path
            d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
            stroke={isLiked ? "none" : "#6a7282"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill={isLiked ? "#ef4444" : "none"}
            className="transition-all duration-300"
          />
        </svg>

        {/* Círculo de fondo con efecto de onda */}
        {isLiked && (
          <>
            <div className="absolute inset-0 rounded-full bg-red-500 opacity-20 animate-ping" 
                 style={{ animationDuration: '0.6s', animationIterationCount: '1' }} />
            <div className="absolute inset-0 rounded-full bg-red-400 opacity-10 animate-ping" 
                 style={{ animationDuration: '0.8s', animationIterationCount: '1', animationDelay: '0.1s' }} />
          </>
        )}
        
        {/* Efecto hover */}
        <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
      </button>
  );
}