'use client'
import { useEffect, useState } from 'react'
import {
  GetCurrentUser,
  GetOtpWithMobile,
  GetUserPermissions,
  LoginWithOtpAndMobile,
  UserLoginAPI,
} from '@/services/user'
import {
  IAccessTokenResponse,
  setCurrentUsertoCookie,
  setTokenIntoCookie,
} from '@/actions/cookieToken'
import { ArrowRight2 } from 'iconsax-react'
import Loading from '../shared/Loading'
import Image from 'next/image'
import LogoSrc from '../../../public/icons/logo.svg'
import LoginBg1 from '../../../public/images/login1.jpg'
import LoginBg2 from '../../../public/images/login2.jpg'
import LoginShadow from '../../../public/images/login-bg.svg'
import { useStates } from '@/Context/States'
import CustomModal from '../shared/CustomModal'
import { errorClass } from '@/app/assets/style'
import OTPInput from '../shared/OTPinput'
import Captcha from '../shared/Captcha'

const Login = () => {
  const [inputState, setInputState] = useState<
    | 'mobile'
    | 'otp'
    | 'password'
    | 'otp-selection'
    | 'chebarnameyi'
    | 'googleauthenticate'
  >('mobile')
  const [mobile, setMobile] = useState<string>('')
  const [otp, setOtp] = useState<string>('')
  const [captchaPass, setCaptchaPass] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [password, setPassword] = useState<string>('')
  const [errors, setErrors] = useState<{
    phone?: string
    password?: string
    captcha?: string
  }>({})
  const { showModal, modalContent } = useStates()

  const validateInputs = () => {
    const newErrors: { phone?: string; password?: string; captcha?: string } =
      {}
    if (!mobile || mobile.length !== 11 || !/^09\d{9}$/.test(mobile)) {
      newErrors.phone = 'شماره موبایل باید 11 رقم و معتبر باشد.'
    }
    if (inputState === 'password' && (!password || password.length < 6)) {
      newErrors.password = 'رمز عبور باید حداقل 6 کاراکتر باشد.'
    }
    if (!captchaPass) newErrors.captcha = 'کد امنیتی را وارد کنید'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleLogin = async () => {
    if (!validateInputs()) return

    try {
      setLoading(true)
      const response =
        inputState === 'password'
          ? await UserLoginAPI({
              username: mobile,
              password,
            })
          : await LoginWithOtpAndMobile({ mobile, otp })

      if (!response) {
        setLoading(false)
        showModal({
          type: response.access_token ? 'success' : 'error',
          main: response.access_token
            ? 'ورود موفق ، لطفا کمی صبر کنید.'
            : 'خطایی رخ داد',
          title: response.access_token ? 'موفق' : 'خطا',
          autoClose: 2,
        })
        return
      }

      if (response.access_token) {
        await setTokenIntoCookie({
          data: response as IAccessTokenResponse,
          mobile,
        })
        const currentUser = await GetCurrentUser({
          accessToken: response.access_token,
        })
        if (currentUser) await setCurrentUsertoCookie({ data: currentUser })
        if (!currentUser) return
        if (currentUser?.user_role_id) {
          await GetUserPermissions({
            accessToken: response.access_token,
            role_id: currentUser.user_role_id,
          }).then((result) => {
            if (result) {
              const value = JSON.stringify(
                result?.reduce(
                  (acc, row) => {
                    acc[0].push(row.menu_code)
                    acc[1].push(row.form_code)
                    acc[2].push(row.action_type)
                    return acc
                  },
                  [[], [], []] as [string[], string[], number[]]
                )
              )
              document.cookie = `uzrprm=${encodeURIComponent(
                value
              )}; path=/; max-age=4200; SameSite=Lax`
            }
          })
        }
        showModal({
          type: 'success',
          main: <p>هویت شما تایید شد. لطفا برای ورود چند لحظه منتظر بمانید!</p>,
          title: 'ورود موفق ',
          autoClose: 2,
        })
        if (currentUser.user_status === 'INACTIVE') {
          location.href = '/auth/validator'
          return
        }
        if (currentUser.approve_status !== 1) {
          setLoading(false)
          showModal({
            main: <p>کاربر فعال نمی باشد</p>,
            title: 'عدم تایید کاربر ',
            autoClose: 2,
          })
          return
        }
        if (currentUser.user_status === 'DISABLED') {
          setLoading(false)
          showModal({
            main: <p>کاربر غیر فعال می باشد</p>,
            title: 'ورود غیر مجاز ',
            autoClose: 2,
          })
          return
        }
        if (currentUser.role) {
          localStorage.setItem('mobile', mobile)
          location.href = '/'
        }
      }
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  useEffect(() => {
    const lastPhone = localStorage.getItem('mobile') || ''
    setMobile(lastPhone)
  }, [])

  return (
    <>
      {modalContent && <CustomModal />}
      {loading ? (
        <div className='flex justify-center items-center w-full h-screen'>
           <Loading />
        </div>
      ) : (
        <div className='flex w-[100vw]  max-lg:flex-col min-h-screen bg-white'>
          <div className='flex flex-col z-50 bg-white bg-opacity-90 justify-center items-center w-1/2 max-lg:w-full max-lg:translate-y-52'>
            <div className='w-full px-20'>
              <Image
                src={LogoSrc}
                alt='logo'
                width={200}
                height={100}
                className='object-contain mb-4'
              />
              {inputState !== 'mobile' && (
                <button
                  className='text-[#7747C0] flex my-5'
                  onClick={() => setInputState('mobile')}>
                  <ArrowRight2 size={24} color='#7747C0' />
                  بازگشت
                </button>
              )}
              <form onSubmit={(e) => e.preventDefault()}>
                {inputState === 'mobile' && (
                  <>
                    <label
                      htmlFor='phone'
                      className='block text-sm font-medium text-gray-700 mb-2'>
                      برای ورود | ثبت نام، شماره موبایل خود را وارد کنید:
                    </label>
                    <input
                      id='phone'
                      inputMode='numeric'
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder='091'
                      className='block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7747C0]'
                    />
                    {errors.phone && (
                      <p className='text-red-700'>{errors.phone}</p>
                    )}
                    <div className='my-10'>
                      <Captcha
                        setResult={(value: boolean) => {
                          if (value === true) {
                            setCaptchaPass(value)
                            setErrors((prevErrors) => {
                              const rest = { ...prevErrors }
                              delete rest.captcha
                              return rest
                            })
                          }
                        }}
                      />
                      {errors.captcha && (
                        <p className='text-red-700'>{errors.captcha}</p>
                      )}
                    </div>
                  </>
                )}

                {/* رمز عبور */}
                {inputState === 'password' && (
                  <>
                    <label
                      htmlFor='password'
                      className='block text-sm font-medium text-gray-700 mb-2'>
                      رمز عبور
                    </label>
                    <input
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleLogin()
                      }}
                      type='password'
                      id='password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder='••••••••'
                      className={`${
                        errors.password && errorClass
                      } block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7747C0]`}
                    />
                    {errors.password && (
                      <p className='text-red-700 mt-2'>{errors.password}</p>
                    )}
                  </>
                )}
                {inputState === 'otp' && <OTPInput setResult={setOtp} />}
                <div className='flex flex-col gap-4 mt-6'>
                  {inputState === 'mobile' ? (
                    <button
                      onClick={() =>
                        validateInputs() && setInputState('password')
                      }
                      className='fill-button h-10 w-full rounded-lg transition'>
                      ادامه
                    </button>
                  ) : (
                    <div className='flex gap-4 mt-5'>
                      <button
                        type='button'
                        onClick={async () => {
                          setInputState('otp')
                          await GetOtpWithMobile({ mobile })
                        }}
                        className='w-full rounded-lg border-button'>
                        ورود با کد یکبار مصرف
                      </button>
                      <button
                        type='button'
                        onClick={handleLogin}
                        className='py-2 px-4 w-full text-white bg-[#7747C0] rounded-lg transition'>
                        ورود
                      </button>
                    </div>
                  )}
                </div>
                <p
                  className='flex mt-4 justify-center text-[#50545F] cursor-pointer'
                  onClick={() => (location.href = '/auth/sign-up')}>
                  حساب کاربری ندارید؟ ثبت نام کنید
                </p>
              </form>
            </div>
          </div>
          <div className='max-md:absolute max-md:w-full max-md:h-screen max-md:opacity-90 relative overflow-y-hidden flex flex-col items-center w-1/2 text-white'>
            <Image
              src={LoginShadow}
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
                src={LoginBg1}
                alt='Login illustration 1'
                className='absolute left-[199px] z-10 top-[190px] rounded-lg shadow-lg'
                width={449}
                height={315}
              />
              <Image
                src={LoginBg2}
                alt='Login illustration 1'
                className='absolute left-[68px] rounded-lg shadow-lg'
                width={439}
                height={389}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export default Login
