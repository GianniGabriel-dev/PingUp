import { CommentIcon } from '@/assets/icons/index.js';
import { useNavigate } from 'react-router-dom';

export default function CommentButton({ totalComments, postId }: { totalComments: number | null, postId: number }) {
  const navigate= useNavigate()
  if (totalComments == null) totalComments=0
  return (
    <>
        <button
            onClick={(e) => {
              e?.stopPropagation(); // Evita el click en el comentario se propague al post y lo abra
              navigate(`post/${postId}/?modal=compose`);
            }}
            className="flex gap-0.5 items-center cursor-pointer transition-all duration-300 hover:text-blue-500 active:scale-95"
        >
            <CommentIcon size={20}/>
            <span>{totalComments >0? totalComments:""}</span>
        </button>
    </>

  );
}