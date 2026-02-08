import { Strategy, ExtractJwt } from "passport-jwt";
import passport from "passport";
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
      return done(null, jwt_payload);
    } catch (err) {
      return done(err, false);
    }
  })
);

export default passport;