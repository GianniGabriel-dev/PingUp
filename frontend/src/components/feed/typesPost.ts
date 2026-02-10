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
  likes: [{id:number}]  //sirve apra ver si el usuario ha dado like a un post
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

