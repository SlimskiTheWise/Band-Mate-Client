'use client';
import { createContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import axios from '@/utils/api';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchAndSetUser = useCallback(() => {
    axios
      .get('/auth/profile', {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 401) {
          return;
        }
        localStorage.setItem('userProfile', JSON.stringify(response.data));
        setUser(data);
      })
      .catch(() => {});
  }, []);
  useEffect(() => {
    fetchAndSetUser(false);
  }, [fetchAndSetUser]);

  const router = useRouter();

  async function login(payload) {
    const loginRes = await axios.post('/auth/login', payload, {
      withCredentials: true,
    });
    if (loginRes.data && loginRes.status === 200) {
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
