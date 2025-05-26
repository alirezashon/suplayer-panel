import { ArrowRight2, Key, UserEdit } from 'iconsax-react'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { CheckMark } from '../shared/IconGenerator'
import { useMenu } from '@/Context/Menu'
import OTPInput from '../shared/OTPinput'
import { useStates } from '@/Context/States'
import { getCookieByKey } from '@/actions/cookieToken'
import {
  GetOtpWithMobile,
  UpdateProfile,
  UserChangePassword,
} from '@/services/user'
import { useData } from '@/Context/Data'

const Profile = () => {
  const { setMenu } = useMenu()
  const { userInfo } = useData()
  const { showModal } = useStates()
  const [tab, setTab] = useState<number>(0)
  const [otp, setOtp] = useState<null | string>()
  const [password, setPassword] = useState<string>('')
  const [validate, setValidate] = useState<{
    words: boolean
    number: boolean
    length: boolean
  }>({ words: false, number: false, length: false })
  const firstInputRef = useRef<HTMLInputElement>(null)
  const secondInputRef = useRef<HTMLInputElement>(null)
  const informationsRefs = useRef({
    name: '',
    family: '',
    componyName: '',
    componyCode: '',
    email: '',
  })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    informationsRefs.current = {
      ...informationsRefs.current,
      [name]: value,
    }
  }

  const updateProfile = async () => {
    const accessToken = (await getCookieByKey('access_token')) || ''
    await UpdateProfile({
      accessToken,
      Mobile: userInfo?.mobile || '',
      FirstName: informationsRefs.current.name,
      LastName: informationsRefs.current.family,
      CompanyName: informationsRefs.current.componyName,
      CompanyCode: informationsRefs.current.componyCode,
      Email: informationsRefs.current.email,
    }).then((result) => {
      if (result && result.status == 1)
        showModal({
          type: 'success',
          main: result?.message,
          title: 'موفق',
          autoClose: 1,
        })
      else
        showModal({
          type: 'error',
          main: `${result?.message}`,
          title: 'ناموفق',
          autoClose: 1,
        })
    })
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
  const sendOTP = async () => {
    await GetOtpWithMobile({ mobile: userInfo?.mobile as string })
    setOtp('')
  }
  const changePassword = async () => {
    try {
      if (!validate.length || !validate.number || !validate.words) {
        showModal({
          title: 'خطا',
          main: 'ساختار رمز صحیح نمی باشد',
          type: 'error',
          autoClose: 1,
        })
        return
      }
      if (!otp || otp.length < 6) {
        showModal({
          title: 'خطا',
          main: 'کد صحیح نمی باشد',
          type: 'error',
          autoClose: 1,
        })
        return
      }
      const accessToken = (await getCookieByKey('access_token')) || ''
      const response = await UserChangePassword({
        accessToken,
        newpassword: password,
        otp_code: otp || '',
      })
      if (!response) {
        showModal({
          title: 'خطا',
          main: 'خطای پیش آمد! دوباره تلاش کنید.',
          type: 'error',
          autoClose: 1,
        })
        return
      }
      if (response.status === '-1')
        showModal({
          title: 'خطا',
          main: response.message,
          type: 'error',
          autoClose: 1,
        })
      if (response.status === '1')
        showModal({
          title: 'موفق',
          main: response.message,
          type: 'success',
          autoClose: 1,
        })
    } catch (err: unknown) {
      return err
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
            src={'/icons/logo.svg'}
            alt='پروفایل کاربر'
            width={104}
            height={104}
            className='rounded-full w-[12vh] h-[12vh] object-cover'
          />
          <div className='flex gap-3 flex-col'>
            <span className='ml-2'>نام کاربر: {userInfo?.full_name}</span>
            <span className='ml-2'>{userInfo?.mobile}</span>
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
        <form className='w-full'>
          {tab === 0 ? (
            <div className='flex flex-col'>
              <div className=' flex gap-10 mt-10 w-full'>
                <div className='flex flex-col w-full'>
                  <label className='text-base font-medium text-right mr-2'>
                    نام
                  </label>
                  <input
                    onChange={handleChange}
                    name='name'
                    placeholder='نام '
                  />
                </div>
                <div className='flex flex-col w-full'>
                  <label className='text-base font-medium text-right mr-2'>
                    نام خانوادگی
                  </label>
                  <input
                    onChange={handleChange}
                    name='family'
                    placeholder='نام خانوادگی '
                  />
                </div>
              </div>
              <div className=' flex gap-10 mt-10 w-full'>
                <div className='flex flex-col w-full'>
                  <label className='text-base font-medium text-right mr-2'>
                    نام شرکت
                  </label>
                  <input
                    onChange={handleChange}
                    name='componyName'
                    placeholder='نام شرکت'
                  />
                </div>
                <div className='flex flex-col w-full'>
                  <label className='text-base font-medium text-right mr-2'>
                    شناسه شرکت
                  </label>
                  <input
                    onChange={handleChange}
                    name='componyCode'
                    placeholder='شناسه شرکت'
                  />
                </div>
              </div>
              <div className=' flex gap-10 mt-10 w-full'>
                <div className='flex flex-col w-full'>
                  <label className='text-base font-medium text-right mr-2'>
                    ایمیل
                  </label>
                  <input
                    onChange={handleChange}
                    name='email'
                    placeholder='ایمیل '
                    type='email'
                  />
                </div>
              </div>
            </div>
          ) : typeof otp !== 'string' ? (
            <>
              <div className=' flex gap-10 mt-10 w-full'>
                <div className='flex flex-col w-full'>
                  <label className='text-base font-medium text-right'>
                    رمز عبور
                  </label>
                  <input
                    ref={firstInputRef}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      validator()
                    }}
                    type='password'
                    placeholder=' رمز عبور '
                  />
                </div>
                <div className='flex flex-col w-full'>
                  <label className='text-base font-medium text-right'>
                    تکرار رمز عبور
                  </label>
                  <input
                    ref={secondInputRef}
                    type='password'
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
          ) : (
            <OTPInput setResult={setOtp} />
          )}

          <div className='mt-10 flex justify-end'>
            <button
              type='button'
              onClick={() => {
                if (tab === 0) updateProfile()
                else if (tab !== 0 && typeof otp !== 'string') sendOTP()
                else changePassword()
              }}
              className={`fill-button px-10 h-10 rounded-lg  `}>
              {tab === 0 ? ' ذخیره تغییرات ' : 'ذخیره رمز جدید'}
            </button>
            {typeof otp === 'string' && (
              <button
                type='button'
                onClick={() => setOtp(null)}
                className={`border-button px-10 h-10 rounded-lg mx-2 `}>
                اصلاح مجدد
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default Profile
