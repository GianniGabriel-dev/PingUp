import { Request, Response } from "express";
import {
  deleteFollow,
  followExisting,
  followUser,
} from "../services/userServices.js";
import { validationResult } from "express-validator";
import { createComment } from "../queries/postQueries.js";
import { analyzeSentiment, getSentimentLabel } from "../services/nlpService.js";
import { uploadToCloudinary } from "../config/cloudinaryAndMulter.js";
import { translateContent } from "../services/translationService.js";

export const follow = async (req: Request, res: Response) => {
  //user id sería el follower id, el usuario que decida seguir a alguien
  const userId = (req.user as { id: number }).id;
  //following id es la persona a la cual decide seguir el follower
  const followingId = Number(req.params.followingId);
  const existing = await followExisting(userId, followingId);
  try {
    if (existing) {
      await deleteFollow(userId, followingId);
      return res.json({ msg: "follow quitado" });
    } else {
      await followUser(userId, followingId);
      return res.json({ msg: "follow dado" });
    }
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
//controller para crear comentario
export const comment = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  const userId = (req.user as { id: number }).id;
  const postId = Number(req.params.post_id);
  const { content, parent_comment_id } = req.body;
  //media_url puede se string o null
  let media_url: string | null = null;

  //upload a cloudinary
  if (req.file) {
    const result = await uploadToCloudinary(req.file.buffer, "media");
    media_url = result.secure_url;
  }
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const sentiment_score = await analyzeSentiment(content);
    const sentimentLabel = getSentimentLabel(sentiment_score.score);
    await createComment(
      content,
      userId,
      postId,
      sentimentLabel,
      sentiment_score.score,
      sentiment_score.language,
      media_url,
      Number(parent_comment_id)
    );
    return res.json({ content: content, parent_comment_id: parent_comment_id });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
export const translateComment = async (req: Request, res: Response) => {
  try {
    const comment_id = Number(req.params.comment_id);
    //se obtiene el idioma del usuario y el parent_comment_id a través del endpoint query
    const target = req.query.target as string;
  
    if (!target)
      return res.status(400).json({ error: "Idioma objetivo no especificado" });

    const translation = await translateContent(comment_id, target, "comment");

    res.json({ translation });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};