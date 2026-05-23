// Usuario que crea el post
export interface User {
  username: string;
  avatar_url: string | null;
  name: string;
}

// Conteos (likes, comentarios etc.)
export interface PostCount {
  likes: number;
  replies: number;
  reposts: number;
}

// Información del usuario que reposteó
export interface RepostUser {
  id: number;
  user: {
    username: string;
    name: string;
  };
}

// Post individual
export interface Post {
  id: number;
  parent_post_id: number | null;
  user_id: number;
  content: string;
  media_url: string | null;
  sentiment: "positive" | "neutral" | "negative";
  sentiment_score: number;
  language: string;
  created_at: string; // ISO string
  replies: Post[]; 
  user: User;
  _count: PostCount;
  likes: [{id:number}]  //sirve para ver si el usuario ha dado like a un post
  reposts: [{id:number}] //sirve para ver si el usuario ha dado repost a un post
  deleted_at: string | null; // para detectar si el post ha sido eliminado
  repostedBy: RepostUser[] // información del usuario que reposteó
}

// el cursor es el conjunto de la fecha y el id del último post fetcheado
export interface NextCursor {
  createdAt: string; // ISO string
  id: number;
}

// Respuesta completa del endpoint
export interface PostsResponse {
  posts: Post
  nextCursor: NextCursor | null;
  hasMore: boolean;
}

