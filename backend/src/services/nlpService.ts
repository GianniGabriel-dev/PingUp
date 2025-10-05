import { LanguageServiceClient } from "@google-cloud/language";
//protos es para tipar las respuestas de la API
import type { protos } from "@google-cloud/language";


const client= new LanguageServiceClient();

export async function analyzeSentiment(text: string): Promise<{
  score: number;
  magnitude: number;
}> {
  const document: protos.google.cloud.language.v1.IDocument = {
    content: text,
    type: "PLAIN_TEXT",
  };

  const [result] = await client.analyzeSentiment({ document });

  const sentiment = result.documentSentiment;
  console.log(sentiment)

  return {
    score: sentiment?.score ?? 0, 
    magnitude: sentiment?.magnitude ?? 0,
  };
}

export function getSentimentLabel(score: number): "positivo" | "neutral" | "negativo" {
  if (score > 0.25) return "positivo";
  if (score < -0.35) return "negativo";
  return "neutral";
}