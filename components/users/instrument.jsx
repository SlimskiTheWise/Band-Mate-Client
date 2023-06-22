export function Instrument({ instrument }) {
  return (
    <>
      <div className='bg-white p-3 shadow-sm rounded-sm mt-3'>
        <div className='grid grid-cols-2'>
          <div>
            <div className='flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3'>
              <span clas='text-green-500'>Title:</span>
              <span className='tracking-wide'></span>
            </div>
            <ul className='list-inside space-y-2'>
              <li>
                <div className='text-gray-500 text-xs'>Created At:</div>
              </li>
              <li>
                <div className='text-gray-500 text-xs'>Price:</div>
              </li>
            </ul>
          </div>
          <div>
            <div className='flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3'>
              <span clas='text-green-500'>{instrument.title}</span>
              <span className='tracking-wide'></span>
            </div>
            <ul className='list-inside space-y-2'>
              <li>
                <div className='text-gray-500 text-xs'>
                  {instrument.createdAt}
                </div>
              </li>
              <li>
                <div className='text-gray-500 text-xs'>{instrument.price}</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
