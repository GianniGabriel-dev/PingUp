import { Post } from "./typesPost.js"

export const IndividualPost = (post: Post) => {
    return (
        <div className="border-b border-gray-600 w-full p-3 " key={post.id}>
          <div className="flex items-center gap-2 p-4">
            <img
            className="w-12 h-12 self-start "
            src={post.user.avatar_url || "https://res.cloudinary.com/dssbrks07/image/upload/v1766150505/user1_wznohf.svg"}
            alt={`image of user${post.user.username}`}
            />
            <div className="flex flex-col">
                <div>
                    <p className="text-gray-500">@{post.user.username}</p>
                    <p className="text-gray-500">{post.created_at}</p>
                </div>
                
                <p>{post.content}</p>
            </div>
            
          </div>
        </div>
    )
}