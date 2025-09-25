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

export const isUsernameTaken = async (username:string) => {
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });
  return user != null; // devuelve true si user existe y false si no
};

export const isEmailTaken = async (email:string) => {
  const userMail = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return userMail != null; // devuelve true si email existe y false si no
};



