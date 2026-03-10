import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios.js";


export function useTranslatePost() {
  return useMutation({
    mutationFn: async ({ postId, targetLanguage }: { postId: number; targetLanguage: string }) => {
      console.log(`Translating post ${postId} to ${targetLanguage}`);
      const response = await api.post(`/post/${postId}/translate`, {}, {
        params: { target: targetLanguage },
      });
      console.log(response)
      return response.data.translation;
    },
  });
}
