import { useState } from 'react';
import { RetweetIcon } from '@/assets/icons/index.js';

export default function RetweetButton() {
  const [isRetweeted, setIsReisRetweeted] = useState(false);

  return (
      <button
        onClick={() => setIsReisRetweeted(!isRetweeted)}
        className="cursor-pointer  rounded-full transition-all duration-300 hover:bg-emerald-600/25 p-1 hover:scale-110 active:scale-95"
      >
        <RetweetIcon isRetweeted={isRetweeted} size={20}/>
      </button>
  );
}