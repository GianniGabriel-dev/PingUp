import { useState } from 'react';
import { HearthIcon } from '@/assets/icons/index.js';

export default function LikeButton({ likes }: { likes: number | null }) {
  const [numLikes, setNumLikes]= useState(likes)
  const [isLiked, setIsLiked] = useState(false);

  return (
      <button
        onClick={() => setIsLiked(!isLiked)}
        className="cursor-pointer  rounded-full transition-all duration-300 hover:bg-pink-600/25 p-1 hover:scale-110 active:scale-95"
      >
        <HearthIcon isLiked={isLiked} size={20}/>
      </button>
  );
}