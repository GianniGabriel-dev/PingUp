import { Request, Response } from "express";
import {
  getPostsByUser,
  getRepliesByUser,
  getUserById,
  updateUserData,
} from "../queries/userQueries.js";
import { uploadToCloudinary } from "../config/cloudinaryAndMulter.js";
export const getUserData = async (req: Request, res: Response) => {
  try {
    const userId = (req.user as { id: number }).id;

    const result = await getUserById(userId);
    return res.json(result);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req.user as { id: number }).id;
    const { name } = req.body;
    const file = req.file;

    // Inicializa el objeto que se enviará a Prisma
    const data: { name?: string; avatar_url?: string } = {};

    // Validación de name
    if (name) {
      if (name.trim().length > 30) {
        return res
          .status(400)
          .json({ error: "El nombre no puede superar 30 caracteres" });
      }
      data.name = name.trim();
    }
    // Si hay un archivo, súbelo a Cloudinary y agrega la URL al objeto data
    if (file) {
      const result = await uploadToCloudinary(file.buffer, "avatars");
      data.avatar_url = result.secure_url;
    }

    const updatedUser = await updateUserData(userId, data);
    return res.json(updatedUser);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

//controlador que obitiene posts de un usaurio, puede obtener todos sus posts p todas sus respuestas si se el pasa post_id en los parámetoros

export const getPostsUser = (isReply: boolean) => 
  async (req: Request, res: Response) => {
    try {
      const MAX_LIMIT = 20;
      //currentUserId se usa para comprobar a que posts el usuario ha dado like, puede ser undefined si el usuario no está autenticado 
      const currentUserId = (req.user as { id: number })?.id;
      const userId = Number(req.params.user_id);

      let cursor = req.query.cursor
        ? JSON.parse(req.query.cursor as string)
        : undefined;
      console.log(cursor);
      //si el limit no es proporcionado por el usuario, se usa el máximo por defecto
      let limit = parseInt(req.query.limit as string) || MAX_LIMIT;
      // Forzar límites si el usuario intenta excederlos
      if (limit > MAX_LIMIT || limit < 1) limit = MAX_LIMIT;

      //si es isReply es true significa se obtienen respuetas del usuario
      if (isReply) {
        const posts = await getRepliesByUser(userId, limit, cursor, currentUserId);

        if (!posts) {
          return res.status(404).json({ error: "Posts not found" });
        }
        //el siguente cirsor es un objeto con la fecha de creacion y el id del ultimo post obtenido
        const nextCursor =
          posts.length > 0
            ? {
                createdAt: posts[posts.length - 1].created_at.toISOString(),
                id: posts[posts.length - 1].id,
              }
            : null;
        return res.status(200).json({
          posts,
          nextCursor,
          //normalmente si la cantidad de posts obtenidos es menor que el limite, significa que no hay mas posts que obtener
          hasMore: posts.length === limit,
        });
      }
      const posts = await getPostsByUser(limit, userId, cursor, currentUserId);
      const nextCursor =
        posts.length > 0
          ? {
              createdAt: posts[posts.length - 1].created_at.toISOString(),
              id: posts[posts.length - 1].id,
            }
          : null;
      return res.status(200).json({
        posts,
        nextCursor,
        hasMore: posts.length === limit,
      });
    } catch (error: any) {
      console.error(error.message);
      return res.status(500).json({ error: "Error getting posts" });
    }
  };

