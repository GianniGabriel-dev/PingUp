import { Translate } from "@google-cloud/translate/build/src/v2/index.js";
import { createTranslation, existingTranslationPost, getCommentContentById, getPostContentById } from "../queries/translationQueries.js";
import { ContentType } from "@prisma/client";


//se inicializa el cliente de la api, los datos para acceder a esta están en el archivo oculto json con las credenciales de google
const translate = new Translate();

//target es al idioma al que quieres traducir el texto
export async function translateText(text:string, target:string):Promise<{
  translation: string;
  detectedSourceLanguage: string;
}>{
  let [translation, response] = await translate.translate(text, target);

  const detectedSourceLanguage = response.data.translations[0].detectedSourceLanguage;
  return {translation,detectedSourceLanguage};
}

export async function translateContent(id: number, target: string, content_type:ContentType){
  interface TextContent {
    id: number;
    language: string;
    content: string;
  }
  let text: TextContent | null = null;

  if (content_type=="post"){
    //se obtiene el content del post
    text = await getPostContentById(id);
  }else{
    //se obtiene el content del comment
    text = await getCommentContentById(id);
  }
  
  //se comprueba si ya existe una traducción del post en el idioma objetivo
  const existingTranslation = await existingTranslationPost(id, content_type)

  if (!text) throw new Error("Post no encontrado");
  
  //si ya existe una traduccion o el post ya está en el idioma target, no se traduce
  if(text.language === target || existingTranslation) throw new Error("El post ya está en el idioma objetivo o ya se ha creado una traducción en este idioma");
  
  else{
    //se traduce el contenido del post
    const translation = await translateText(text.content, target);
    if (!translation) throw new Error("Error al traducir el texto");
    //se guarda la traducción en la base de datos
    await createTranslation(content_type, id, text.content, translation.translation, target, translation.detectedSourceLanguage);

    return translation;
  }

}
