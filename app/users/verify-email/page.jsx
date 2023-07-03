'use client';
import InputField from '@/components/input';
import { useState } from 'react';
import { getVerificationCode, verifyEmail } from '../utils/email-verification';
import { EmailVerificationType } from '../utils/enums/email-verification.enum';
import { useRouter } from 'next/navigation';

function Page() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  async function handleSendCode() {
    if (!email) {
      alert('Please provide an email address.');
      return;
    }
    const status = await getVerificationCode(
      email,
      EmailVerificationType.PASSWORD_RESET
    );

    if (status === 201) {
      setIsSent(true);
    }
  }

  async function handleVerifyEmail() {
    if (!email || !verificationCode) {
      alert('Please provide both email and verification code.');
      return;
    }

    const status = await verifyEmail(email, verificationCode);

    if (status === 201) {
      setIsSent(false);
      alert('Email verified!');
      router.push('/users/password-reset');
    }
  }

  return (
    <div className='bg-grey-lighter min-h-screen flex flex-col'>
      <div className='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2'>
        <div className='bg-white px-6 py-8 rounded shadow-md text-black w-full'>
          <h1 className='mb-8 text-3xl text-center'>
            What is your email address?
          </h1>
          <InputField
            name='email'
            value={email}
            placeholder='Email'
            handleChange={handleChange}
          />
          <button
            type='button'
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-4 rounded'
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
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 mb-4 rounded'
                onClick={handleVerifyEmail}
              >
                Verify Email
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
