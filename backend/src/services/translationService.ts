import { Translate } from "@google-cloud/translate/build/src/v2/index.js";
import { createTranslation, getContentById } from "./userServices.js";

//se inicializa el cliente de la api, los datos para acceder a esta están en el archivo oculto json con las credenciales de google
const translate = new Translate();

//target es al idioma al que quieres traducir el texto
export async function translateText(text:string, target:string):Promise<{
  translation: string;
  detectedSourceLanguage: string;
}>{
  let [translation, response] = await translate.translate(text, target);
  console.dir(response, { depth: null });
  console.log(translation)
  
  const detectedSourceLanguage = response.data.translations[0].detectedSourceLanguage;
  return {translation,detectedSourceLanguage};
}

export async function translatePostContent(post_id: number, target: string) {
  const text = await getContentById(post_id);
  if (!text) throw new Error("Post no encontrado");

  const translation = await translateText(text.content, target);
  if (!translation) throw new Error("Error al traducir el texto");
  await createTranslation("post", post_id, text.content, translation.translation, target, translation.detectedSourceLanguage);

  return translation;
}
