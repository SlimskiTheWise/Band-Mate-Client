'use client';
import React, { useContext } from 'react';
import Link from 'next/link';
import InputField from '@/components/input';
import { useState } from 'react';
import AuthContext from '@/components/shared/auth-context';
import { useRouter } from 'next/navigation';

function Page() {
  const router = useRouter();
  const [loginBody, setLoginBody] = useState({
    email: '',
    password: '',
  });
  const context = useContext(AuthContext);

  function handleChange(e) {
    const { name, value } = e.target;
    setLoginBody((prevLoign) => ({ ...prevLoign, [name]: value }));
  }

  async function onSubmit() {
    await context.login(loginBody);
  }

  async function handleGoogleLogin() {
    router.push(`${process.env.NEXT_PUBLIC_API_URL}/auth/google/login`);
  }

  const { email, password } = loginBody;
  return (
    <div className='bg-grey-lighter min-h-screen flex flex-col'>
      <div className='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2'>
        <div className='bg-white px-6 py-8 rounded shadow-md text-black w-full'>
          <h1 className='mb-8 text-3xl text-center'>Login</h1>
          <InputField
            name='email'
            value={email}
            placeholder='Email'
            handleChange={handleChange}
          />
          <InputField
            type='password'
            name='password'
            value={password}
            placeholder='Password'
            handleChange={handleChange}
          />
          <div className='flex justify-between'>
            <button
              type='submit'
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
              onClick={onSubmit}
            >
              Login
            </button>
            <button
              type='submit'
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
              onClick={handleGoogleLogin}
            >
              GoogleLogin
            </button>
          </div>
        </div>
        <div className='text-grey-dark mt-6'>
          <Link
            href='/forget'
            className='text-xs text-blue-600 hover:underline mr-2'
          >
            Forget Password?
          </Link>
          <Link
            href='/users/signup'
            className='text-xs text-blue-600 hover:underline ml-2'
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Page;
