import Link from 'next/link';

export default function Home() {
  return (
    <main className='space-x-2 p-4'>
      <Link href='/users/signup'>Signup</Link>
      <Link href='/auth/login'>Login</Link>
    </main>
  );
}
