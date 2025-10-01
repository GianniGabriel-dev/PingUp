import { validationResult } from "express-validator";
import { Request, Response } from 'express';
import { createPost, deleteLike, getAllPosts, like, likeExisting} from "../services/userServices.js";

export const newPost = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  try {
    const {content, image_url}=req.body
    //el user id es obtenido desde el post route gracias a la autenticacion de passport que devuelve el id del actual usuario
    const userId = (req.user as {id:number}).id
    const post =await  createPost(userId, content, image_url)
    return res.status(200).json(post)

  } catch (error:any) {
    console.error(error.message)
    return res.status(500).json({ error: 'Error creating users' });
  }
};

export const getPosts= async(req:Request, res:Response)=>{
  try{
    const posts= await getAllPosts()
    console.log(posts[0].user.username)
    console.log(posts[0].content)
     console.log (req.user)
    return res.status(200).json(posts)
    

  }catch(error:any){
    console.error(error.message)
    return res.status(500).json({ error: 'Error getting posts' });
  }

}

export const likePost= async(req:Request, res:Response)=> {
  const userId = (req.user as {id:number}).id
  const post_id= Number(req.params.post_id)
  const existing= await likeExisting(userId, post_id)
  try{
    if(existing){
      await deleteLike(userId, post_id)
      return res.json({msg: "like quitado"})
    }else{
      await like(userId, post_id)
      return res.json({msg: "like dado"})
    }
  }catch(error:any){
    return res.status(500).json({ error: error.message });
  }
 
}