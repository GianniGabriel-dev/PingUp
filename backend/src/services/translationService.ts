import { Translate } from "@google-cloud/translate/build/src/v2/index.js";

//se inicializa el cliente de la api, los datos para acceder a esta están en el archivo oculto json con las credenciales de google
const translate = new Translate();

//target es al idioma al que quieres traducir el texto
export async function translateText(text:string, target:string):Promise<string> {
  let [translation] = await translate.translate(text, target);
  return translation;
}
