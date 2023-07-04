'use client';
import AuthContext from '@/components/shared/auth-context';
import { Instrument } from '@/components/users/instrument';
import { Profile } from '@/components/users/profile';
import axios from '@/utils/api';
import { useContext, useEffect, useState } from 'react';

export default function Page({ params }) {
  const loggedInUser = useContext(AuthContext).user;

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/users/${params.userId}`);
        setUser(res?.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [params.userId]);
  return (
    <>
      {user && (
        <div className='container mx-auto my-5 p-5 mb-9'>
          <div className='md:flex no-wrap md:-mx-2 '>
            <div className='w-full md:w-3/12 md:mx-2'>
              <div className='bg-neutral-50 p-3 border-t-4 border-neutral-70'>
                <Profile user={user} loggedInUser={loggedInUser} />
              </div>
            </div>
            <div className='overflow-scroll md:w-9/12 mx-2'>
              {user.instruments?.map((instrument) => (
                <Instrument instrument={instrument} key={instrument.id} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
