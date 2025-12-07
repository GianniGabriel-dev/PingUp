import { Request, Response } from "express";
import { getUserById } from "../queries/userQueries.js";
export const getUserData = async (req: Request, res: Response) => {
  try {
    const userId = (req.user as { id: number }).id;

    const result = await getUserById(userId)
    return res.json(result);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};