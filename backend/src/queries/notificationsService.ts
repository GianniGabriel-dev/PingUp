import { prisma } from "./prisma.js"


export const createNotification= async(
    notification_type:string,
    sender_id:number,
    receiver_id:number,
    post_id?: number|null
)=>{
  return await prisma.notification.create({
    data:{notification_type, sender_id, receiver_id, post_id}
  })
}

export const deleteNotification= async(
    notification_type:string,
    sender_id:number,
    receiver_id:number,
    post_id?: number|null
)=>{
    await prisma.notification.deleteMany({
        where:{
            notification_type,
            sender_id,
            receiver_id,
            post_id
          },
    })
}

export const findReceiverId = async (post_id:number) => {
    const post = await prisma.post.findUnique({
      where: { id: post_id },
      select: { user_id: true },
    });
  
    return post?.user_id ?? null;
  };

export const getNotification = async (user_id: number) => {
const notifications = await prisma.notification.findMany({
  where: { receiver_id: user_id },
  include: {
    sender: {
      select: { id: true, username: true, avatar_url: true },
    },
    post: {
      select: { id: true, content: true, media_url: true },
    },
  },
  orderBy: { created_at: "desc" },
});
  return notifications;
};