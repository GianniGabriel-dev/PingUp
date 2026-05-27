import { Request, Response } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import {
  getUserByEmailOrUsername,
  normalSignUp,
  getOrCreateGoogleUser,
} from "../queries/authServices.js";
import jwt from "jsonwebtoken";

export const signUp = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const errors = validationResult(req);
  // si hay errores, se devuelve un error 400 con los detalles de los errores
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { email, password, username } = req.body;

    const encryptedPassword = await bcrypt.hash(password, 10);
    const newUser = await normalSignUp(email, username, encryptedPassword);
    //payload que será guardado en el token jwt, esta info es accesible por req cada vez que se autentica con passport
    const payload = {
      id: newUser.id,
      username: newUser.username,
    };
    //se firma el token con la clave secreta y se le da una fecha de expiracion
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "7d",
    });
    return res.status(201).json({
      token,
      msg: "new user created",
      id: newUser.id,
      username: newUser.username,
    });
  } catch (error: any) {
    console.error(error.message);
    return res.status(500).json({ error: "Error creating users" });
  }
};

export const login = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  // si hay errores, se devuelve un error 400 con los detalles de los errores
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { identifier, password } = req.body;
    const user = await getUserByEmailOrUsername(identifier);
    //aunque user se valida anteriromente, typscript no lo sabe y crea advertenicas
    if (!user)
      return res.status(401).json({ error: "Usuario o email no encontrado" });

    const match = await bcrypt.compare(password, user?.password || ""); //si se regista con oAuth no tiene password, para evitar error le paso cadena vacía
    if (!match) {
      return res.status(401).json({
        errors: [
          {
            type: "field",
            value: password,
            msg: "Contraseña incorrecta",
            path: "password",
            location: "body",
          },
        ],
      });
    }
    //payload que será guardado en el token jwt, esta info es accesible por req cada vez que se autentica con passport
    const payload = {
      id: user.id,
      username: user.username,
    };
    //se firma el token con la clave secreta y se le da una fecha de expiracion
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "7d",
    });
    return res.status(200).json({
      token,
      message: "login successful",
      user: {
        id: user.id,
        username: user.username,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

//Google OAuth Callback Handler  Autentica o registra el usuario con Google
export const googleCallback = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const profile = req.user as any;

    const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

    if (!profile || !profile.id) {
      console.error("❌ Perfil inválido o sin ID");

      res.redirect(`${FRONTEND_URL}/login?error=invalid_profile`);
      return;
    }

    // Extraer datos de Google
    const googleId = profile.id;
    const email = profile.emails?.[0]?.value;
    const displayName =
      profile.displayName || profile.name?.givenName || "Usuario";

    if (!email) {
      console.error("❌ No hay email en el perfil de Google");

      res.redirect(`${FRONTEND_URL}/login?error=no_email`);
      return;
    }

    // Obtener o crear usuario
    const user = await getOrCreateGoogleUser(googleId, email, displayName);

    if (!user || !user.id) {
      console.error("❌ Usuario no se pudo crear/obtener:", user);

      res.redirect(`${FRONTEND_URL}/login?error=user_creation_failed`);
      return;
    }

    // Generar JWT
    const payload = {
      id: user.id,
      username: user.username,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "7d",
    });

    // Redirigir al frontend con token
    const frontendUrl = `${FRONTEND_URL}/oauth-success?token=${token}`;

    res.redirect(frontendUrl);
  } catch (error: any) {
    console.error("❌ Error en Google OAuth callback:", error);

    console.error("Stack:", error.stack);

    const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

    res.redirect(`${FRONTEND_URL}/login?error=auth_failed`);
  }
};
