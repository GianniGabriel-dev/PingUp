//datos simepre necesarios para mostrar un post, se crea una función para no repetir código en las consultas
export const basePostInclude = (currentUserId?: number) => ({
  user: { select: { username: true, avatar_url: true, name: true } },
//no cuenta las respuestas eliminadas para que el número de comentarios sea correcto
  _count: {
    select: {
      likes: true,
      reposts: true,
      replies: {
        where: {
          deleted_at: null,
        },
      },
    },
  },

  likes: currentUserId
    ? {
        where: { user_id: currentUserId },
        select: { id: true },
        take: 1,
      }
    : false,
  reposts: currentUserId
    ? {
        where: { user_id: currentUserId },
        select: { id: true },
        take: 1,
      }
    : false,
});

//función que construye el filtro para la paginación con cursor
export const cursorFilter = (cursor?: { createdAt: string; id: number }) => {
  if (!cursor) return undefined;

  return {
    OR: [
      { created_at: { lt: new Date(cursor.createdAt) } },
      {
        created_at: new Date(cursor.createdAt),
        id: { lt: cursor.id },
      },
    ],
  };
};
