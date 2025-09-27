import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const normalSignUp = async(
    email:string,
    username:string,
     password:string)=>{
    return await prisma.user.create({
        data:{email, username, password}
    })
}

export const getUserByEmailOrUsername = async (identifier:string)=>{
  return await prisma.user.findFirst({
    where:{
      OR:[
        {email: identifier},
        {username: identifier}
      ]
    },select:{
      id:true,
      username:true,
      password:true,
      email:true
    }
  })
}

export const isUsernameOrEmailTaken = async (identifier:string) => {
  const user = await prisma.user.findFirst({
    where:{
      OR:[
        {email: identifier},
        {username: identifier}
      ]
    },select:{id:true} //solo se necesit saber si existe, no hace fala mas datos
  });
  return user != null; // devuelve true si user o email existe y false si no
};

export const isEmailTaken = async (email:string) => {
  const userMail = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return userMail != null; // devuelve true si email existe y false si no
};



