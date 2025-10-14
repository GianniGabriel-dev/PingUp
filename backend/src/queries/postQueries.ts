import { PrismaClient, ContentType } from "@prisma/client";

const prisma = new PrismaClient();

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

export const createComment=async(
  content:string,
  user_id:number,
  post_id:number,
  parent_comment_id?:number
)=>{
  return prisma.comment.create({
    data:{
      content,
      user_id,
      post_id,
      parent_comment_id
    }
  })
}
