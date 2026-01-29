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