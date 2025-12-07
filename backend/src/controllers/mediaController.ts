
import { Request, Response } from "express";
import { uploadToCloudinary } from "../config/cloudinaryAndMulter.js";

import { validateAvatarImg} from "../validations/mediaUploadValidation.js";

import { uploadMedia } from "../middlewares/uploadMedia.js";
import { updateAvatar } from "../queries/userQueries.js";

// array de middlewares: procesa archivo → valida → sube a Cloudinary
export const uploadAvatar = [

  uploadMedia("avatar"),

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
