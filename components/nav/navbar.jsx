'use client';
import Link from 'next/link';
import AuthContext from '@/components/shared/auth-context';
import React, { useContext, useEffect, useState } from 'react';
import axios from '@/utils/api';
import { useRouter } from 'next/navigation';

export const Navbar = () => {
  const router = useRouter();
  const context = useContext(AuthContext);

  let loggedInUser = context?.user;

  const [isLoggedin, setIsLoggedIn] = useState(false);

  async function logout() {
    setIsLoggedIn(false);
    loggedInUser = null;
    localStorage.removeItem('userProfile');
    await axios.post('/auth/logout');
    router.replace('/');
  }

  useEffect(() => {
    setIsLoggedIn(loggedInUser ? true : false);
  }, [loggedInUser]);
  return (
    <nav className='relative flex w-full flex-nowrap items-center justify-between bg-[#FBFBFB] py-2 text-neutral-500 shadow-lg lg:flex-wrap lg:justify-start lg:py-4'>
      <div className='flex w-full flex-wrap items-center justify-between px-3'>
        <div className='mt-2 hidden flex-grow items-center lg:mt-0 lg:!flex lg:basis-auto'>
          <ul className='list-style-none ml-auto flex flex-col pl-0 lg:mt-1 lg:flex-row'>
            <li className='my-4 pl-2 lg:my-0 lg:pl-2 lg:pr-2 hover:text-neutral-700'>
              <Link href='/'>Home</Link>
            </li>
            {isLoggedin ? (
              <>
                <li className='mb-4 pl-2 lg:mb-0 lg:pl-0 lg:pr-2 hover:text-neutral-700'>
                  <button type='button' onClick={logout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className='mb-4 pl-2 lg:mb-0 lg:pl-0 lg:pr-2 hover:text-neutral-700'>
                  <Link href='/auth/login'>Login</Link>
                </li>
                <li className='mb-4 pl-2 lg:mb-0 lg:pl-0 lg:pr-2 hover:text-neutral-700'>
                  <Link href='/users/signup'>Signup</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
