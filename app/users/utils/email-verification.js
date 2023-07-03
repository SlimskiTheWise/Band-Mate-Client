import axios from '@/utils/api';
import { EmailVerificationType } from './enums/email-verification.enum';

export async function getVerificationCode(email, type = EmailVerificationType.SIGNUP) {
  if (!email) {
    alert('Please provide an email address.');
    return;
  }
  try {
    const res = await axios.post('/auth/send-verification-code', {
      email,
      type,
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

    return res?.status;
  } catch (error) {
    console.error('Error verifying email:', error);
  }
}
