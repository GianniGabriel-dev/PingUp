import passport from "passport";
import dotenv from "dotenv";
import path from "path";

import {
  Strategy as JwtStrategy,
  ExtractJwt,
} from "passport-jwt";

import { Strategy as GoogleStrategy } from "passport-google-oauth20";

dotenv.config({
  path: path.resolve(
    process.cwd(),
    ".env"
  ),
});

/* ======================
   JWT STRATEGY
====================== */

const jwtOpts = {
  jwtFromRequest:
    ExtractJwt.fromAuthHeaderAsBearerToken(),

  secretOrKey:
    process.env.JWT_SECRET as string,
};

passport.use(
  new JwtStrategy(
    jwtOpts,
    async (
      jwt_payload,
      done
    ) => {
      try {
        return done(
          null,
          jwt_payload
        );
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

/* ======================
   GOOGLE STRATEGY
====================== */

passport.use(
  new GoogleStrategy(
    {
      clientID:
        process.env
          .GOOGLE_CLIENT_ID!,
      clientSecret:
        process.env
          .GOOGLE_CLIENT_SECRET!,
      callbackURL:
        process.env
          .GOOGLE_CALLBACK_URL!,
    },

    async (
      accessToken,
      refreshToken,
      profile,
      done
    ) => {
      try {
        return done(
          null,
          profile
        );
      } catch (error) {
        return done(
          error,
          false
        );
      }
    }
  )
);

export default passport;