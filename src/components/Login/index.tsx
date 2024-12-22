import Image from 'next/image'
import React from 'react'

const Login = () => {
  return (
    <div className='flex w-[100vw] min-h-screen'>
      {/* Right Section */}
      <div className='flex flex-col justify-center items-center w-1/2 bg-gray-50'>
        <div className='max-w-md w-full p-6 rounded-lg shadow-md bg-white'>
        <Image
          src='/icons/logo.svg'
          alt='Login illustration 1'
          className='my-5'
          width={267}
          height={85}
        />
        
          <form>
            <label
              htmlFor='phone'
              className='block text-sm font-medium text-gray-700 mb-2'>
              برای ورود، شماره موبایل خود را وارد کنید:
            </label>
            <input
              type='text'
              id='phone'
              placeholder='091'
              className='block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7747C0]'
            />
            <button
              type='submit'
              className='mt-6 w-full py-2 text-white bg-[#7747C0] rounded-lg hover:bg-[#6B33AF] transition'>
              ادامه
            </button>
          </form>
        </div>
      </div>
      {/* Left Section */}
      <div className='relative overflow-y-hidden flex flex-col items-center w-1/2 text-white'>
        <Image
          src='/images/login-bg.svg'
          alt='Login illustration 1'
          className='absolute top-0 z-20 rounded-lg shadow-lg object-center w-full '
          width={562}
          height={270}
        />

        <div
          className='absolute inset-0 rounded-r-[30px]'
          style={{
            background: `
              linear-gradient(159deg, #C6C7F8 1.23%, #C5C6F8 6.88%, #C3C2F6 12.52%, #C0BDF3 18.17%, #BAB4F0 23.82%, #B4A9EB 29.47%, #AC9DE5 35.11%, #A38EDF 40.76%, #9A80D9 46.41%, #9171D3 52.06%, #8965CD 57.7%, #835AC8 63.35%, #7D51C5 69%, #7A4CC2 74.65%, #7848C0 80.29%, #7747C0 85.94%)`,
            zIndex: 0,
          }}></div>
        <h1 className='text-[6vh] w-[75%] my-5 font-bold text-center relative z-10'>
          به ساده‌ترین روش، پورسانت‌های خود را مدیریت کنید.
        </h1>
        <div className='relative w-[100%] z-10'>
          <Image
            src='/images/login1.jpg'
            alt='Login illustration 1'
            className='absolute left-[199px] z-10 top-[190px] rounded-lg shadow-lg'
            width={449}
            height={315}
          />
          <Image
            src='/images/login2.jpg'
            alt='Login illustration 1'
            className='absolute left-[68px] rounded-lg shadow-lg'
            width={439}
            height={389}
          />
        </div>
      </div>
    </div>
  )
}

export default Login
