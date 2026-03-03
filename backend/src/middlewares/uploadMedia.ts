import multer from "multer";
import { upload } from "../config/cloudinaryAndMulter.js";
import { NextFunction, Request, Response } from "express";

//el file se guarde en req
export const uploadMedia=(fileName:string)=>{
    return (req:Request, res:Response, next:NextFunction)=>{
      upload.single(fileName)(req, res, (err) => {
        //se muestra un error controlado si se ha enviado mas de un archivo a multer
        if (err) {
          let message=""
            if(err instanceof multer.MulterError && err.code === "LIMIT_UNEXPECTED_FILE"){
              //si filename es avatar muestra el mensaje de que solo se puede subir una iamgen, si no muestra el otro mensaje que es para posts y
              message = fileName === "avatar"
              ? "Solo puedes subir una imagen."
              : "Solo puedes subir una imagen o vídeo.";
            }else{
                err.message
            }
    
          return res.status(400).json({ error: message });
        }
        next();
      });
    }
}


//el file se guarde en req
export const uploadAvatarAndBanner=(req: Request, res: Response, next: NextFunction)=>{
      upload.fields([
        {name:"avatar", maxCount:1},
        {name:"banner", maxCount:1}
      ])(req, res, (err) => {
        //se muestra un error controlado si se ha enviado mas de un archivo a multer
        if (err) {
          return res.status(400).json({ 
            error: err.message || "Error uploading files" 
          });
        }
        next();
      });
}
