import { useState } from 'react';
import { RetweetIcon } from '@/assets/icons/index.js';

export default function RetweetButton() {
  const [isRetweeted, setIsRetweeted] = useState(false);

  return (
      <button
        onClick={(e) => {
          e?.stopPropagation(); // Evita el click en el retweet se propague al post y lo abra
          setIsRetweeted(!isRetweeted);
        }}
        className="flex gap-0.5 items-center cursor-pointer transition-all duration-300 hover:text-emerald-600 active:scale-95"
      >
        <RetweetIcon isRetweeted={isRetweeted} size={20}/>
      </button>
  );
}