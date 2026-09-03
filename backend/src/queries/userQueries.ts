import { Prisma } from "@prisma/client";
import { basePostInclude, cursorFilter } from "./helpers/postsHelpers.js";
import { prisma } from "./prisma.js"

export const searchUsers = async (query: string, limit: number = 8) => {
  return prisma.user.findMany({
    where: {
      OR: [
        { username: { contains: query, mode: "insensitive" } },
        { name:     { contains: query, mode: "insensitive" } },
      ],
    },
    select: {
      id:         true,
      username:   true,
      name:       true,
      avatar_url: true,
      _count: { select: { followers: true } },
    },
    orderBy: { followers: { _count: "desc" } },
    take: limit,
  });
};

export const getUserByParam = async (
  param: number | string,
  currentUserId?: number
) => {

  const where =
    typeof param === "number"
      ? { id: param }
      : { username: param };

  const user = await prisma.user.findUnique({
    where,
    select: {
      id: true,
      username: true,
      email: true,
      googleId: true,
      avatar_url: true,
      banner_url: true,
      bio: true,
      created_at: true,
      language: true,
      name: true,

      following: currentUserId
        ? {
            where: { follower_id: currentUserId },
            select: { id: true },
          }
        : false,

      _count: {
        select: {
          followers: true,
          following: true,
          posts: true,
        },
      },
    },
  });

  return {
    ...user,
    isFollowing: !!user?.following?.length,
  };
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
  const [posts, reposts] = await Promise.all([
    prisma.post.findMany({
      take: limit,
      where: {
        user: { username },
        deleted_at: null,
        parent_post_id: null, // solo posts originales
        //se construye el objeto where desde dentro con el spread operator e inyecta propiedades si hay cursor
        ...(cursor ? { AND: [cursorFilter(cursor)!] } : {}),
      },
      // datos necesarios para renderizar los posts en la feed
      include: basePostInclude(currentUserId),
      orderBy: [{ created_at: "desc" }, { id: "desc" }],
    }),
    prisma.repost.findMany({
      take: limit,
      where: {
        user: { username },
        ...(cursor ? { AND: [cursorFilter(cursor)!] } : {}),
      },
      include: {
        user: { select: { id: true, username: true, name: true } },
        post: {
          include: basePostInclude(currentUserId),
        },
      },
      orderBy: [{ created_at: "desc" }, { id: "desc" }],
    })
  ]);

  // Combinar posts y reposts
  const combined = [
    ...posts,
    ...reposts.map(r => ({
      ...r.post,
      repostedBy: [{ id: r.user_id, user: { username: r.user.username, name: r.user.name } }],
    }))
  ];

  // Ordenar por fecha de creación descendente
  return combined.sort((a, b) => 
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  ).slice(0, limit);
};

export const updateUserData = async(user_id:number, data: { name?: string; bio?:string; avatar_url?: string; banner_url?: string; language?: string })=>{
  const { name, bio, avatar_url, banner_url, language } = data;

  if (name !== undefined) data.name = name;
  if (bio !== undefined) data.bio = bio;
  if (avatar_url !== undefined) data.avatar_url = avatar_url;
  if (banner_url !== undefined) data.banner_url = banner_url;
  if (language !== undefined) data.language = language;

  return await prisma.user.update({
    where:{id: user_id},
    data: data
  })
}

//viewingUsername es el username del perfil que se esta viendo, se usa para excluirlo de los resultados
export const getSuggestedUsers = async (currentUserId: number, viewingUsername: string) => {
  const followedIds = await prisma.follow.findMany({
    where: { follower_id: currentUserId },
    select: { following_id: true },
  });
  const idsToExclude = [currentUserId, ...followedIds.map((f) => f.following_id)];

  if (viewingUsername) {
    const viewingUser = await prisma.user.findUnique({
      where: { username: viewingUsername },
      select: { id: true },
    });
    if (viewingUser && !idsToExclude.includes(viewingUser.id)) {
      idsToExclude.push(viewingUser.id);
    }
  }

  const gianniUser = await prisma.user.findUnique({
    where: { username: "Gianni" },
    select: {
      id: true,
      username: true,
      name: true,
      avatar_url: true,
      _count: { select: { followers: true } },
    },
  });

  const shouldIncludeGianni =
    gianniUser && !idsToExclude.includes(gianniUser.id);

  const remaining = shouldIncludeGianni ? 4 : 5;

  const randomUsers = await prisma.$queryRaw<
    { id: number; username: string; name: string | null; avatar_url: string; follower_count: bigint }[]
  >`
    SELECT u.id, u.username, u.name, u.avatar_url,
           (SELECT COUNT(*) FROM "Follow" f WHERE f.following_id = u.id) AS follower_count
    FROM "User" u
    WHERE u.id != ${currentUserId}
      AND u.id NOT IN (${Prisma.join(idsToExclude)})
    ORDER BY RANDOM()
    LIMIT ${remaining}
  `;

  const mappedRandom = randomUsers.map((u) => ({
    id: u.id,
    username: u.username,
    name: u.name,
    avatar_url: u.avatar_url,
    _count: { followers: Number(u.follower_count) },
  }));

  const result = shouldIncludeGianni ? [gianniUser, ...mappedRandom] : mappedRandom;

  const currentUserFollows = await prisma.follow.findMany({
    where: { follower_id: currentUserId, following_id: { in: result.map((u) => u.id) } },
    select: { following_id: true },
  });
  const followsSet = new Set(currentUserFollows.map((f) => f.following_id));

  return result.map((u) => ({
    ...u,
    isFollowing: followsSet.has(u.id),
  }));
};

export const getRepliesByUser = async (
  username: string,
  limit: number,
  cursor?: { createdAt: string; id: number },
  currentUserId?: number,
) => {
  return prisma.post.findMany({
    where: {
      user: { username },
      deleted_at: null,
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