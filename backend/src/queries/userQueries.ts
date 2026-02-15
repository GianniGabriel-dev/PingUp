import { basePostInclude, cursorFilter } from "./helpers/postsHelpers.js";
import { prisma } from "./prisma.js"

export const getUserById = async (id:number) => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
    select:{
        id:true,
        username:true,
        email:true,
        googleId:true,
        avatar_url:true,
        bio:true,
        created_at:true,
        name:true,
    }
  });
};


export const updateAvatar = async(user_id:number, avatar_url:string )=>{
  return await prisma.user.update({
    where:{id: user_id},
    data:{avatar_url}
  })
}

export const updateUserData = async(user_id:number, data: { avatar_url?: string; name?: string })=>{
  const { avatar_url, name } = data;
  
  if (avatar_url !== undefined) data.avatar_url = avatar_url;
  if (name !== undefined) data.name = name;
  
  return await prisma.user.update({
    where:{id: user_id},
    data: data
  })
}

export const getPostsByUser = async (
  limit: number,
  userId:number,
  cursor?: { createdAt: string; id: number },
  currentUserId?: number

) => {
  return prisma.post.findMany({
    take: limit,
    where: {
      user_id: userId,
      //se construye el objeto where desde dentro con el spread operator e inyecta propiedades si hay cursor
      ...(cursor ? { AND: [cursorFilter(cursor)!] } : {}),
    },
    // datos necesarios para renderizar los posts en la feed
    include: basePostInclude(currentUserId),
    orderBy: [{ created_at: "desc" }, { id: "desc" }],
  });
};

export const getRepliesByUser = async (
  userId: number,
  limit: number,
  cursor?: { createdAt: string; id: number },
  currentUserId?: number,
) => {
  return prisma.post.findMany({
    where: {
      user_id: userId,
      parent_post_id: { not: null }, // solo replies
      ...cursorFilter(cursor),
    },
    take: limit,
    orderBy: [{ created_at: "desc" }, { id: "desc" }],

    include: {
      ...basePostInclude(currentUserId),

      parent: {
        include: basePostInclude(currentUserId), // post original
      },
    },
  });
};