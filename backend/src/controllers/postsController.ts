import { validationResult } from "express-validator";
import { Request, Response } from 'express';
import { createPost } from "../services/userServices.js";

export const newPost = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  try {
    const {content, image_url}=req.body
    //el user id es obtenido dese el post route gracias a la autenticasion de passport que devuelve el id del actual usuario
    const userId = (req.user as {id:number}).id
    const post =await  createPost(userId, content, image_url)
    return res.status(200).json(post)

  } catch (error:any) {
    console.error(error.message)
    return res.status(500).json({ error: 'Error creating users' });
  }
};