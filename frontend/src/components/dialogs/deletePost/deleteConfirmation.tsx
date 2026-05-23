import { AuthDialog } from "@/layout/authDialog.js";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "@/context/useAuth.js";
import { useModal } from "@/hooks/useModal.js";
import { DeleteIcon } from "@/assets/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios.js";
import { useState } from "react";

export const DeleteConfirmation = () => {
  const [searchParams] = useSearchParams();
  const postId = searchParams.get("postId");
  const { closeModal } = useModal();
  const { token } = useAuth();
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);

  const deletePostMutation = useMutation({
    mutationFn: async () => {
      if (!postId) throw new Error("Post ID no encontrado");
      if (!token) throw new Error("Token no encontrado");

      const response = await api.put(`/delete/${postId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
    onSuccess: () => {
      // Invalidar las queries para refetch automático
      queryClient.invalidateQueries({ queryKey: ["allPosts"] });
      queryClient.invalidateQueries({ queryKey: ["posts", "detail", postId] });
      queryClient.invalidateQueries({ queryKey: ["userPosts"] });
      
      closeModal();
    },
    onError: (err: Error) => {
      const errorMessage =
        err?.message ||
        "Error al eliminar el post";
      setError(errorMessage);
    },
  });

  const handleConfirmDelete = () => {
    deletePostMutation.mutate();
  };

  return (
    <AuthDialog
      showLogo={false}
      open={true}
      onClose={closeModal}
      style="h-max w-max max-sm:h-full"
      showBackButton={false}
    >
      <div className="flex flex-col items-center  gap-6 p-8">
        {/* Icono de advertencia */}
        <div className="flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full">
          <DeleteIcon size={32}/>
        </div>

        {/* Título */}
        <h2 className="text-2xl font-bold text-white text-center">
          Eliminar post
        </h2>

        {/* Mensaje */}
        <p className="text-gray-400 text-center max-w-sm">
          ¿Estás seguro de que deseas eliminar este post? Esta acción no se
          puede deshacer.
        </p>

        {/* Mensaje de error si existe */}
        {error && (
          <div className="w-full bg-red-500/20 border border-red-500 rounded-lg p-3 text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        {/* Botones de acción */}
        <div className="flex flex-col gap-4 w-full">
          <button
            onClick={closeModal}
            disabled={deletePostMutation.isPending}
            className="flex-1 px-4 py-2 bg-zinc-950 cursor-pointer hover:bg-gray-700 border border-white text-white font-semibold rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirmDelete}
            disabled={deletePostMutation.isPending}
            className="flex-1 px-4 py-2 bg-red-600/20 cursor-pointer border border-red-500 hover:bg-red-600/40 text-white font-semibold rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {deletePostMutation.isPending ? (
              <>
                Eliminando...
              </>
            ) : (
              <>
                <DeleteIcon size={18} />
                Confirmar
              </>
            )}
          </button>
        </div>
      </div>
    </AuthDialog>
  );
};
