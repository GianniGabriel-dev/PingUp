import { basePostInclude, cursorFilter } from "./helpers/postsHelpers.js";
import { prisma } from "./prisma.js"

export const getUserByParam = async (param:number | string, currentUserId?: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id: typeof param === "number" ? param : undefined,
      username: typeof param === "string" ? param : undefined
    },
    select:{
        id:true,
        username:true,
        email:true,
        googleId:true,
        avatar_url:true,
        banner_url:true,
        bio:true,
        created_at:true,
        language:true,
        name:true,
        //si currentUserId existe, se incluye la relación followers para comprobar si el usuario actual sigue al usuario consultado, si no existe currentUserId se omite la relación para optimizar la consulta
        following: currentUserId
        ? {
            where: { follower_id: currentUserId },
            select: { id: true }
          }
        : false
    }
  });
  return{
    ...user,
    isFollowing: !!user?.following?.length
  }
};

export const updateAvatar = async(user_id:number, avatar_url:string )=>{
  return await prisma.user.update({
    where:{id: user_id},
    data:{avatar_url}
  })
}


export const getPostsByUser = async (
  username: string,
  limit: number,
  cursor?: { createdAt: string; id: number },
  currentUserId?: number

) => {
  return prisma.post.findMany({
    take: limit,
    where: {
      user: { username },
      parent_post_id: null, // solo posts originales
      //se construye el objeto where desde dentro con el spread operator e inyecta propiedades si hay cursor
      ...(cursor ? { AND: [cursorFilter(cursor)!] } : {}),
    },
    // datos necesarios para renderizar los posts en la feed
    include: basePostInclude(currentUserId),
    orderBy: [{ created_at: "desc" }, { id: "desc" }],
  });
};

export const updateUserData = async(user_id:number, data: { name?: string; bio?:string; avatar_url?: string; banner_url?: string })=>{
  const { name, bio, avatar_url, banner_url } = data;
  
  if (name !== undefined) data.name = name;
  if (bio !== undefined) data.bio = bio;
  if (avatar_url !== undefined) data.avatar_url = avatar_url;
  if (banner_url !== undefined) data.banner_url = banner_url;

  return await prisma.user.update({
    where:{id: user_id},
    data: data
  })
}

export const getRepliesByUser = async (
  username: string,
  limit: number,
  cursor?: { createdAt: string; id: number },
  currentUserId?: number,
) => {
  return prisma.post.findMany({
    where: {
      user: { username },
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