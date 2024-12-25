import { ArrowRight2, Key, UserEdit } from 'iconsax-react'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { CheckMark } from '../shared/IconGenerator'
import { useMenu } from '@/Context/Menu'

const Profile = () => {
  const { setMenu } = useMenu()
  const [tab, setTab] = useState<number>(0)
  const [validate, setValidate] = useState<{
    words: boolean
    number: boolean
    length: boolean
  }>({ words: false, number: false, length: false })
  const firstInputRef = useRef<HTMLInputElement>(null)
  const secondInputRef = useRef<HTMLInputElement>(null)
  const user = {
    name: 'محدثه عالمی',
    src: '/images/2.png',
    mobile: '0912121212',
  }
  const validator = () => {
    if (firstInputRef.current?.value.match(/(?=.*[a-z])(?=.*[A-Z])/)) {
      setValidate((prv) => ({
        words: true,
        number: prv.number,
        length: prv.length,
      }))
    } else {
      setValidate((prv) => ({
        words: false,
        number: prv.number,
        length: prv.length,
      }))
    }
    if (firstInputRef.current?.value.match(/(?=.*\d)(?=.*[!@#)`_(/$%^&*])/)) {
      setValidate((prv) => ({
        words: prv.words,
        number: true,
        length: prv.length,
      }))
    } else {
      setValidate((prv) => ({
        words: prv.words,
        number: false,
        length: prv.length,
      }))
    }
    if (`${firstInputRef.current?.value}`.length > 7) {
      setValidate((prv) => ({
        words: prv.words,
        number: prv.number,
        length: true,
      }))
    } else {
      setValidate((prv) => ({
        words: prv.words,
        number: prv.number,
        length: false,
      }))
    }
  }
  return (
    <div>
      <div
        className='flex text-[#7747C0] cursor-pointer'
        onClick={() => setMenu(location.hash.substring(1))}>
        <ArrowRight2 size={24} color='#7747C0' />
        بازگشت
      </div>
      <div className='flex flex-col bg-white border rounded-lg p-4 m-2'>
        <div className='flex gap-4 m-4'>
          <Image
            src={user.src}
            alt='پروفایل کاربر'
            width={104}
            height={104}
            className='rounded-full w-[12vh] h-[12vh] object-cover'
          />
          <div className='flex gap-3 flex-col'>
            <span className='ml-2'>نام کاربر: {user.name}</span>
            <span className='ml-2'>{user.mobile}</span>
          </div>
        </div>
        <div className='flex items-start self-center w-full text-base text-center max-md:max-w-full my-5'>
          <button
            type='button'
            onClick={() => setTab(0)}
            tabIndex={0}
            className={`flex justify-center gap-2 items-center flex-1 p-2.5  border-b ${
              tab === 0
                ? 'border-b-purple-800 text-size text-[#7747C0]'
                : 'border-b-gray-200 text-zinc-400'
            }`}>
            <UserEdit size={24} color={tab === 0 ? '#7747C0' : '#98A2B3'} />
            اطلاعات کاربری
          </button>
          <button
            type='button'
            onClick={() => setTab(1)}
            tabIndex={1}
            className={`flex justify-center gap-2 items-center flex-1 p-2.5  border-b ${
              tab === 1
                ? 'border-b-purple-800 text-size text-[#7747C0]'
                : 'border-b-gray-200 text-zinc-400'
            }`}>
            <Key size={24} color={tab === 1 ? '#7747C0' : '#98A2B3'} />
            رمز عبور
          </button>
        </div>
        <form
          // onSubmit={handleSubmit}
          className='w-full'>
          {tab === 0 ? (
            <div className=' flex gap-10 mt-10 w-full'>
              <div className='flex flex-col w-full'>
                <label className='text-base font-medium text-right text-gray-800'>
                  نام
                </label>
                <input type='text' placeholder='نام ' />
              </div>
              <div className='flex flex-col w-full'>
                <label className='text-base font-medium text-right text-gray-800'>
                  نام خانوادگی
                </label>
                <input type='text' placeholder='نام خانوادگی ' />
              </div>
              <div className='flex flex-col w-full'>
                <label className='text-base font-medium text-right text-gray-800'>
                  شماره موبایل
                </label>
                <input type='text' placeholder='شماره موبایل ' />
              </div>
            </div>
          ) : (
            <>
              <div className=' flex gap-10 mt-10 w-full'>
                <div className='flex flex-col w-full'>
                  <label className='text-base font-medium text-right text-gray-800'>
                    رمز عبور
                  </label>
                  <input
                    ref={firstInputRef}
                    onChange={() => validator()}
                    type='password   '
                    placeholder=' رمز عبور '
                  />
                </div>
                <div className='flex flex-col w-full'>
                  <label className='text-base font-medium text-right text-gray-800'>
                    تکرار رمز عبور
                  </label>
                  <input
                    ref={secondInputRef}
                    type='password   '
                    placeholder='تکرار رمز عبور  '
                  />
                </div>
              </div>
              <div className='flex flex-col my-6'>
                <div className='flex items-center gap-3 my-2'>
                  <CheckMark
                    color={`${validate.words ? '#2F27CE' : '#747B8E'}`}
                  />
                  <p>شامل حروف کوچک و بزرگ انگلیسی</p>
                </div>
                <div className='flex items-center gap-3 my-2'>
                  <CheckMark
                    color={`${validate.length ? '#2F27CE' : '#747B8E'}`}
                  />
                  <p>شامل حداقل ۸ کاراکتر</p>
                </div>
                <div className='flex items-center gap-3 my-2'>
                  <CheckMark
                    color={`${validate.number ? '#2F27CE' : '#747B8E'}`}
                  />
                  <p>شامل عدد و کاراکتر خاص</p>
                </div>
              </div>
            </>
          )}

          <div className='mt-10 flex justify-end'>
            <button
              type='submit'
              className={`fill-button px-10 h-10 rounded-lg  `}>
              ذخیره تغییرات
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Profile
