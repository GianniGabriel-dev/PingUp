import { useEffect, useRef, useState } from "react";
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  Maximize,
  Minimize,
} from "lucide-react";

interface VideoPostProps {
  src: string;
}

export default function VideoPost({
  src,
}: VideoPostProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hideControlsTimeoutRef = useRef<NodeJS.Timeout>();
  const scrollPositionRef = useRef(0);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const formatTime = (time: number): string => {
    if (!time || isNaN(time)) return "0:00";
    const hours = Math.floor(time / 3600);
    const mins = Math.floor((time % 3600) / 60);
    const secs = Math.floor(time % 60);
    
    if (hours > 0) {
      return `${hours}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleShowControls = () => {
    setShowControls(true);
    if (hideControlsTimeoutRef.current) {
      clearTimeout(hideControlsTimeoutRef.current);
    }
    hideControlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  const togglePlay = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    const newTime = parseFloat(e.target.value);
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!document.fullscreenElement) {
      // Guardamos la posición actual del scroll
      scrollPositionRef.current = window.scrollY;
      
      // Prevenimos scroll mientras se entra en fullscreen
      document.body.style.overflow = "hidden";
      
      containerRef.current?.requestFullscreen().catch(() => {
        document.body.style.overflow = "";
        setIsFullscreen(true);
      });
      setIsFullscreen(true);
    } else {
      // Restauramos el overflow
      document.body.style.overflow = "";
      
      // Restauramos la posición del scroll
      setTimeout(() => {
        window.scrollTo(0, scrollPositionRef.current);
      }, 0);
      
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        document.body.style.overflow = "";
        setTimeout(() => {
          window.scrollTo(0, scrollPositionRef.current);
        }, 0);
        setIsFullscreen(false);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      if (hideControlsTimeoutRef.current) {
        clearTimeout(hideControlsTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative select-none mt-3 overflow-hidden rounded-2xl border border-gray-600 bg-black cursor-pointer group ${
        isFullscreen 
          ? "fixed inset-0 z-50 rounded-none border-0 w-screen h-screen" 
          : "max-w-full"
      }`}
      onMouseMove={handleShowControls}
      onMouseLeave={() => !isPlaying && setShowControls(false)}
      onClick={(e) => {
        e.stopPropagation();
        togglePlay();
      }}
    >
      <video
        ref={videoRef}
        src={src}
        muted={isMuted}
        preload="metadata"
        playsInline
        className={`${
          isFullscreen
            ? "w-full h-full object-contain"
            : "w-full h-auto object-cover"
        }`}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
      />

      {/* Overlay Play Button */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <div className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all p-4">
            <Play size={48} fill="white" className="text-white" />
          </div>
        </div>
      )}

      {/* Controls Container */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 transition-opacity duration-200 ${
          showControls || !isPlaying ? "opacity-100" : "opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Progress Bar */}
        <input
          type="range"
          min="0"
          max={duration || 0}
          step="0.1"
          value={currentTime}
          onChange={handleSeek}
          className="mb-2 w-full h-1 cursor-pointer accent-red-600 appearance-none bg-gray-600 rounded [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:cursor-pointer hover:bg-gray-500"
        />

        {/* Control Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Play/Pause Button */}
            <button
              onClick={(e) => togglePlay(e)}
              className="text-white hover:opacity-80 transition-opacity p-1"
              title={isPlaying ? "Pausar" : "Reproducir"}
            >
              {isPlaying ? (
                <Pause size={20} fill="white" />
              ) : (
                <Play size={20} fill="white" />
              )}
            </button>

            {/* Mute Button */}
            <button
              onClick={toggleMute}
              className="text-white hover:opacity-80 transition-opacity p-1"
              title={isMuted ? "Activar sonido" : "Silenciar"}
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>

            {/* Time Display */}
            <span className="text-white text-xs font-medium whitespace-nowrap">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          {/* Fullscreen Button */}
          <button
            onClick={handleFullscreen}
            className="text-white hover:opacity-80 transition-opacity p-1"
            title={isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
          >
            {isFullscreen ? (
              <Minimize size={20} />
            ) : (
              <Maximize size={20} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}