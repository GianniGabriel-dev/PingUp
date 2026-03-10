import { prisma } from "./prisma.js"

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
//devuelve la traducción si existe y null si no existe
export const existingTranslationPost= async(content_id:number, target_language:string)=>{
  const translation =await prisma.translation.findUnique({
    where: {
      content_id_target_language: {
        content_id,
        target_language,
      },
    },
    select: {
      translated_text: true,
    },
  });
  return translation ?  translation.translated_text : null
}

//creacion de traduccion
export const createTranslation= async(
  content_id:number, 
  original_text:string,
  translated_text:string,
  target_language:string,
  source_language:string,
)=>{
  return await prisma.translation.create({
    data:{content_id, original_text,translated_text,target_language,source_language,}
  })
}
