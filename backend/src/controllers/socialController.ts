import { Request, Response } from 'express';
import { deleteFollow, followExisting, followUser } from '../services/userServices.js';

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
