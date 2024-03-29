import { Dispatch, SetStateAction, FormEvent, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";

import { useAuthStore } from "../store/authStore";
import { NoResults } from "./NoResults";
import { IUser } from '../types';

interface IProps {
  comment: string;
  handleSetComment: Dispatch<SetStateAction<string>>;
  handleAddComment: (event: FormEvent) => Promise<void>;
  isPostingComment: boolean;
  comments: IComment[];
}

interface IComment {
  comment: string;
  length?: number;
  _key: string;
  postedBy: { _ref: string; _id: string; };
}

export function Comments({ isPostingComment, comments, handleSetComment, handleAddComment, comment }: IProps) {
  const { userProfile, allUsers, fetchAllUsers } = useAuthStore();

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  return (
    <div className="border-t-2 border-gray-200 pt-4 px-10 bg-[#f8F8F8] border-b-2 lg:pb-0 pb-[100px]">
      <div className="overflow-scroll lg:h-[475px]">
        {comments?.length ? (
          comments.map((item, idx) => (
            <>
              {allUsers.map((user: IUser) => {
                if (user._id === (item.postedBy._id || item.postedBy._ref)) {
                  return (
                    <div className="p-2 items-center" key={idx}>
                      <Link href={`/profile/${user._id}`}>
                        <div className="flex items-start gap-3 cursor-pointer">
                          <div className="w-8 h-8">
                            <Image
                              src={user.image}
                              width={34}
                              height={34}
                              className="rounded-full"
                              alt="user profile"
                              layout="responsive"
                            />
                          </div>
                          <div className="hidden xl:block">
                            <p className="flex gap-1 items-center text-md font-bold text-primary lowercase">
                              {user.userName.replaceAll(' ', '')}
                              <GoVerified className="text-blue-400" />
                            </p>
                            <p className="capitalize text-gray-400 text-xs">
                              {user.userName}
                            </p>
                          </div>
                        </div>
                      </Link>
                      <div>
                        <p>
                          {item.comment}
                        </p>
                      </div>
                    </div>
                  )
                }
              })}
            </>
          ))
        ) : (
          <NoResults text="No comments yet!" />
        )}
      </div>

      {userProfile && (
        <div className="absolute bottom-0 left-0 pb-6 px-2 md:px-10">
          <form onSubmit={handleAddComment} className="flex gap-4">
            <input
              value={comment}
              onChange={event => handleSetComment(event.target.value)}
              placeholder="Add comment..."
              className="bg-primary px-6 py-4 text-md fonts-medium border-2 w-[250px] md:w-[700px] lg:w-[350px] border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg"
            />
            <button className="text-md text-gray-400" onClick={handleAddComment}>
              {isPostingComment ? 'Commenting...' : 'Comment'}
            </button>
          </form>
        </div>
      )}
    </div>
  )
}