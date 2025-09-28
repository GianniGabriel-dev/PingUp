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