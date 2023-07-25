'use client';
import axios from '@/utils/api';
import Link from 'next/link';
import React, { useEffect, useState, useCallback } from 'react';

function Button({ content, onClick, active, disabled }) {
  return (
    <button
      className={`flex flex-col cursor-pointer items-center justify-center w-9 h-9 shadow-[0_4px_10px_rgba(0,0,0,0.03)] text-sm font-normal transition-colors rounded-lg
      ${active ? 'bg-black-500 text-gray-600' : 'text-gray-400'}
      ${
        !disabled
          ? 'bg-white hover:bg-grey-300 hover:text-gray-400'
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
  totalPage,
}) {
  const renderPageLinks = useCallback(() => {
    if (pageCount === 0) return null;

    const visiblePageButtonCount =
      totalPage > 0 ? Math.ceil(totalPage / (pageCount + 1)) : 1;
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
  const [users, setUsers] = useState({
    items: [],
    meta: { page: 0, total: 0, take: 0 },
  });
  const [pageIndex, setPageIndex] = useState(0);
  const pageCount = 8;

  const fetchData = async (searchOption) => {
    try {
      const res = await axios.get('/users', {
        params: {
          take: pageCount,
          page: pageIndex + 1,
          ...searchOption,
        },
        headers: {
          Accept: '*/*',
        },
      });
      const { items, meta } = res.data;
      setUsers({ items, meta });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageIndex]);

  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
        <h2 className='sr-only'>Products</h2>
        <div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
          {users?.items?.map((user) => (
            <Link key={user.id} className='group' href={`/users/${user.id}`}>
              <div className='aspect-h-1 aspect-w-1 w-48 h-48 overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7'>
                <img
                  src={`${process.env.NEXT_PUBLIC_S3_URL}${
                    user.profilePictureUrl ?? 'test/blankProfilePicture.webp'
                  }`}
                  alt='Tall slender porcelain bottle with natural clay textured body and cork stopper.'
                  className='h-full w-full object-cover object-center group-hover:opacity-75'
                />
              </div>
              <h3 className='mt-4 text-sm text-gray-700'>{user.username}</h3>
              <p className='mt-1 text-lg font-medium text-gray-900'>
                {user.bio}
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
          totalPage={users.meta.total}
        />
      </div>
    </div>
  );
};

export default Page;
