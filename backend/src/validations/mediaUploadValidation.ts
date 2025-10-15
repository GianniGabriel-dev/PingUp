import { Request, Response, NextFunction } from "express";

const ALLOWED_AVATAR_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_AVATAR_SIZE = 5 * 1024 * 1024; // 5MB

const ALLOWED_POST_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "video/mp4",
  "video/webm",
];
const MAX_POST_SIZE = 20 * 1024 * 1024; // 20MB

export const validateAvatarImg = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Verifica si existe el archivo
  if (!req.file) {
    return res.status(400).json({ error: "No se envió ningún archivo" });
  }

  // Verifica el formato
  if (!ALLOWED_AVATAR_TYPES.includes(req.file.mimetype)) {
    //mimetype es una propiedad de multer que identifica el tipo de formato que tiene un archivo
    return res.status(400).json({
      error: "Formato no permitido. Use JPEG, PNG o WebP",
    });
  }

  // Verifica el tamaño por si la restricción de multer falla
  if (req.file.size > MAX_AVATAR_SIZE) {
    return res.status(400).json({
      error: "Archivo demasiado grande. Máximo 5MB",
    });
  }
  //si no hay errores se pasa a la siguente funcion
  next();
};

export const validatePostMedia = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.file) {
    // Verifica el formato
    if (!ALLOWED_POST_TYPES.includes(req.file.mimetype)) {
      //mimetype es una propiedad de multer que identifica el tipo de formato que tiene un archivo
      return res.status(400).json({
        error: "Formato no permitido. Use JPEG, PNG , WebP, MP4 o Webm",
      });
    }

    // Verifica el tamaño por si la restricción de multer falla
    if (req.file.size > MAX_POST_SIZE) {
      return res.status(400).json({
        error: "Archivo demasiado grande. Máximo 20MB",
      });
    }
  }
  //si no hay errores se pasa a la siguente funcion
  next();
  
};
