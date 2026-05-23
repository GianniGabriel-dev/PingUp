import rateLimit from "express-rate-limit";

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 10,
  message: {
    error: "Too many login attempts. Try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const createPostLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minuto
  max: 15,
  message: {
    error: "Too many posts created. Please wait.",
  },
});

export const commentLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 30,
  message: {
    error: "Too many comments. Please wait.",
  },
});