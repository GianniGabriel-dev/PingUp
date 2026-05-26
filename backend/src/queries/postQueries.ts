import { basePostInclude, cursorFilter } from "./helpers/postsHelpers.js";
import { prisma } from "./prisma.js";

export const createPost = async (
  user_id: number,
  content?: string | null,
  sentiment?: string | null,
  sentiment_score?: number | null,
  language?: string | null,
  parent_post_id?: number | null,
  media_url?: string | null,
) => {
  return prisma.post.create({
    data: {
      user_id,
      content: content ?? undefined,
      sentiment: sentiment ?? undefined,
      sentiment_score: sentiment_score ?? undefined,
      language: language ?? undefined,
      parent_post_id: parent_post_id ?? undefined,
      media_url: media_url ?? undefined,
    },
  });
};

//funcion que devuelve todos los posts, se usa solo para la vista de admin para implemetar paginacion al mostarr posts
export const getAllPostsAdmin = async (limit: number, skip: number) => {
  return prisma.post.findMany({
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
  sentiments?: string[],
) => {
  return prisma.post.findMany({
    take: limit,
    where: {
      parent_post_id: null,
      //se construye el objeto where desde dentro con el spread operator e inyecta propiedades si hay cursor
      ...(cursor ? { AND: [cursorFilter(cursor)!] } : {}),
      //si hay sentimientos especificados, se filtra por ellos, tabmien inclye los post sin snetimiento, es decir post con solo contenido multiemdia
      ...(sentiments && sentiments.length > 0
        ? {
            OR: [
              {
                sentiment: {
                  in: sentiments,
                },
              },
              {
                sentiment: null,
              },
            ],
          }
        : {}),
      deleted_at: null,
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
        where: {
          ...cursorFilter(cursor),
          deleted_at: null,
        },

        orderBy: [{ created_at: "desc" }, { id: "desc" }],
        include: basePostInclude(currentUserId),
      },
    },
  });
};

export const deletePost = async (postId: number) => {
  return prisma.post.update({
    where: { id: postId, deleted_at: null },
    data: { deleted_at: new Date() },
  });
};

export const getFollowingPosts = async (
  userId: number,
  limit: number,
  cursor?: { createdAt: string; id: number },
) => {
  // 1. Obtener los IDs de usuarios que el usuario actual sigue
  const following = await prisma.follow.findMany({
    where: {
      follower_id: userId,
    },
    select: {
      following_id: true,
    },
  });

  const followingIds = following.map((f) => f.following_id);

  // Si no sigue a nadie, retornar un array vacío
  if (followingIds.length === 0) {
    return [];
  }

  // 2. Obtener posts de los usuarios que sigue
  return prisma.post.findMany({
    take: limit,
    where: {
      parent_post_id: null,
      user_id: {
        in: followingIds,
      },
      deleted_at: null,
      // Aplicar el cursor si existe
      ...(cursor ? { AND: [cursorFilter(cursor)!] } : {}),
    },
    include: basePostInclude(userId),
    orderBy: [{ created_at: "desc" }, { id: "desc" }],
  });
};
