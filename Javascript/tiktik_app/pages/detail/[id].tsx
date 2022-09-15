import { useState, useEffect, useRef, useCallback, FormEvent } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';
import { MdOutlineCancel } from 'react-icons/md';
import { BsFillPlayFill } from 'react-icons/bs';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import axios from 'axios';

import { BASE_URL } from '../../utils';
import { IVideo } from '../../types';
import { useAuthStore } from '../../store/authStore';
import { LikeButton } from '../../components/LikeButton';
import { Comments } from '../../components/Comments';

interface IProps {
  postDetails: IVideo,
}

const Detail = ({ postDetails }: IProps) => {
  const [post, setPost] = useState(postDetails);
  const [playing, setPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [comment, setComment] = useState('');
  const [isPostingComment, setIsPostingComment] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const { userProfile }: any = useAuthStore();

  const handleClickVideo = useCallback(() => {
    if (playing) {
      videoRef?.current?.pause();
      setPlaying(false)
    } else {
      videoRef?.current?.play();
      setPlaying(true)
    }
  }, [playing]);

  useEffect(() => {
    if (post && videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    };
  }, [isVideoMuted, post]);

  const handleChangeLike = useCallback(async (like: boolean) => {
    if (userProfile) {
      const { data } = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: post._id,
        like
      })
      console.log(data.likes)
      setPost(state => ({ ...state, likes: data.likes }));
    }
  }, [post._id, userProfile]);

  const handleAddComment = useCallback(async (event: FormEvent) => {
    event.preventDefault();
    if (userProfile && comment) {
      setIsPostingComment(true);
      const { data } = await axios.put(`${BASE_URL}/api/post/${post._id}`, {
        userId: userProfile._id,
        comment
      });
      setPost(state => ({ ...state, comments: data.comments }));
      setComment('');
      setIsPostingComment(false);
    }
  }, [comment, post._id, userProfile]);

  if (!post) return null;

  return (
    <div className="flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap">
      <div className="relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-blurred-img bg-no-repeat bg-cover bg-center">
        <div className="absolute top-6 left-2 lg:left-6 flex gap-6 z-50">
          <p className="cursor-pointer" onClick={router.back}>
            <MdOutlineCancel className="text-white text-[35px]" />
          </p>
        </div>
        <div className="relative">
          <div className="lg:h-[100vh] h-[60vh]">
            <video
              ref={videoRef}
              loop
              onClick={handleClickVideo}
              src={post.video.asset.url}
              className="h-full cursor-pointer"
            >
            </video>
          </div>
          <div className="absolute top-[45%] left-[45%] cursor-pointer">
            {!playing && (
              <button onClick={handleClickVideo}>
                <BsFillPlayFill className="text-white text-6xl lg:text-8xl" />
              </button>
            )}
          </div>
        </div>

        <div className="absolute bottom-5 lg:bottom-10 right-5 lg:right-10 cursor-pointer">
          {isVideoMuted ? (
            <button onClick={() => setIsVideoMuted(false)} className="text-white text-2xl lg:text-4xl">
              <HiVolumeOff />
            </button>
          ) : (
            <button onClick={() => setIsVideoMuted(true)} className="text-white text-2xl lg:text-4xl">
              <HiVolumeUp />
            </button>
          )}
        </div>
      </div>

      <div className="relative w-[1000px] md:w-[900px] lg:w-[700px]">
        <div className="lg:mt-20 mt-10">
          <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
            <div className="ml-4 md:w-20 md:h-20 w-16 h-16">
              <Link href="/">
                <>
                  <Image
                    width={62}
                    height={62}
                    className="rounded-full"
                    src={post.postedBy.image}
                    alt="profile photo"
                    layout="responsive"
                  />
                </>
              </Link>
            </div>
            <div>
              <Link href="/">
                <div className="mt-3 flex flex-col gap-2">
                  <p className="flex gap-2 md:text-md font-bold text-primary">
                    {post.postedBy.userName} {' '}
                    <GoVerified className="text-blue-400 text-md" />
                  </p>
                  <p className="capitalize font-medium text-xs text-gray-500 hidden md:block">
                    {post.postedBy.userName}
                  </p>
                </div>
              </Link>
            </div>
          </div>

          <p className="px-10 text-lg text-gray-600">{post.caption}</p>

          <div className="mt-10 px-10">
            {userProfile && (
              <LikeButton handleChangeLike={handleChangeLike} likes={post.likes} />
            )}
          </div>

          <Comments
            comment={comment}
            handleSetComment={setComment}
            handleAddComment={handleAddComment}
            isPostingComment={isPostingComment}
            comments={post.comments}
          />
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async (
  { params: { id } }:
    { params: { id: string } }
) => {
  const { data } = await axios.get(`${BASE_URL}/api/post/${id}`);
  return {
    props: {
      postDetails: data
    }
  }
}

export default Detail;