import { Strategy, ExtractJwt } from "passport-jwt";
import passport from "passport";
import { getUserById } from "../services/userServices";
import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.resolve(process.cwd(), ".env") });


const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  // a las variables de entorno en ts hay que darles el tipo porque no lo infiere al ser string | undefined
  secretOrKey: process.env.JWT_SECRET as string,
};
passport.use(
  new Strategy(opts, async (jwt_payload, done) => {
    try {
      const user = await getUserById(jwt_payload.id);
      if (user) return done(null, user);
      return done(null, false);
    } catch (err) {
      return done(err, false);
    }
  })
);

export default passport;