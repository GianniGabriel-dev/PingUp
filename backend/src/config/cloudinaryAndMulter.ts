import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

// Se almacena el archivo en la memoria (req.buffer)
const storage = multer.memoryStorage();
export const upload = multer({ storage,
  limits:{fileSize:5*1024*1024}
 });

//conexión con cloudinary
cloudinary.config({
cloudinary_url: process.env.CLOUDINARY_URL,
  secure: true,
});

// Convierte el upload stream de Cloudinary en una Promesa
export const uploadToCloudinary = (buffer: Buffer, folder: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
     // Callback estándar de Node.js: (error, result)
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
    
    stream.end(buffer);//se envía el buffer al stream que a su vez se lo envia a cloudinary
  });
};


export default cloudinary;