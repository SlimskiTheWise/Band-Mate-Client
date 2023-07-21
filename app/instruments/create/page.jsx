'use client';
import React, { useState } from 'react';
import axios from '@/utils/api';
import InputField from '@/components/input';
import { Location } from '../enums/instrument-location.enum';
import { Type } from '../enums/instrument-type.enum';
import { Condition } from '../enums/instument-condition.enum';
import { useRouter } from 'next/navigation';

function Page() {
  const router = useRouter();
  const [instrument, setInstrument] = useState({
    title: '',
    description: '',
    price: 0,
    location: '',
    condition: '',
    type: '',
    instrumentPicture: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInstrument((prevSignUp) => ({ ...prevSignUp, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setInstrument((prevSignUp) => ({ ...prevSignUp, instrumentPicture: file }));
  };

  async function onSubmit() {
    console.log(instrument);
    try {
      const res = await axios.post('/instruments', instrument, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (res?.status === 201) {
        router.push('/');
      }
    } catch (e) {
      console.error(e);
    }
  }


  return (
    <div className='bg-grey-lighter min-h-screen flex flex-col'>
      <div className='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2'>
        <div className='bg-white px-6 py-8 rounded shadow-md text-black w-full'>
          <InputField
            name='title'
            value={instrument.title}
            placeholder='Title'
            handleChange={handleChange}
          />
          <InputField
            name='description'
            value={instrument.description}
            placeholder='Description'
            handleChange={handleChange}
          />
          <InputField
            name='price'
            value={instrument.price}
            placeholder='Price'
            handleChange={handleChange}
          />
          <select name='location' className='mb-4' onChange={handleChange}>
            <option>Location</option>
            {Object.values(Location).map((location) => (
              <option key={location} value={instrument.location}>
                {location}
              </option>
            ))}
          </select>
          <select name='type' className='mb-4' onChange={handleChange}>
            <option>Type of Instrument</option>
            {Object.values(Type).map((type) => (
              <option key={type} value={instrument.type}>
                {type}
              </option>
            ))}
          </select>
          <select name='condition' className='mb-4' onChange={handleChange}>
            <option>Condition of Instrument</option>
            {Object.values(Condition).map((condition) => (
              <option key={condition} value={instrument.condition}>
                {condition}
              </option>
            ))}
          </select>
          <InputField
            type='file'
            name='instrumentImage'
            handleChange={handleFileChange}
          />
          <button
            type='submit'
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            onClick={onSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Page;
