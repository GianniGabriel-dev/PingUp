import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios.js";


export function useTranslatePost() {
  return useMutation({
    mutationFn: async ({ postId, targetLanguage }: { postId: number; targetLanguage: string }) => {
      const response = await api.post(`/post/${postId}/translate`, {}, {
        params: { target: targetLanguage },
      });
      return response.data.translation;
    },
  });
}
