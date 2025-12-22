import { formatDate } from "@/utils/formatDate.js"
import { Post } from "./typesPost.js"
import LikeButton from "./likeButton.js"
import { MoreOptionsIcon } from "@/assets/icons/MoreOptionsIcon.js"
import CommentButton from "./commentButton.js"
import RetweetButton from "./retweetButton.js"

export const IndividualPost = (post: Post) => {
    return (
        <div className="border-b border-gray-600 " key={post.id}>
          <div className="flex items-center gap-2 p-3">
            <img
            className="w-12 h-12 self-start "
            src={post.user.avatar_url || "https://res.cloudinary.com/dssbrks07/image/upload/v1766150505/user1_wznohf.svg"}
            alt={`image of user${post.user.username}`}
            />
            <div className="flex flex-col w-full ">
                <div className="flex gap-1 ml-1">
                      <p className="text-white font-extrabold">{post.user.username}</p>
                      <p className="text-gray-500">@{post.user.username}</p>
                      <p className="text-gray-500">· {formatDate(post.created_at)}</p>
                </div>
      
                <p className="font-normal ml-1">{post.content}</p>
                <div className="w-full flex justify-between mt-2">
                  <CommentButton totalComments={0}/>
                  <LikeButton likes={post._count.likes}/>
                  <RetweetButton/>
                  <MoreOptionsIcon/>
                </div>
                
            </div>
            
          </div>
          
        </div>
    )
}