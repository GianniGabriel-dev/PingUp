import { WritePost } from "@/components/feed/WritePost.js";
import { useAuth } from "@/context/useAuth.js";

export function MainFeed() {
  const { user, loading } = useAuth();
  return (
    <>
        <h1 className="text-amber-200">Main Feed</h1>
        {user && <WritePost user={user}/>}
    </>
  )
}

