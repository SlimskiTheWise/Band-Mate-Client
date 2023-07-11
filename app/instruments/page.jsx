'use client';
import axios from '@/utils/api';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Page = () => {
  const [instruments, setInstruments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/instruments', {
          params: {
            take: 8,
            page: 1,
            minimumPrice: 0,
            maximumPrice: 100000000,
          },
          headers: {
            Accept: '*/*',
          },
        });
        setInstruments(res?.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
        <h2 className='sr-only'>Products</h2>

        <div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
          {instruments.items?.map((instrument) => (
            <Link className='group' href={`/instruments/${instrument.id}`}>
              <div key={instrument.id} className='aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7'>
                <img
                   src={`${process.env.NEXT_PUBLIC_S3_URL}${instrument?.picture}`}
                  alt='Tall slender porcelain bottle with natural clay textured body and cork stopper.'
                  className='h-full w-full object-cover object-center group-hover:opacity-75'
                />
              </div>
              <h3 className='mt-4 text-sm text-gray-700'>{instrument.title}</h3>
              <p className='mt-1 text-lg font-medium text-gray-900'>₩{instrument.price}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
