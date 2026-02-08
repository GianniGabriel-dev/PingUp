import { useLocation } from "react-router-dom";
import { useAuth } from "@/context/useAuth.js";
import { formatDate } from "@/utils/formatDate.js";
import { AuthDialog } from "../authDialog.js";
import { useModal } from "@/hooks/useModal.js";
import { WritePost } from "@/components/feed/WritePost.js";

export default function ComposePost() {
  const location = useLocation();
  const { post, isReply } = location.state || {};
  const {closeModal} = useModal()
  const { user, token } = useAuth();


  return (
    <div className="text-white">
      <AuthDialog
        style="h-max w-xl max-sm:h-full"
        showLogo={false}
        open={true}
        onClose={closeModal}
      >
<div>
  {post && (
    <div className="flex px-8 gap-3">
      {/* Columna izquierda: avatar + línea */}
      <div className="relative flex flex-col items-center shrink-0">
        <img
          className="w-12 h-12 rounded-full z-10"
          src={
            post.user.avatar_url ||
            "https://res.cloudinary.com/dssbrks07/image/upload/v1766150505/user1_wznohf.svg"
          }
          alt={`image of user ${post.user.username}`}
        />

        {/* Línea vertical que crece automáticamente */}
        <div className="flex-1 w-0.5 bg-gray-600 my-1"></div>
      </div>

      {/* Contenido del post */}
      <div className="flex flex-col w-full pb-2">
        <header className="flex gap-1 pb-1">
          <span className="text-white font-extrabold">{post.user.name}</span>
          <span className="text-gray-500">@{post.user.username}</span>
          <span className="text-gray-500">
            · {formatDate(post.created_at)}
          </span>
        </header>
        <p className="font-normal">{post.content}</p>

        <p className="text-gray-500 mt-2">
          Respondiendo a <span className="text-blue-500">@{post.user.username}</span>
        </p>
      </div>
    </div>
  )}

  {user && token && (
    <WritePost user={user} token={token} isReply={isReply} />
  )}
</div>
      </AuthDialog>
    </div>
  );
}
