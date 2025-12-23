import { CommentIcon } from '@/assets/icons/index.js';

export default function CommentButton({ totalComments }: { totalComments: number | null }) {
  if (totalComments == null) totalComments=0
  return (
    <>
        <button
            className="flex gap-0.5 items-center cursor-pointer transition-all duration-300 hover:text-blue-500 active:scale-95"
        >
            <CommentIcon size={20}/>
            <span>{totalComments >0? totalComments:""}</span>
        </button>
    </>

  );
}