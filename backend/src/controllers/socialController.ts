import { Request, Response } from 'express';
import { deleteFollow, followExisting, followUser } from '../services/userServices.js';
import { validationResult } from 'express-validator';
import { createComment } from '../queries/postQueries.js';

export const follow= async(req:Request, res:Response)=> {
  //user id sería el follower id, el usuario que decida seguir a alguien
  const userId = (req.user as {id:number}).id
  //following id es la persona a la cual decide seguir el follower
  const followingId= Number(req.params.followingId)
  const existing= await followExisting(userId, followingId)
  try{
    if(existing){
      await deleteFollow(userId, followingId)
      return res.json({msg: "follow quitado"})
    }else{
      await followUser(userId, followingId)
      return res.json({msg: "follow dado"})
    }
  }catch(error:any){
    return res.status(500).json({ error: error.message });
  }
}
//controller para crear comentario
export const comment= async(req:Request, res:Response)=>{
    const errors = validationResult(req)
    const userId= (req.user as {id:number}).id
    const postId=Number(req.params.post_id)
     const {content, parent_comment_id}=req.body
  
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    try {
      await createComment(content,userId, postId, parent_comment_id)
      return res.json({content:content,parent_comment_id:parent_comment_id})
    }catch(error:any){
      return res.status(500).json({ error: error.message });
    }
}