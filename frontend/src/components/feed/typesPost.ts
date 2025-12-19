// Usuario que crea el post
export interface User {
  username: string;
  avatar_url: string | null;
}

// Conteos (likes, etc.)
export interface PostCount {
  likes: number;
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
  user: User;
  _count: PostCount;
}

// Cursor para paginación
export interface NextCursor {
  createdAt: string; // ISO string
  id: number;
}

// Respuesta completa del endpoint
export interface PostsResponse {
  posts: Post[];
  nextCursor: NextCursor | null;
  hasMore: boolean;
}