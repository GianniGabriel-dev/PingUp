import { CommentIcon } from '@/assets/icons/index.js';
import { useNavigate } from 'react-router-dom';
import { Post } from './typesPost.js';

export default function CommentButton({ totalComments, post}: { totalComments: number | null, post: Post}) {
  const navigate= useNavigate()
  if (totalComments == null) totalComments=0
  const isReply=true
  return (
    <>
        <button
            onClick={(e) => {
              e?.stopPropagation(); // Evita el click en el comentario se propague al post y lo abra
              navigate(`post/${post.id}/?modal=compose`,{
                state: {post, isReply}
              })
            }}
            className="flex gap-0.5 items-center cursor-pointer transition-all duration-300 hover:text-blue-500 active:scale-95"
        >
            <CommentIcon size={20}/>
            <span>{totalComments >0? totalComments:""}</span>
        </button>
    </>

  );
}