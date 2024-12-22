// 'use client'
// import Image from 'next/image'
// import React, { useState } from 'react'
// import OTPInput from '../shared/OTPinput'

// const Login = () => {
//   const [inputState, setInputState] = useState<'mobile' | 'otp' | 'password'>(
//     'mobile'
//   )
//   const [mobile, setMobile] = useState('')
//   const [password, setPassword] = useState('')

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     if (inputState === 'mobile') {
//       console.log(`Mobile entered: ${mobile}`)
//       setInputState('otp') // Move to OTP state after entering mobile
//     }
//   }

//   const handleLoginWithPassword = () => {
//     setInputState('password')
//   }

//   const handleLoginWithOTP = () => {
//     setInputState('otp')
//   }

//   return (
//     <div className='flex w-[100vw] min-h-screen bg-white'>
//       {/* Right Section */}
//       <div className='flex flex-col justify-center items-center w-1/2'>
//         <div className='w-full px-20'>
//           <Image
//             src='/icons/logo.svg'
//             alt='Login illustration 1'
//             className='mb-5'
//             width={267}
//             height={85}
//           />
//           <form onSubmit={handleSubmit}>
//             {inputState === 'mobile' && (
//               <>
//                 <label
//                   htmlFor='phone'
//                   className='block text-sm font-medium text-gray-700 mb-2'>
//                   برای ورود، شماره موبایل خود را وارد کنید:
//                 </label>
//                 <input
//                   type='text'
//                   id='phone'
//                   value={mobile}
//                   onChange={(e) => setMobile(e.target.value)}
//                   placeholder='091'
//                   className='block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7747C0]'
//                 />
//                 <button
//                   type='submit'
//                   className='mt-6 w-full py-2 text-white bg-[#7747C0] rounded-lg hover:bg-[#6B33AF] transition'>
//                   ادامه
//                 </button>
//               </>
//             )}

//             {inputState === 'password' && (
//               <>
//                 <label
//                   htmlFor='password'
//                   className='block text-sm font-medium text-gray-700 mb-2'>
//                   رمز عبور خود را وارد کنید:
//                 </label>
//                 <input
//                   type='password'
//                   id='password'
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder='••••••••'
//                   className='block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7747C0]'
//                 />
//               </>
//             )}

//             {inputState === 'otp' && <OTPInput setResult={setPassword} />}
//             {(inputState === 'password' || inputState === 'otp') && (
//               <div className='flex gap-5 mt-6'>
//                 <button
//                   type='button'
//                   onClick={handleLoginWithPassword}
//                   className={`w-full py-2 px-4 text-white bg-[#7747C0] rounded-lg hover:bg-[#6B33AF] transition ${
//                     inputState === 'password'
//                       ? 'opacity-50 cursor-not-allowed'
//                       : ''
//                   }`}
//                   disabled={inputState === 'password'}>
//                   ورود با رمز عبور
//                 </button>
//                 <button
//                   type='button'
//                   onClick={handleLoginWithOTP}
//                   className={`w-full py-2 px-4 text-white bg-[#7747C0] rounded-lg hover:bg-[#6B33AF] transition ${
//                     inputState === 'otp' ? 'opacity-50 cursor-not-allowed' : ''
//                   }`}
//                   disabled={inputState === 'otp'}>
//                   ورود با کد یکبار مصرف
//                 </button>
//               </div>
//             )}
//           </form>
//         </div>
//       </div>

//       {/* Left Section */}
//       <div className='relative overflow-y-hidden flex flex-col items-center w-1/2 text-white'>
//         <Image
//           src='/images/login-bg.svg'
//           alt='Login illustration 1'
//           className='absolute top-0 z-20 rounded-lg shadow-lg object-center w-full '
//           width={562}
//           height={270}
//         />
//         <div
//           className='absolute inset-0 rounded-r-[30px]'
//           style={{
//             background: `
//               linear-gradient(159deg, #C6C7F8 1.23%, #C5C6F8 6.88%, #C3C2F6 12.52%, #C0BDF3 18.17%, #BAB4F0 23.82%, #B4A9EB 29.47%, #AC9DE5 35.11%, #A38EDF 40.76%, #9A80D9 46.41%, #9171D3 52.06%, #8965CD 57.7%, #835AC8 63.35%, #7D51C5 69%, #7A4CC2 74.65%, #7848C0 80.29%, #7747C0 85.94%)`,
//             zIndex: 0,
//           }}></div>
//         <h1 className='text-[6vh] w-[75%] my-5 font-bold text-center relative z-10'>
//           به ساده‌ترین روش، پورسانت‌های خود را مدیریت کنید.
//         </h1>
//         <div className='relative w-[100%] z-10'>
//           <Image
//             src='/images/login1.jpg'
//             alt='Login illustration 1'
//             className='absolute left-[199px] z-10 top-[190px] rounded-lg shadow-lg'
//             width={449}
//             height={315}
//           />
//           <Image
//             src='/images/login2.jpg'
//             alt='Login illustration 1'
//             className='absolute left-[68px] rounded-lg shadow-lg'
//             width={439}
//             height={389}
//           />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Login

'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import OTPInput from '../shared/OTPinput'

const Login = () => {
  const [inputState, setInputState] = useState<'mobile' | 'otp' | 'password'>(
    'mobile'
  )
  const [mobile, setMobile] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(
      `Submitting form with state: ${inputState}, mobile: ${mobile}, password: ${password}`
    )
    // Add your login logic here
  }

  const handleLoginWithPassword = () => {
    setInputState('password')
  }

  const handleLoginWithOTP = () => {
    setInputState('otp')
  }

  return (
    <div className='flex w-[100vw] min-h-screen bg-white'>
      {/* Right Section */}
      <div className='flex flex-col justify-center items-center w-1/2'>
        <div className='w-full px-20'>
          <Image
            src='/icons/logo.svg'
            alt='Login illustration 1'
            className='mb-5'
            width={267}
            height={85}
          />
          <form onSubmit={handleSubmit}>
            {inputState === 'mobile' && (
              <>
                <label
                  htmlFor='phone'
                  className='block text-sm font-medium text-gray-700 mb-2'>
                  برای ورود، شماره موبایل خود را وارد کنید:
                </label>
                <input
                  type='text'
                  id='phone'
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder='091'
                  className='block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7747C0]'
                />
              </>
            )}

            {inputState === 'password' && (
              <>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium text-gray-700 mb-2'>
                  رمز عبور خود را وارد کنید:
                </label>
                <input
                  type='password'
                  id='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='••••••••'
                  className='block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7747C0]'
                />
              </>
            )}

            {inputState === 'otp' && <OTPInput setResult={setPassword} />}

            <div className='flex flex-col gap-4 mt-6'>
              {inputState === 'mobile' ? (
                <button
                  onClick={() =>setInputState('password')}
                  className='fill-button h-10 w-full rounded-lg transition'>
                  {inputState === 'mobile' ? 'ادامه' : 'ورود'}
                </button>
              ) : (
                <div className='flex gap-4'>
                  <button
                    type='button'
                    onClick={handleLoginWithPassword}
                    className={`py-2 px-4 w-full text-white bg-purple-600 rounded-lg transition ${
                      inputState === 'password'
                        ? 'opacity-50 cursor-not-allowed'
                        : ''
                    }`}
                    disabled={inputState === 'password'}>
                    ورود با رمز عبور
                  </button>
                  <button
                    type='button'
                    onClick={handleLoginWithOTP}
                    className={`py-2 px-4 w-full text-white bg-purple-600 rounded-lg transition ${
                      inputState === 'otp'
                        ? 'opacity-50 cursor-not-allowed'
                        : ''
                    }`}
                    disabled={inputState === 'otp'}>
                    ورود با کد یکبار مصرف
                  </button>
                </div>
              )}
            </div>
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
            background: `linear-gradient(159deg, #C6C7F8 1.23%, #C5C6F8 6.88%, #C3C2F6 12.52%, #C0BDF3 18.17%, #BAB4F0 23.82%, #B4A9EB 29.47%, #AC9DE5 35.11%, #A38EDF 40.76%, #9A80D9 46.41%, #9171D3 52.06%, #8965CD 57.7%, #835AC8 63.35%, #7D51C5 69%, #7A4CC2 74.65%, #7848C0 80.29%, #7747C0 85.94%)`,
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
