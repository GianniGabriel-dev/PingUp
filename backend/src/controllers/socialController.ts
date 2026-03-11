import { Request, Response } from "express";
import { toggleFollow } from "../services/likeAndFollowServices.js";
import { getNotification } from "../queries/notificationsService.js";

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

export const showNotifications = async (req: Request, res: Response) => {
  try {
    const userId = (req.user as { id: number }).id;

    const result = await getNotification(userId)
    return res.json(result);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};