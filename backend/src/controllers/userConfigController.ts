
import { NextFunction, Request, Response } from "express";
import { upload, uploadToCloudinary } from "../config/cloudinaryAndMulter.js";
import { updateAvatar } from "../services/userServices.js";
import { validateAvatarImg } from "../validations/avatarValidation.js";
import multer from "multer";

// array de middlewares: procesa archivo → valida → sube a Cloudinary
export const uploadAvatar = [
 //el file se guarde en req, "avatar" es el nombre que tiene que tener el campo del formualrio
(req:Request, res:Response, next:NextFunction) => {
  upload.single("avatar")(req, res, (err) => {
    //se muestra un error controlado si se ha enviado mas de un archivo a multer
    if (err) {
      const message =
        err instanceof multer.MulterError && err.code === "LIMIT_UNEXPECTED_FILE"
          ? "Solo puedes subir una imagen."
          : err.message;

      return res.status(400).json({ error: message });
    }
    next();
  });
},

  validateAvatarImg, 

  async (req: Request, res: Response) => {
    //usuario autenticado por passport
    const userId = (req.user as {id:number}).id
    try {
      const result = await uploadToCloudinary(req.file!.buffer, "avatars"); //! indida a TS que req.file existe
      //Sube a Cloudinary y actualiza avatar en BD
      await updateAvatar(userId, result.secure_url)
      res.json({
        message: "Archivo subido correctamente",
        url: result.secure_url,
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
];