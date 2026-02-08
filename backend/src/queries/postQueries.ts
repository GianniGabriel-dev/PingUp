import { prisma } from "./prisma.js";

export const createPost = async (
  user_id: number,
  content: string,
  sentiment: string,
  sentiment_score: number,
  language: string,
  parent_post_id?: number | null,
  media_url?: string | null,
) => {
  return prisma.post.create({
    data: {
      user_id,
      content,
      sentiment,
      sentiment_score,
      language,
      parent_post_id,
      media_url,
    },
  });
};

//funcion que devuelve todos los posts, se usa solo para la vista de admin para implemetar paginacion al mostarr posts
export const getAllPostsAdmin = async (limit: number, skip: number) => {
  return await prisma.post.findMany({
    //skip es una función de prisma equivalente al offset, este se salta los resultados anteriores para crear paginación
    skip,
    //take coge cuantos posts mostrar por pagina
    take: limit,
    //join para incluir username y avatar en la consulta
    include: {
      user: { select: { username: true, avatar_url: true } },
      _count: { select: { likes: true } },
    },
    orderBy: { created_at: "desc" },
  });
};

export const getAllPosts = async (
  limit: number,
  //El cursor esta formado por la fecha del ultimo post mas su id
  cursor?: { createdAt: string; id: number },
  currentUserId?: number,
) => {
  return await prisma.post.findMany({
    take: limit,
    //condicion where que solo se cumple si el cursor existe, si no existe devuelve undefined
    where: cursor
      ? {
          AND: [
            { parent_post_id: null }, //solo se devuelven los posts principales, no los comentarios
            {
              OR: [
                //si la fecha de creacion es menor que la del cursor
                { created_at: { lt: new Date(cursor.createdAt) } },
                //si la fecha de creacion es igual a la del cursor, se compara el id para evitar duplicados
                {
                  created_at: new Date(cursor.createdAt),
                  id: { lt: cursor.id },
                },
              ],
            },
          ],
        }
      : { parent_post_id: null }, //si no hay cursor, igualmente se devulven solo los posts principales, no los comentarios
    include: {
      user: { select: { username: true, avatar_url: true, name: true } },
      _count: { 
        select: {
         likes: true, 
         replies: true
        }
       },

      likes: currentUserId
        ? {
            where: { user_id: currentUserId },
            select: { id: true },
            take: 1,
          }
        : false,
    },
    orderBy: [{ created_at: "desc" }, { id: "desc" }],
  });
};

export const getDetailsOfPost = async (
  postId: number,
  limit: number,
  cursor?: { createdAt: string; id: number },
  currentUserId?: number,
) => {
  return await prisma.post.findUnique({
    where: { id: postId },
    include: {
      user: { select: { username: true, avatar_url: true, name: true } },

      replies: {
        take: limit,
        where: cursor
          ? {
              OR: [
                { created_at: { lt: new Date(cursor.createdAt) } },
                {
                  created_at: new Date(cursor.createdAt),
                  id: { lt: cursor.id },
                },
              ],
            }
          : undefined,
        orderBy: [{ created_at: "desc" }, { id: "desc" }],
        include: {
          user: { select: { username: true, avatar_url: true, name: true } },
          _count: { select: { likes: true } },
          likes: currentUserId
            ? {
                where: { user_id: currentUserId },
                select: { id: true },
                take: 1,
              }
            : false,
        },
      },

      _count: { select: { likes: true, replies:true } },
      likes: currentUserId
        ? {
            where: { user_id: currentUserId },
            select: { id: true },
            take: 1,
          }
        : false,
    },
  });
};
