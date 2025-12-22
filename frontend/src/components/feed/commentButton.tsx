import { CommentIcon } from '@/assets/icons/index.js';

export default function CommentButton({ totalComments }: { totalComments: number | null }) {
  if (totalComments == null) totalComments=0
  return (
    <>
        <button
            className="cursor-pointer rounded-full transition-all duration-300 hover:bg-blue-500/25 p-1 hover:scale-110 active:scale-95"
        >
            <CommentIcon size={20}/>
        </button>
        {totalComments > 0 ? <p>{totalComments}</p>: ""}
    </>

  );
}