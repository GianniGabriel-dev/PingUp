import {
  createNotification,
  deleteNotification,
  findReceiverId,
} from "./notificationsService.js";
import {
  deleteFollow,
  deleteLike,
  followExisting,
  followUser,
  likeExisting,
  likePost,
} from "../queries/likeAndFollowQueries.js";

export const toggleLike = async (userId: number, post_id: number) => {
  const [existing, receiver_id] = await Promise.all([
    likeExisting(userId, post_id),
    findReceiverId(post_id),
  ]);

  if (existing) {
    await Promise.all([
      deleteLike(userId, post_id),
      deleteNotification("like", userId, receiver_id!, post_id),
    ]);
    return { msg: "like quitado" };
  } else {
    await likePost(userId, post_id);
    //si el usuario no se da like a si mismo crea una notificación
    if (userId != receiver_id) {
      await createNotification("like", userId, receiver_id!, post_id);
    }

    return { msg: "like dado" };
  }
};

export const toggleFollow = async (userId: number, followingId: number) => {
  const existing = await followExisting(userId, followingId);
  if (existing) {
    await Promise.all([
      deleteFollow(userId, followingId),
      deleteNotification("follow", userId, followingId),
    ]);
    return { msg: "follow quitado" };
  } else {
    await followUser(userId, followingId);
    //si el usuario no se da like a si mismo crea una notificación
    if (userId != followingId) {
      await createNotification("follow", userId, followingId);
    }
    return { msg: "follow dado" };
  }
};
