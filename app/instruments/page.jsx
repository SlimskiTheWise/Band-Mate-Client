'use client';
import axios from '@/utils/api';
import Link from 'next/link';
import React, { useEffect, useState, useCallback } from 'react';
import { SearchOptions } from './enums/search-option.enum';

function SearchBar({ onSearch }) {
  const [category, setCategory] = useState('All categories');
  const [searchInput, setSearchInput] = useState('');
  const [open, setOpen] = React.useState(false);

  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
    handleOpen();
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchQuery = { [category]: searchInput };
    onSearch(searchQuery);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex'>
        <label
          htmlFor='search-dropdown'
          className='mb-2 text-sm font-medium text-gray-200 sr-only'
        >
          Search Category
        </label>
        <button
          id='dropdown-button'
          data-dropdown-toggle='dropdown'
          className='flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-300 dark:bg-neutral-600 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600'
          type='button'
          onClick={handleOpen}
        >
          {category}
          <svg
            className='w-2.5 h-2.5 ml-2.5'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 10 6'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='m1 1 4 4 4-4'
            />
          </svg>
        </button>
        {open ? (
          <div
            id='dropdown'
            className='z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700'
          >
            <ul
              className='py-2 text-sm text-gray-700 dark:text-gray-200'
              aria-labelledby='dropdown-button'
            >
              {Object.values(SearchOptions).map((value, index) => (
                <li key={index}>
                  <button
                    type='button'
                    onClick={() => handleCategoryChange(value)}
                    className='inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                  >
                    {value}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <></>
        )}

        <div className='relative w-full'>
          <input
            type='search'
            id='search-dropdown'
            className='block p-2.5 w-full z-20 text-sm text-gray-900 dark:bg-neutral-600 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:dark:bg-neutral-600 focus:dark:bg-neutral-600 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500'
            placeholder='Search...'
            value={searchInput}
            onChange={handleSearchInputChange}
            required
          />
          <button
            type='submit'
            className='absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-gray-700 rounded-r-lg border border-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:dark:bg-neutral-600 dark:bg-gray-600 dark:hover:dark:bg-neutral-600 dark:focus:ring-gray-800'
          >
            <svg
              className='w-4 h-4'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 20 20'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
              />
            </svg>
            <span className='sr-only'>Search</span>
          </button>
        </div>
      </div>
    </form>
  );
}

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
  const [instruments, setInstruments] = useState({
    items: [],
    meta: { page: 0, total: 0, take: 0 },
  });
  const [pageIndex, setPageIndex] = useState(0);
  const pageCount = 8;

  const fetchData = async (searchOption) => {
    try {
      const res = await axios.get('/instruments', {
        params: {
          take: pageCount,
          page: pageIndex + 1,
          minimumPrice: 0,
          maximumPrice: 100000000,
          ...searchOption,
        },
        headers: {
          Accept: '*/*',
        },
      });
      const { items, meta } = res.data;
      setInstruments({ items, meta });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageIndex]);
  return (
    <div className='bg-white'>
      <SearchBar onSearch={fetchData} />
      <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
        <h2 className='sr-only'>Products</h2>
        <div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
          {instruments?.items?.map((instrument) => (
            <Link
              key={instrument.id}
              className='group'
              href={`/instruments/${instrument.id}`}
            >
              <div className='aspect-h-1 aspect-w-1 w-48 h-48 overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7'>
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
          totalPage={instruments.meta.total}
        />
      </div>
    </div>
  );
};

export default Page;
