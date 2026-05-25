import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

import {
  login,
  signUp,
  googleCallback,
} from "../controllers/authController";

import {
  loginValidator,
  signupValidator,
} from "../validations/authFormValidation.js";

import { loginLimiter } from "../middlewares/rateLimit.js";

export const authRouter =
  express.Router();

/* =========================
   EMAIL/PASSWORD AUTH
========================= */

authRouter.post(
  "/signup",
  signupValidator,
  signUp
);

authRouter.post(
  "/login",
  loginLimiter,
  loginValidator,
  login
);

/* =========================
   GOOGLE OAUTH
========================= */

/**
 * Inicia el flujo de autenticación con Google
 * Redirige a la pantalla de login de Google
 */
authRouter.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

/**
 * Callback de Google después de la autenticación
 * Registra o autentica el usuario y redirige al frontend con el token
 */
authRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "http://localhost:5173/login?error=auth_failed",
  }),
  googleCallback
);