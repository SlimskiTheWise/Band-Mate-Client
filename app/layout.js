import { AuthContextProvider } from '@/components/shared/auth-context';
import './globals.css';
import { Navbar } from '@/components/nav/navbar';

export const metadata = {
  title: 'Band-Mate',
  description: '',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <AuthContextProvider>
          <Navbar />
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
