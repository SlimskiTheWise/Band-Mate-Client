import axios from '@/utils/api';

export async function getVerificationCode(email) {
  if (!email) {
    alert('Please provide an email address.');
    return;
  }
  try {
    const res = await axios.post('/auth/send-verification-code', {
      email,
    });

    return res.status;
  } catch (error) {
    console.error('Error sending verification code:', error);
  }
}

export async function verifyEmail(email, verificationCode) {
  try {
    const res = await axios.post('/auth/verify', {
      email,
      code: verificationCode,
    });

    return res.status;
  } catch (error) {
    console.error('Error verifying email:', error);
  }
}
