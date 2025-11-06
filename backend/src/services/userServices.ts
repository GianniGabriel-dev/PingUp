import { PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export const getUserById = async (id:number) => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
};


export const getAllPosts = async (limit:number, skip:number)=>{
  return await prisma.post.findMany({
    //skip es una función de prisma equivalente al offset, este se salta los resultados anteriores para crear paginación
    skip,
    //take coge cuantos posts mostrar por pagina
    take:limit,
    //join para incluir username y avatar en la consulta
    include:{
      user: {select:{username:true, avatar_url:true}},
      _count: {select:{likes: true}}
    },
    orderBy: {created_at:"desc"}
  })
}


export const updateAvatar = async(user_id:number, avatar_url:string )=>{
  return await prisma.user.update({
    where:{id: user_id},
    data:{avatar_url}
  })
}

