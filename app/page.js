'use client';
import Link from 'next/link';
import AuthContext from '@/components/shared/auth-context';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import axios from '@/utils/api';
import { useRouter } from 'next/navigation';

export default function Home() {
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
    <main className='space-x-2 p-4'>
      {isLoggedin ? (
        <button
          type='button'
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 mb-4 rounded'
          onClick={logout}
        >
          Logout
        </button>
      ) : (
        <button
          type='button'
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 mb-4 rounded'
        >
          <Link href='/auth/login'>Login</Link>
        </button>
      )}
      <button
        type='button'
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 mb-4 rounded'
      >
        <Link href='/users/signup'>Signup</Link>
      </button>
    </main>
  );
}
