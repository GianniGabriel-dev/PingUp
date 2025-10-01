import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUserById = async (id:number) => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
};

export const createPost = async (
  user_id: number,
  content: string,
  imageUrl?: string
) => {
  return prisma.post.create({
    data: {
      user_id,
      content,
      image_url: imageUrl
    }
  });
};

export const getAllPosts = async ()=>{
  return await prisma.post.findMany({
    //join para incluir username y avatar en la consulta
    include:{
      user: {select:{username:true, avatar_url:true}}
    },
    orderBy: {created_at:"desc"}
  })
}

export const updateAvatar = async(user_id:number, avatar_url:string )=>{
  return await prisma.user.update({
    where:{id: user_id},
    data:{avatar_url}
  })
}

export const like = async(user_id:number,post_id:number )=>{
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
 });
 return existing != null // si existe no es null, devuelve true, si no false
} 

