import { PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

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