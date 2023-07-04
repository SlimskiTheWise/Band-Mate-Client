export default function Home() {
  return (
    <section className='mb-48'>
      <div className='bg-neutral-50 py-24 px-6 text-center dark:bg-neutral-20'>
        <h1 className='mt-2 mb-16 text-5xl font-bold tracking-tight md:text-6xl xl:text-7xl'>
          Meet and Play <br />
          <span className='text-primary'>and Sell</span>
        </h1>
        <a
          className='mb-2 inline-block rounded bg-primary px-12 pt-4 pb-3.5 text-sm font-medium leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 md:mr-2 md:mb-0'
          data-te-ripple-init
          data-te-ripple-color='light'
          role='button'
        >
          Meet
        </a>
        <a
           className='mb-2 inline-block rounded bg-primary px-12 pt-4 pb-3.5 text-sm font-medium leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 md:mr-2 md:mb-0'
           data-te-ripple-init
           data-te-ripple-color='light'
           role='button'
        >
          Buy&Sell
        </a>
      </div>
    </section>
  );
}
