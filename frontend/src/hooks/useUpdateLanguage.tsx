import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios.js";
import { useAuth } from "@/context/useAuth.js";

export function useUpdateLanguage() {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  const mutation = useMutation({
    mutationFn: async (language: string) => {
      const response = await api.patch("/updateLanguage", { language }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
    onSuccess: () => {
      // Invalidate user query to refresh the user context with new language preference
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error: unknown) => {
      console.error("Error updating language preference:", error);
    },
  });

  return mutation;
}
