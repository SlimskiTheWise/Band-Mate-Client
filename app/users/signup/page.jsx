'use client';
import React, { useState } from 'react';
import axios from '@/utils/api';
import InputField from '@/components/input';
import { useRouter } from 'next/navigation';
import { getVerificationCode, verifyEmail } from '../utils/email-verification';

function Page() {
  const router = useRouter();

  const [signUp, setSignUp] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    password2: '',
    verificationCode: '',
    profilePictureUrl: null,
  });
  const [isSent, setIsSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUp((prevSignUp) => ({ ...prevSignUp, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSignUp((prevSignUp) => ({ ...prevSignUp, profilePictureUrl: file }));
  };

  async function handleSendCode() {
    if (!signUp.email) {
      alert('Please provide an email address.');
      return;
    }
    const status = await getVerificationCode(signUp.email);

    if (status === 201) {
      setIsSent(true);
    }
  }

  async function handleVerifyEmail() {
    if (!signUp.email || !verificationCode) {
      alert('Please provide both email and verification code.');
      return;
    }

    const status = await verifyEmail(signUp.email, verificationCode);

    if (status === 201) {
      setIsSent(false);
      alert('Email verified!');
    }
  }

  async function onSubmit() {
    if (password !== password2) {
      alert('passwords not matching');
      return;
    }

    try {
      const res = await axios.post('/users', signUp, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (res?.status === 201) {
        router.push('/');
      }
    } catch (e) {
      console.error(e);
    }
  }

  const { name, username, email, password, password2 } = signUp;

  return (
    <div className='bg-grey-lighter min-h-screen flex flex-col'>
      <div className='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2'>
        <div className='bg-white px-6 py-8 rounded shadow-md text-black w-full'>
          <h1 className='mb-8 text-3xl text-center'>Sign up</h1>
          <InputField
            name='name'
            value={name}
            placeholder='Full Name'
            handleChange={handleChange}
          />
          <InputField
            name='username'
            value={username}
            placeholder='Username'
            handleChange={handleChange}
          />
          <InputField
            name='email'
            value={email}
            placeholder='Email'
            handleChange={handleChange}
          />
          <button
            type='button'
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 mb-4 rounded'
            onClick={handleSendCode}
          >
            Send Verification Code
          </button>
          {isSent && (
            <>
              <InputField
                name='verificationCode'
                value={verificationCode}
                placeholder='Verification Code'
                handleChange={(e) => setVerificationCode(e.target.value)}
              />
              <button
                type='button'
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 mb-4 rounded'
                onClick={handleVerifyEmail}
              >
                Verify Email
              </button>
            </>
          )}
          <InputField
            type='password'
            name='password'
            value={password}
            placeholder='Password'
            handleChange={handleChange}
          />
          <InputField
            type='password'
            name='password2'
            value={password2}
            placeholder='Confirm Password'
            handleChange={handleChange}
          />
          <InputField
            type='file'
            name='profilePictureUrl'
            handleChange={handleFileChange}
          />
          <button
            type='submit'
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            onClick={onSubmit}
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default Page;
