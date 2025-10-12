import { PrismaClient, ContentType } from "@prisma/client";

const prisma = new PrismaClient();

//se obtiene el content y el idioma del post para tradicirlo
export const getContentById= async(id:number)=>{
  return await prisma.post.findUnique({
    where:{
      id
    },
    select:{
      content: true,
      language:true,
      id:true
    }
  })
}
//devuelve un booleano si existe o no la traducción
export const existingTranslationPost= async(id:number, )=>{
  const existing =await prisma.translation.findFirst({
    where:{ 
      id, 
      content_type:"post"
    },
    select:{id:true}
  })
  return existing != null // si existe es true si no false
}

//creacion de traduccion
export const createTranslation= async(
  content_type: ContentType, 
  content_id:number, 
  original_text:string,
  translated_text:string,
  target_language:string,
  source_language:string,
)=>{
  return await prisma.translation.create({
    data:{ content_type, content_id, original_text,translated_text,target_language,source_language,}
  })
}
