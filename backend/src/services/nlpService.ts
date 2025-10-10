import { LanguageServiceClient } from "@google-cloud/language";
//protos es para tipar las respuestas de la API
import type { protos } from "@google-cloud/language";

//se inicializa el cliente de la api, los datos para acceder a esta están en el archivo oculto json con las credenciales de google
const client= new LanguageServiceClient();

export async function analyzeSentiment(text: string): Promise<{
  score: number;
  magnitude: number;
  //como el nlp de google devuelve tambien el lenguaje, me aprovecho de el para añadirselo al post creado
  language: string
}> {
  const document: protos.google.cloud.language.v1.IDocument = {
    content: text,
    type: "PLAIN_TEXT",
  };

  const [result] = await client.analyzeSentiment({ document });
  console.log(result)
  const sentiment = result.documentSentiment;
  const language= result.language ?? "und"
  console.log(sentiment)

  return {
    score: sentiment?.score ?? 0, 
    magnitude: sentiment?.magnitude ?? 0,
    language
  };
}

//se establece el umbral de sentimientos para calificar el tono correctamente
export function getSentimentLabel(score: number): "positivo" | "neutral" | "negativo" {
  if (score > 0.25) return "positivo";
  if (score < -0.35) return "negativo";
  return "neutral";
}