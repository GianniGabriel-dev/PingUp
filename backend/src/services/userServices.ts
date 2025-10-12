import { PrismaClient, ContentType } from "@prisma/client";

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
  sentiment: string,
  sentiment_score: number,
  language:string,
  imageUrl?: string,
  
  
) => {
  return prisma.post.create({
    data: {
      user_id,
      content,
      sentiment,
      sentiment_score,
      image_url: imageUrl,
      language
    }
  });
};

export const getAllPosts = async (limit:number, skip:number)=>{
  return await prisma.post.findMany({
    //skip es una función de prisma equivalente al offset, este se salta los resultados anteriores para crear paginación
    skip,
    //take coge cuantos posts mostrar por pagina
    take:limit,
    //join para incluir username y avatar en la consulta
    include:{
      user: {select:{username:true, avatar_url:true}},
      _count: {select:{likes: true}}
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
  });
  return existing != null //si existe es true si no false
 } 
