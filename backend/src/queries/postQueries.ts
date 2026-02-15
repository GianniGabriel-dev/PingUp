import { basePostInclude, cursorFilter} from "./helpers/postsHelpers.js";
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
  cursor?: { createdAt: string; id: number },
  currentUserId?: number,
) => {
  return prisma.post.findMany({
    take: limit,
    where: {
      parent_post_id: null,
      //se construye el objeto where desde dentro con el spread operator e inyecta propiedades si hay cursor
      ...(cursor ? { AND: [cursorFilter(cursor)!] } : {}),
    },
    // datos necesarios para renderizar los posts en la feed
    include: basePostInclude(currentUserId),
    orderBy: [{ created_at: "desc" }, { id: "desc" }],
  });
};

export const getDetailsOfPost = async (
  postId: number,
  limit: number,
  cursor?: { createdAt: string; id: number },
  currentUserId?: number,
) => {
  return prisma.post.findUnique({
    where: { id: postId },
    //se incluye el post principal y sus comentarios, con la información del usuario, los likes y el número de likes y comentarios
    include: {
      ...basePostInclude(currentUserId),

      replies: {
        take: limit,
        where: cursorFilter(cursor),
        orderBy: [{ created_at: "desc" }, { id: "desc" }],
        include: basePostInclude(currentUserId),
      },
    },
  });
};
