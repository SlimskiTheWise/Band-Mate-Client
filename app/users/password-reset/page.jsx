'use client';
import InputField from '@/components/input';
import axios from '@/utils/api';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function Page() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [email, setEmail] = useState('');

  async function onSubmit() {
    if (password !== passwordConfirm) {
      alert('password not matching!');
    }

    try {
      const { status } = await axios.post('/users/password-reset', {
        email,
        password,
      });
      if (status === 201) {
        router.push('/');
      }
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <div className='bg-grey-lighter min-h-screen flex flex-col'>
      <div className='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2'>
        <div className='bg-white px-6 py-8 rounded shadow-md text-black w-full'>
          <h1 className='mb-8 text-3xl text-center'>Password Reset</h1>
          <InputField
            type='email'
            name='email'
            value={email}
            placeholder='Email'
            handleChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            type='password'
            name='password'
            value={password}
            placeholder='Password'
            handleChange={(e) => setPassword(e.target.value)}
          />
          <InputField
            type='passworConfirm'
            name='passwordConfirm'
            value={passwordConfirm}
            placeholder='Confirm Password'
            handleChange={(e) => setPasswordConfirm(e.target.value)}
          />
          <div className='flex justify-between'>
            <button
              type='submit'
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
              onClick={onSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
