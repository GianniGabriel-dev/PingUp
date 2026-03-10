import { formatDate } from "@/utils/formatDate.js"
import { Post } from "./typesPost.js"
import LikeButton from "./likeButton.js"
import { MoreOptionsIcon } from "@/assets/icons/MoreOptionsIcon.js"
import CommentButton from "./commentButton.js"
import RetweetButton from "./retweetButton.js"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useAuth } from "@/context/useAuth.js"
import { useTranslatePost } from "@/hooks/useTranslatePost.js"

export const IndividualPost = (post: Post) => {
  const navigate = useNavigate()
  const { user } = useAuth()

  const [displayText, setDisplayText] = useState<string | null>(null)
  const [showOriginal, setShowOriginal] = useState(false)
  const { mutateAsync: translatePost, isPending: isTranslating } = useTranslatePost()
    useEffect(() => {console.log(`showOriginal: ${showOriginal} displayText: ${displayText}`)},[showOriginal, displayText])
  const handleTranslate = async (e: React.MouseEvent) => {
    e.stopPropagation()



    if (showOriginal) {
      setShowOriginal(false)
      setDisplayText(null)
      return
    }

    if (!user?.language) return

    try {
      const translation = await translatePost({ postId: post.id, targetLanguage: user.language })
      setDisplayText(translation.translation)
      setShowOriginal(true)
    } catch (error) {
      console.error("Failed to translate post:", error)
    }
  }

  const shouldShowTranslateButton = post.language && user?.language && post.language !== user.language

  const contentToDisplay = displayText && showOriginal ? displayText : post.content


    return (
        <article 
        onClick={() => {
          navigate(`/post/${post.id}`,{
            replace:false,
            //guardado de coord del scroll actual
            state:{ scrollY: window.scrollY }
          });
        }}
        className="border-b border-gray-600 p-3  hover:bg-neutral-950 cursor-pointer"
        >
          <div className="flex gap-2">
            <img 
            className="w-12 h-12  rounded-full shrink-0"
            onClick={(e)=>{
              e.stopPropagation()
              navigate(`/${post.user.username}`)
            }}
            src={post.user.avatar_url || "https://res.cloudinary.com/dssbrks07/image/upload/v1771602464/avatars/d1ozknsuviqhqbjyx1z2.webp"}
            alt={`image of user${post.user.username}`}
            />
            <div className="flex flex-col w-full ">
                {/* header del post con los datos del usuario */}
                <header onClick={()=> navigate(`/${post.user.username}`)} className="flex gap-1 ml-1">
                      <span className="text-white font-extrabold transition-all  hover:underline">{post.user.name}</span>
                      <span className="text-gray-500">@{post.user.username}</span>
                      <span className="text-gray-500">· {formatDate(post.created_at)}</span>
                </header>
                {/* contenido del post */}
                <p className="font-normal ml-1">{contentToDisplay}</p>
                <div className="flex justify-start">
                  {shouldShowTranslateButton && (
                    <button
                      onClick={handleTranslate}
                      disabled={isTranslating}
                      className="text-sky-600 hover:text-sky-500 text-sm ml-1 mt-1 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {isTranslating ? "Traduciendo..." : showOriginal ? "Ver Original" : "Traducir"}
                    </button>
                  )}
                </div>

                {post.media_url && (
                  <img
                    src={post.media_url}
                    alt="Media content"
                    className="mt-3 border border-gray-600 w-max h-auto max-h-125 object-cover rounded-lg"
                    loading="lazy"
                  />
                )}
                {/* Footer con los botones de interaccion */}
                <footer className="w-full flex justify-between mt-2 text-gray-500">
                  <CommentButton totalComments={post._count.replies} post={post}/>
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