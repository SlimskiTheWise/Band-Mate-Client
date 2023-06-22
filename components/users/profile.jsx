'use client';
import React, { useEffect, useState } from 'react';
import axios from '@/utils/api';

export function Profile({ user, loggedInUser }) {
  const [isLoggedInUserFollowing, setIsLoggedInUserFollowing] = useState(false);
  const [followingCount, setFollowingCount] = useState();
  const [followersCount, setFollowersCount] = useState();

  async function onFollow() {
    setIsLoggedInUserFollowing(true);
    setFollowersCount(followersCount + 1);
    await axios.get(`followers/${user.id}`);
  }

  async function onUnfollow() {
    setIsLoggedInUserFollowing(false);
    setFollowersCount(followersCount - 1);
    await axios.delete(`followers/${user.id}`);
  }

  useEffect(() => {
    const setFollowing = () => {
      user.followersAndFollowing.followers.forEach((follower) => {
        if (follower.followingUserId === loggedInUser?.id) {
          setIsLoggedInUserFollowing(true);
        }
      });
    };
    setFollowersCount(user.followersAndFollowing.followers.length);
    setFollowingCount(user.followersAndFollowing.following.length);
    setFollowing();
  }, [user]);

  return (
    <>
      <ProfilePicture profilePictureUrl={user.profilePictureUrl} />
      <div className='flex items-center'>
        <h1 className='text-gray-900 font-bold text-xl leading-8 my-1'>
          {user.username}
        </h1>
        {loggedInUser && loggedInUser?.id !== user.id && (
          <FollowButton
            isLoggedInUserFollowing={isLoggedInUserFollowing}
            onFollow={onFollow}
            onUnfollow={onUnfollow}
          />
        )}
      </div>

      <p className='text-sm text-gray-500 hover:text-gray-600 leading-6'>
        {user.bio}
      </p>
      <ul className='bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-2 divide-y rounded shadow-sm'>
        <li className='flex items-center py-2'>
          <span>Interests:</span>
          <span className='ml-auto'>
            {user.userInterests?.map((ui, index) => (
              <span key={index}>{ui} </span>
            ))}
          </span>
        </li>
        <li className='flex items-center py-2'>
          <span>Following</span>
          <span className='ml-auto'>{followingCount}</span>
        </li>
        <li className='flex items-center py-2'>
          <span>Followers</span>
          <span className='ml-auto'>{followersCount}</span>
        </li>
      </ul>
    </>
  );
}

function ProfilePicture({ profilePictureUrl }) {
  return (
    <div className='image overflow-hidden'>
      <img
        className='h-auto w-full mx-auto'
        src={`${process.env.NEXT_PUBLIC_S3_URL}${
          profilePictureUrl ?? 'test/blankProfilePicture.webp'
        }`}
        alt=''
      />
    </div>
  );
}

function FollowButton({ isLoggedInUserFollowing, onFollow, onUnfollow }) {
  return (
    <span>
      {isLoggedInUserFollowing ? (
        <button
          type='button'
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded'
          onClick={onUnfollow}
        >
          Unfollow
        </button>
      ) : (
        <button
          type='button'
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded'
          onClick={onFollow}
        >
          Follow
        </button>
      )}
    </span>
  );
}
