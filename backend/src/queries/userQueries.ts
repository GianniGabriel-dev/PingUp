import { PrismaClient } from "@prisma/client"

const prisma= new PrismaClient()

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
        created_at:true
    }
  });
};


export const updateAvatar = async(user_id:number, avatar_url:string )=>{
  return await prisma.user.update({
    where:{id: user_id},
    data:{avatar_url}
  })
}
