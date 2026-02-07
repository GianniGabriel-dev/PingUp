import { AllPosts } from "@/components/feed/allPosts.js";
import { WritePost } from "@/components/feed/WritePost.js";
import { useAuth } from "@/context/useAuth.js";

export function MainFeed() {
  const { user, token } = useAuth();
  return (
    <>
        {user && token && <WritePost user={user} token={token} isReply={false}/>}
        <AllPosts/>
    </>
  )
}

