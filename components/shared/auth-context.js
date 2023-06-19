'use client';
import { createContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import axios from '@/utils/api';

const AuthContext = createContext();

async function getUserProfile(setUser) {
  const response = await axios.get('/auth/profile');
  if (response?.status === 200) {
    localStorage.setItem('userProfile', JSON.stringify(response.data));
    setUser(response?.data);
  }
}

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const fetchAndSetUser = useCallback(async () => {
    try {
      await getUserProfile(setUser);
    } catch (error) {
      if (error.response?.data?.message === 'Access token has expired') {
        await axios.get('auth/refresh-token');
      }
      await getUserProfile(setUser);
    }
  }, []);
  useEffect(() => {
    fetchAndSetUser(false);
  }, [fetchAndSetUser]);

  const router = useRouter();

  async function login(payload) {
    const loginRes = await axios.post('/auth/login', payload, {
      withCredentials: true,
    });
    await getUserProfile(setUser);
    if (loginRes.data && loginRes.status === 200) {
      router.replace('/');
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
