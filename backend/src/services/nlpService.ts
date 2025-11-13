import { LanguageServiceClient } from "@google-cloud/language";
//protos es para tipar las respuestas de la API
import type { protos } from "@google-cloud/language";
import { translateText } from "./translationService.js";
import { Translate } from "@google-cloud/translate/build/src/v2/index.js";

//se inicializa el cliente de la api, los datos para acceder a esta están en el archivo oculto json con las credenciales de google
const client = new LanguageServiceClient();
const translate = new Translate();

//la funcion se divide en dos partes, primero se analiza el sentimiento del texto, si el idioma no es soportado por la API de nlp de google se traduce al ingles y se vuelve a analizar
export async function analyzeSentiment(text: string): Promise<{
  score: number;
  magnitude: number;
  language: string;
}> {
  let sentiment = null;
  let language = "und";

  //primero se detecta el idioma del texto
  const [detection] = await translate.detect(text);
  language = detection.language || "und";

  try {
    //se crea el documento con el texto a analizar
    const document: protos.google.cloud.language.v1.IDocument = {
      content: text,
      type: "PLAIN_TEXT",
    };
    //Se analiza el sentimiento del texto
    const [result] = await client.analyzeSentiment({ document });
    sentiment = result.documentSentiment;
    //el ? se usa para evitar errores en caso de que result sea undefined
    language = result?.language ?? "und";

    console.log(result);
    console.log(sentiment);
  } catch (error: any) {
    //si el idioma no es soportado por la API de nlp de google devuelve un error con code 3, caundo esto pasa se traduce el texto al ingles y se vuelve a analizar
    if (error.code === 3) {
      const { translation } = await translateText(text, "en");
      //se analiza el sentimiento del texto traducido al inglés
      const [translatedResult] = await client.analyzeSentiment({
        document: { content: translation, type: "PLAIN_TEXT" },
      });
      sentiment = translatedResult.documentSentiment;

      console.log(translatedResult);
      console.log(sentiment);
    } else {
      throw error;
    }
  }
  return {
    score: sentiment?.score ?? 0,
    magnitude: sentiment?.magnitude ?? 0,
    language,
  };
}

//se establece el umbral de sentimientos para calificar el tono correctamente
export function getSentimentLabel(
  score: number
): "positivo" | "neutral" | "negativo" {
  if (score > 0.25) return "positivo";
  if (score < -0.35) return "negativo";
  return "neutral";
}
//importante para evitar warnings innecesarios de la librería
const originalWarn = console.warn;
console.warn = (...args) => {
  if (!args[0]?.includes("fromJSON") && !args[0]?.includes("fromStream")) {
    originalWarn(...args);
  }
};
