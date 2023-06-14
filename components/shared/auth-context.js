'use client'
import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from '@/utils/api';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userProfile = localStorage.getItem('userProfile');
    if (userProfile) {
      setUser(JSON.parse(userProfile));
    }
  }, []);

  const router = useRouter();
  
  async function login(payload) {
    const loginRes = await axios.post('/auth/login', payload, {
      withCredentials: true,
    });
    if (loginRes.data && loginRes.status === 200) {
      const { data } = await axios.get('/auth/profile', {
        withCredentials: true,
      });
      localStorage.setItem('userProfile', JSON.stringify(data));
      setUser(data);
      router.push('/');
    }
  }

  return (
    <>
      <AuthContext.Provider value={{ user, login }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthContext;
