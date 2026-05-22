import { Request, Response } from "express";
import {
  getPostsByUser,
  getRepliesByUser,
  getUserByParam, 
  updateUserData,
} from "../queries/userQueries.js";
import { uploadToCloudinary } from "../config/cloudinaryAndMulter.js";

//controlador que obtiene los datos del usuario autenticado
export const getUserData = async (req: Request, res: Response) => {
  try {
    const userId = (req.user as { id: number }).id;

    const result = await getUserByParam(userId);
    return res.json(result);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

//controlador que obtiene los datos de un usuario a partir de su username, se usa para mostrar el perfil de un usuario a partir de su username
export const getUserByUsername = async (req: Request, res: Response) => {
  try {
    const username = req.params.username;
    const currentUserId = (req.user as { id: number })?.id;

    const result = await getUserByParam(username, currentUserId);
    console.log(result);
    return res.json(result);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req.user as { id: number }).id;
    const { name, bio} = req.body;
 
    const avatarFile = (req.files as any)?.avatar?.[0];
    const bannerFile = (req.files as any)?.banner?.[0];

    // Inicializa el objeto que se enviará a Prisma
    const data: { name?: string; bio?:string; avatar_url?: string; banner_url?: string } = {};

    // Validación de name
    if (name !== undefined) {
      if (name.trim().length > 30) {
        return res.status(400).json({ error: "Name is too long" });
      }
      data.name = name.trim();
    }

    // Validación de biografía
    if (bio !== undefined) {
      if (bio.trim().length > 280) {
        return res.status(400).json({ error: "Bio is too long" });
      }
      data.bio = bio.trim();
    }

    // Si hay un avatar, se sube a Cloudinary y agrega la URL al objeto data
    if (avatarFile) {
      const result = await uploadToCloudinary(avatarFile.buffer, "avatars");
      data.avatar_url = result.secure_url;
    }

    // Si hay un banner, se sube a Cloudinary y agrega la URL al objeto data
    if (bannerFile) {
      const result = await uploadToCloudinary(bannerFile.buffer, "banners");
      data.banner_url = result.secure_url;
    }

    const updatedUser = await updateUserData(userId, data);
    return res.json(updatedUser);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateLanguagePreference = async (req: Request, res: Response) => {
  try {
    const userId = (req.user as { id: number }).id;
    const language = req.body.language || (req.query.language as string);

    if (!language || language.trim().length === 0) {
      return res.status(400).json({ error: "Language is required" });
    }

    // Validate language code format (ISO 639-1: 2-5 chars, alphanumeric with optional hyphen)
    if (!/^[a-z]{2}(-[a-z]{2})?$/i.test(language)) {
      return res.status(400).json({ error: "Invalid language code format" });
    }

    const updatedUser = await updateUserData(userId, { language: language.toLowerCase() });

    return res.status(200).json({
      message: "Language preference updated successfully",
      user: {
        id: updatedUser.id,
        language: updatedUser.language,
      },
    });
  } catch (error: any) {
    console.error(error.message);
    return res.status(500).json({ error: "Error updating language preference" });
  }
};

export const getPostsUser = (type: 'posts' | 'replies') => 
  async (req: Request, res: Response) => {
    try {
      const MAX_LIMIT = 20;
      const currentUserId = (req.user as { id: number })?.id;
      const username = req.params.username;

      let cursor = req.query.cursor
        ? JSON.parse(req.query.cursor as string)
        : undefined;
      console.log(cursor);
      let limit = parseInt(req.query.limit as string) || MAX_LIMIT;
      if (limit > MAX_LIMIT || limit < 1) limit = MAX_LIMIT;

      if (type === 'replies') {
        const posts = await getRepliesByUser(username, limit, cursor, currentUserId);

        if (!posts) {
          return res.status(404).json({ error: "Posts not found" });
        }
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
      }

      const posts = await getPostsByUser(username, limit, cursor, currentUserId);
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
