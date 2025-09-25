import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUserById = async (id:number) => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
};