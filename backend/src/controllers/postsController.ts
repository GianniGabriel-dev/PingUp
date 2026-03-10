import { validationResult } from "express-validator";
import { Request, Response } from "express";
import { analyzeSentiment, getSentimentLabel } from "../services/nlpService.js";
import { translatePostContent } from "../services/translationService.js";
import {
  createPost,
  getAllPosts,
  getDetailsOfPost,
} from "../queries/postQueries.js";
import { uploadToCloudinary } from "../config/cloudinaryAndMulter.js";
import { toggleLike } from "../services/likeAndFollowServices.js";
import { Post } from "@prisma/client";

export const newPost = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { content, parent_post_id } = req.body;
    //se establece parent_id como null, si luego se ve que parent_id tiene un valor, se pasa el string a num y se guarda en la bd
    let parent_id: number | null = null;

    if (parent_post_id && !isNaN(Number(parent_post_id))) {
      parent_id = Number(parent_post_id);
    }

    console.log(`Content: ${content}, ID del post padre: ${parent_post_id}`);
    let post: Post | null = null;

    //upload a cloudinary y obtencion de la url si se ha subido u narchivo
    const media_url = req.file ? (await uploadToCloudinary(req.file.buffer, "media"))?.secure_url ?? null : null;
    console.log("URL de media:", media_url);

    //si el contenido de post y el media_url son nulos, se devuelve un error, ya que no se puede crear un post sin contenido ni media
    if (!content && !media_url) {
      return res
        .status(400)
        .json({ error: "El post debe tener contenido o media" });
    }
    //el user id es obtenido desde el post route gracias a la autenticacion de passport que devuelve el id del actual usuario
    const userId = (req.user as { id: number }).id;

    let sentimentLabel: string | null = null;
    let sentimentScoreValue: number | null = null;
    let sentimentLanguage: string | null = null;

    //Si el contenido del post no es nulo, se analiza su sentimiento
    if (content) {
      const sentimentScore = await analyzeSentiment(content);
      sentimentLabel = getSentimentLabel(
        sentimentScore.score,
        sentimentScore.magnitude,
      );
      sentimentScoreValue = sentimentScore.score;
      sentimentLanguage = sentimentScore.language;
    }

    post = await createPost(
      userId,
      content?.trim() ?? null,
      sentimentLabel,
      sentimentScoreValue,
      sentimentLanguage,
      parent_id,
      media_url,
    );

    return res.status(200).json(post);
  } catch (error: any) {
    console.error(error.message);
    return res.status(500).json({ error: "Error creating users" });
  }
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    const MAX_LIMIT = 20;
    //currentUserId se usa para comprobar a que posts el usuario ha dado like, puede ser undefined si el usuario no está autenticado
    const userId = (req.user as { id: number })?.id;
    const postId = Number(req.params.post_id);

    let cursor = req.query.cursor
      ? JSON.parse(req.query.cursor as string)
      : undefined;
    console.log(cursor);
    //si el limit no es proporcionado por el usuario, se usa el máximo por defecto
    let limit = parseInt(req.query.limit as string) || MAX_LIMIT;
    // Forzar límites si el usuario intenta excederlos
    if (limit > MAX_LIMIT || limit < 1) limit = MAX_LIMIT;

    //si se da el post id significa que se quieren obtener los detalles de un post, es decir, el post principal y sus comentarios
    if (postId) {
      const posts = await getDetailsOfPost(postId, limit, cursor, userId);

      // Validar que el post existe
      if (!posts) {
        return res.status(404).json({ error: "Post not found" });
      }
      //el siguente cirsor es un objeto con la fecha de creacion y el id del ultimo post obtenido
      const nextCursor =
        posts.replies.length > 0
          ? {
              createdAt:
                posts.replies[
                  posts.replies.length - 1
                ].created_at.toISOString(),
              id: posts.replies[posts.replies.length - 1].id,
            }
          : null;
      return res.status(200).json({
        posts,
        nextCursor,
        //normalmente si la cantidad de posts obtenidos es menor que el limite, significa que no hay mas posts que obtener
        hasMore: posts.replies.length === limit,
      });
    }
    const posts = await getAllPosts(limit, cursor, userId);
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

export const like = async (req: Request, res: Response) => {
  try {
    const userId = (req.user as { id: number }).id;
    const post_id = Number(req.params.post_id);
    const result = await toggleLike(userId, post_id);
    return res.json(result);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const translatePost = async (req: Request, res: Response) => {
  try {
    const post_id = Number(req.params.post_id);
    //se obtiene el idioma del usuario a través del endpoint query
    const target = req.query.target as string;
    if (!target)
      return res.status(400).json({ error: "Idioma objetivo no especificado" });

    const translation = await translatePostContent(post_id, target);

    res.json({ translation });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
