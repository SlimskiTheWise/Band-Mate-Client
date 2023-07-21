'use client';
import axios from '@/utils/api';
import Link from 'next/link';
import React, { useEffect, useState, useCallback } from 'react';

function Button({ content, onClick, active, disabled }) {
  return (
    <button
      className={`flex flex-col cursor-pointer items-center justify-center w-9 h-9 shadow-[0_4px_10px_rgba(0,0,0,0.03)] text-sm font-normal transition-colors rounded-lg
      ${active ? 'bg-grey-300 text-white' : 'text-grey-300'}
      ${
        !disabled
          ? 'bg-white hover:bg-grey-300 hover:text-white'
          : 'text-grey-200 bg-white cursor-not-allowed'
      }
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
}

function PaginationNav({
  gotoPage,
  canPreviousPage,
  canNextPage,
  pageCount,
  pageIndex,
}) {
  const renderPageLinks = useCallback(() => {
    if (pageCount === 0) return null;

    const visiblePageButtonCount = 3;
    let numberOfButtons =
      pageCount < visiblePageButtonCount ? pageCount : visiblePageButtonCount;

    const pageIndices = [pageIndex];
    numberOfButtons--;

    [...Array(numberOfButtons)].forEach((_item, itemIndex) => {
      const pageNumberBefore = pageIndices[0] - 1;
      const pageNumberAfter = pageIndices[pageIndices.length - 1] + 1;

      if (
        pageNumberBefore >= 0 &&
        (itemIndex < numberOfButtons / 2 || pageNumberAfter > pageCount - 1)
      ) {
        pageIndices.unshift(pageNumberBefore);
      } else {
        pageIndices.push(pageNumberAfter);
      }
    });

    return pageIndices.map((pageIndexToMap) => (
      <li key={pageIndexToMap}>
        <Button
          content={pageIndexToMap + 1}
          onClick={() => gotoPage(pageIndexToMap)}
          active={pageIndex === pageIndexToMap}
        />
      </li>
    ));
  }, [pageCount, pageIndex]);
  return (
    <ul className='flex gap-2'>
      <li>
        <Button
          content={'<<'}
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        />
      </li>
      {renderPageLinks()}
      <li>
        <Button
          content={'>>'}
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        />
      </li>
    </ul>
  );
}

const Page = () => {
  const [instruments, setInstruments] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const pageCount = 8;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/instruments', {
          params: {
            take: pageCount,
            page: pageIndex + 1,
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
  }, [pageIndex]);

  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
        <h2 className='sr-only'>Products</h2>

        <div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
          {instruments?.items?.map((instrument) => (
            <Link
              key={instrument.id}
              className='group'
              href={`/instruments/${instrument.id}`}
            >
              <div className='aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7'>
                <img
                  src={`${process.env.NEXT_PUBLIC_S3_URL}${instrument?.picture}`}
                  alt='Tall slender porcelain bottle with natural clay textured body and cork stopper.'
                  className='h-full w-full object-cover object-center group-hover:opacity-75'
                />
              </div>
              <h3 className='mt-4 text-sm text-gray-700'>{instrument.title}</h3>
              <p className='mt-1 text-lg font-medium text-gray-900'>
                ₩{instrument.price}
              </p>
            </Link>
          ))}
        </div>
      </div>
      <div className='flex justify-center mb-20'>
        <PaginationNav
          gotoPage={setPageIndex}
          canPreviousPage={pageIndex > 0}
          canNextPage={pageIndex < pageCount - 1}
          pageCount={pageCount}
          pageIndex={pageIndex}
        />
      </div>
    </div>
  );
};

export default Page;
