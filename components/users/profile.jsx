export function Profile({ user }) {
    return (
      <>
        <div className='image overflow-hidden'>
          <img
            className='h-auto w-full mx-auto'
            src={`https://nestjs-project.s3.ap-northeast-2.amazonaws.com/${user.profilePictureUrl}`}
            alt=''
          />
        </div>
        <h1 className='text-gray-900 font-bold text-xl leading-8 my-1'>
          {user.username}
        </h1>
        <p className='text-sm text-gray-500 hover:text-gray-600 leading-6'>
          {user.bio}
        </p>
        <ul className='bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-2 divide-y rounded shadow-sm'>
          <li className='flex items-center py-2'>
            <span>Interests:</span>
            <span className='ml-auto'>
              {user.userInterests[0]} {user.userInterests[1]}
            </span>
          </li>
          <li className='flex items-center py-2'>
            <span>Following</span>
            <span className='ml-auto'>
              {user.followersAndFollowing.following}
            </span>
          </li>
          <li className='flex items-center py-2'>
            <span>Followers</span>
            <span className='ml-auto'>
              {user.followersAndFollowing.followers}
            </span>
          </li>
        </ul>
      </>
    );
  }