import { Request, Response } from "express";
import { toggleFollow } from "../services/likeAndFollowServices.js";

export const follow = async (req: Request, res: Response) => {
  try {
    //user id sería el follower id, el usuario que decida seguir a alguien
    const userId = (req.user as { id: number }).id;
    //following id es la persona a la cual decide seguir el follower
    const followingId = Number(req.params.followingId);
    const result = await toggleFollow(userId, followingId);
    return res.json(result);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
