'use client';
import { useEffect, useState } from 'react';
import axios from '@/utils/api';

const Page = ({ params }) => {
  const [instrument, setInstrument] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/instruments/${params.instrumentId}`);
        console.log(res.data);
        setInstrument(res?.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [params.userId]);

  return (
    <>
      <section className='text-gray-700 body-font overflow-hidden bg-white'>
        <div className='container px-5 py-24 mx-auto'>
          <div className='lg:w-4/5 mx-auto flex flex-wrap'>
            <img
              alt='ecommerce'
              className='lg:w-1/2 w-full object-cover object-center rounded border border-gray-200'
              src={`${process.env.NEXT_PUBLIC_S3_URL}${instrument?.picture}`}
            />
            <div className='lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0'>
              <h2 className='text-sm title-font text-gray-500 tracking-widest'>
                {instrument?.type}
              </h2>
              <h1 className='text-gray-900 text-3xl title-font font-medium mb-1'>
                {instrument?.title}
              </h1>
              <div className='flex mb-4'>
                <span className='text-gray-600'>Created At:</span>

                <span className='text-gray-600 ml-4'>
                  {instrument?.createdAt}
                </span>
              </div>
              <p className='leading-relaxed'>{instrument?.description}</p>
              <div className='flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5'>
                <div className='flex'>
                  <span className='mr-3'>Location:</span>
                  <span className='mr-3'> {instrument?.location}</span>
                </div>
                <div className='flex ml-6 items-center'>
                  <span className='mr-3'>Condition:</span>
                  <div className='relative'>
                    <span className='mr-3'> {instrument?.condition}</span>
                  </div>
                </div>
              </div>
              <div className='flex'>
                <span className='title-font font-medium text-2xl text-gray-900'>
                  ₩{instrument?.price}
                </span>
                <button className='flex ml-auto inline-block rounded bg-primary px-12 pt-2 pb-2 text-sm font-medium leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 md:mr-2 md:mb-0'>
                  Contact
                </button>
                <button className='rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4'>
                  <svg
                    fill='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='w-5 h-5'
                    viewBox='0 0 24 24'
                  >
                    <path d='M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z'></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
