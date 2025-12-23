import { NextFunction, Request, Response } from "express";
import passport from "passport";
interface JwtUser {
  id: number;
  username?: string;
}

export const optionalAuth = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    "jwt",
    { session: false },
    (err: unknown, user: JwtUser | false) => {
      if (err) return next(err);
      if (user) req.user = user; // solo si hay usuario
      next(); // siempre continua
    }
  )(req, res, next);
};