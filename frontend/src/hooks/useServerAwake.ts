import { useEffect, useState } from "react";

const WAKE_THRESHOLD_MS = 2000;
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

let cachedAwake: boolean | null = null;

export function useServerAwake() {
  const [isAwake, setIsAwake] = useState<boolean | null>(cachedAwake);

  useEffect(() => {
    if (cachedAwake !== null) return;

    const timer = setTimeout(() => {
      setIsAwake(false);
    }, WAKE_THRESHOLD_MS);

    fetch(`${API_URL}/health`, { method: "GET" })
      .then(() => {
        cachedAwake = true;
        clearTimeout(timer);
        setIsAwake(true);
      })
      .catch(() => {
        // server responded with an error — it's awake, just erroring
        cachedAwake = true;
        clearTimeout(timer);
        setIsAwake(true);
      });

    return () => clearTimeout(timer);
  }, []);

  return isAwake;
}
