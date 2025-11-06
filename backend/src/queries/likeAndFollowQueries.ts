import { PrismaClient } from "@prisma/client"

const prisma= new PrismaClient()
export const likePost = async(user_id:number,post_id:number )=>{
    return await prisma.like.create({
      data:{user_id, post_id}
    })
  }
  
  export const deleteLike = async(user_id:number,post_id:number )=>{
    return await prisma.like.delete({
      //delete del like donde el user_id y el post_id sean iguales a los datos a recibir
      where:{user_id_post_id:{
        user_id,
        post_id,
      }
  }})
  }
  
  //se comprueba si hay likes para que si se pulsa otra vez quitar el like
  export const likeExisting= async(user_id:number, post_id:number)=>{
   const existing =await prisma.like.findUnique({
     where: { user_id_post_id: { user_id, post_id } },
     select: { id: true } 
   });
   return existing != null // si existe es true si no false
  } 
  
  export const followUser = async(follower_id:number, following_id:number )=>{
    return await prisma.follow.create({
      data:{follower_id, following_id}
    })
  }
  
  export const deleteFollow = async(follower_id:number, following_id:number)=>{
    return await prisma.follow.delete({
      where:{ follower_id_following_id: { follower_id, following_id }
  }})
  }
  export const followExisting= async(follower_id:number, following_id:number)=>{
    const existing =await prisma.follow.findUnique({
      where: { follower_id_following_id: { follower_id, following_id } },
      select: { id: true },
    });
    return existing != null //si existe es true si no false
   } 