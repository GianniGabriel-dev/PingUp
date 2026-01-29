import { Request, Response } from "express";
import { getUserById, updateUserData} from "../queries/userQueries.js";
import { uploadToCloudinary } from "../config/cloudinaryAndMulter.js";
export const getUserData = async (req: Request, res: Response) => {
  try {
    const userId = (req.user as { id: number }).id;

    const result = await getUserById(userId)
    return res.json(result);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateProfile= async (req:Request, res:Response)=>{
  try{
    const userId = (req.user as { id: number }).id;
    const { name } = req.body;
    const file = req.file

    // Inicializa el objeto que se enviará a Prisma
    const data: { name?: string; avatar_url?: string } = {};

    // Validación de name
    if (name) {
      if (name.trim().length > 30) {
        return res.status(400).json({ error: "El nombre no puede superar 30 caracteres" });
      }
      data.name = name.trim();
    }
    // Si hay un archivo, súbelo a Cloudinary y agrega la URL al objeto data
    if (file) {
      const result = await uploadToCloudinary(file.buffer, "avatars");
      data.avatar_url = result.secure_url;
    }

    const updatedUser = await updateUserData(userId, data);
    return res.json(updatedUser)

  }catch(error:any){
    return res.status(500).json({ error: error.message });
  }
}