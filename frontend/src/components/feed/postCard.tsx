import { formatDate } from "@/utils/formatDate.js"
import { Post } from "./typesPost.js"
import LikeButton from "./likeButton.js"
import { MoreOptionsIcon } from "@/assets/icons/MoreOptionsIcon.js"
import CommentButton from "./commentButton.js"
import RetweetButton from "./retweetButton.js"
import { useNavigate } from "react-router-dom"

export const IndividualPost = (post: Post) => {
  const navigate = useNavigate()
    return (
        <article 
        onClick={() => {
          navigate(`post/${post.id}/`);
        }}
        className="border-b border-gray-600 p-3 hover:bg-neutral-950 cursor-pointer"
        >
          <div className="flex gap-2">
            <img 
            className="w-12 h-12  rounded-full shrink-0"
            src={post.user.avatar_url || "https://res.cloudinary.com/dssbrks07/image/upload/v1766150505/user1_wznohf.svg"}
            alt={`image of user${post.user.username}`}
            />
            <div className="flex flex-col w-full ">
                {/* header del post con los datos del usuario */}
                <header className="flex gap-1 ml-1">
                      <span className="text-white font-extrabold">{post.user.name}</span>
                      <span className="text-gray-500">@{post.user.username}</span>
                      <span className="text-gray-500">· {formatDate(post.created_at)}</span>
                </header>
                {/* contenido del post */}
                <p className="font-normal ml-1">{post.content}</p>
                {/* Footer con los botones de interaccion */}
                <footer className="w-full flex justify-between mt-2 text-gray-500">
                  <CommentButton totalComments={0} post={post}/>
                  {/*initialIsLiked-> gracias al id del usuario detecta en cada post si el usaurio ya ha dado like, se comprueba si post.likes existe*/}
                  {/*si existe se le pasa true o false si el usuario le ha dado like o no, y si no se encuentra post.likes significa que no se está logeuado y se le pasa al boton false*/}
                  <LikeButton postId={post.id} likes={post._count.likes}  initialIsLiked={post.likes ? post.likes.length > 0 : false}/>
                  <RetweetButton/>
                  <MoreOptionsIcon/>
                </footer>
                
            </div>
            
          </div>
        </article>
    )
}