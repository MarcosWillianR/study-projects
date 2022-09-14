import { useState, useEffect, useCallback } from 'react';
import { MdFavorite } from 'react-icons/md';

import { useAuthStore } from '../store/authStore';

interface IProps {
  handleChangeLike: (like: boolean) => Promise<void>
  likes?: any[];
}

export function LikeButton({ handleChangeLike, likes }: IProps) {
  const [alreadyLiked, setAlreadyLiked] = useState(false);
  const { userProfile }: any = useAuthStore();

  useEffect(() => {
    if (
      likes?.length &&
      likes.findIndex(like => like.ref === userProfile._id) !== -1
    ) {
      setAlreadyLiked(true);
    } else {
      setAlreadyLiked(false);
    }
  }, [likes, userProfile]);

  return (
    <div className="flex gap-6">
      <div className="mt-4 flex flex-col justify-center items-center cursor-pointer">
        {alreadyLiked ? (
          <div className="bg-primary rounded-full p-2 md:p-4 text-[#F51997]" onClick={() => handleChangeLike(false)}>
            <MdFavorite className="text-lg md:text-2xl" />
          </div>
        ) : (
          <div className="bg-primery rounded-full p-2 md:p-4" onClick={() => handleChangeLike(true)}>
            <MdFavorite className="text-lg md:text-2xl" />
          </div>
        )}
        <p className="text-md font-semibold">{likes?.length || 0}</p>
      </div>
    </div>
  )
}