'use client'
import { useEffect, useRef, useState } from 'react'
import { ArrowRight2, Eye, EyeSlash } from 'iconsax-react'
import Loading from '../shared/LoadingSpinner'
import Image from 'next/image'
import LogoSrc from '../../../public/icons/logo.png'
import LoginBg1 from '../../../public/images/login1.jpg'
import LoginBg2 from '../../../public/images/login2.jpg'
import LoginShadow from '../../../public/images/login-bg.svg'
import OTPInput from '../shared/OTPinput'
import { CheckMark } from '../shared/IconGenerator'

type InputRefs = {
  mobile: string
  email: string
  password: string
  fullName: string
  panelName: string
  companyName: string
  companyID: string
  logo: File | null
}

type Errors = Partial<Record<keyof InputRefs, string>>

const SignUp = () => {
  const [inputState, setInputState] = useState<
    'user' | 'information' | 'otp' | 'result'
  >('user')
  const inputRefs = useRef<InputRefs>({
    mobile: '',
    email: '',
    password: '',
    fullName: '',
    panelName: '',
    companyName: '',
    companyID: '',
    logo: null,
  })

  const [loading, setLoading] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<{
    newPass: boolean
    repeatPassword: boolean
  }>({ newPass: false, repeatPassword: false })
  const [otpCode, setOTPcode] = useState<string>('')
  const [validate, setValidate] = useState<{
    words: boolean
    number: boolean
    length: boolean
  }>({ words: false, number: false, length: false })
  const passwordInputRef = useRef<HTMLInputElement>(null)
  const [errors, setErrors] = useState<Errors>({})
  const validateInputs = (): boolean => {
    const newErrors: Errors = {}

    if (
      !inputRefs.current.mobile ||
      !/^09\d{9}$/.test(inputRefs.current.mobile)
    ) {
      newErrors.mobile = 'شماره موبایل باید 11 رقم و معتبر باشد.'
    }
    if (!inputRefs.current.password || inputRefs.current.password.length < 6) {
      newErrors.password = 'رمز عبور باید حداقل 6 کاراکتر باشد.'
    }
    if (!inputRefs.current.fullName) {
      newErrors.fullName = 'لطفا نام و نام خانوادگی را وارد کنید.'
    }
    if (!inputRefs.current.panelName) {
      newErrors.panelName = 'لطفا اسم پنل را وارد کنید.'
    }
    if (!inputRefs.current.companyName) {
      newErrors.companyName = 'لطفا نام شرکت را وارد کنید.'
    }
    if (!inputRefs.current.companyID) {
      newErrors.companyID = 'لطفا شناسه ملی شرکت را وارد کنید.'
    }
    if (!inputRefs.current.logo) {
      newErrors.logo = 'لطفا لوگو را بارگذاری کنید.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (
    key: keyof InputRefs,
    value: string | File | null
  ) => {
    inputRefs.current[key] = value as never
  }
  const handleLogin = async () => {
    if (inputState === 'otp') setInputState('result')
    else setInputState('otp')
    if (!validateInputs()) return

    try {
    } catch (err: unknown) {
      console.log(err)
      setLoading(false)
    }
  }

  const validator = () => {
    if (passwordInputRef.current?.value.match(/(?=.*[a-z])(?=.*[A-Z])/)) {
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
    if (
      passwordInputRef.current?.value.match(/(?=.*\d)(?=.*[!@#)`_(/$%^&*])/)
    ) {
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
    if (`${passwordInputRef.current?.value}`.length > 7) {
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
  useEffect(() => {
    const lastPhone = localStorage.getItem('mobile') || ''
    inputRefs.current.mobile = lastPhone
  }, [])

  return (
    <>
    {otpCode}
      {loading ? (
        <div className='flex justify-center items-center w-full h-screen'>
          <Loading size={40} />
        </div>
      ) : (
        <div className='flex w-[100vw] min-h-screen bg-white'>
          <div className='flex flex-col justify-center items-center w-1/2'>
            <div className='w-full px-20'>
              <Image
                src={LogoSrc}
                alt='logo'
                width={200}
                height={100}
                className='object-contain mb-4'
              />
              {!['user', 'result'].includes(inputState) && (
                <button
                  className='text-[#7747C0] flex my-5'
                  onClick={() => setInputState('user')}>
                  <ArrowRight2 size={24} color='#7747C0' />
                  بازگشت
                </button>
              )}
              <form onSubmit={(e) => e.preventDefault()}>
                {inputState === 'user' && (
                  <div className='grow mb-8'>
                    <div className='mb-10 '>
                      <label
                        htmlFor='phone'
                        className='block font-bold text-[#2F3237] mb-2'>
                        شماره موبایل
                      </label>
                      <input
                        id='phone'
                        inputMode='numeric'
                        value={inputRefs.current.mobile}
                        onChange={(e) =>
                          (inputRefs.current.mobile = e.target.value)
                        }
                        placeholder='091'
                        className='block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7747C0]'
                      />
                      {errors.mobile && (
                        <p className='text-red-700'>{errors.mobile}</p>
                      )}
                    </div>
                    <div className='mb-10 '>
                      <label
                        htmlFor='phone'
                        className='block font-bold text-[#2F3237] mb-2'>
                        ایمیل خود را وارد کنید
                      </label>
                      <input
                        id='email'
                        value={inputRefs.current.email}
                        onChange={(e) =>
                          handleInputChange
                          // (inputRefs.current.email = e.target.value)
                        }
                        placeholder='example@'
                        className='block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7747C0]'
                      />
                      {errors.email && (
                        <p className='text-red-700'>{errors.email}</p>
                      )}
                    </div>
                    <div className='mb-6 '>
                      <div className='relative w-full flex items-center'>
                        <div className='absolute left-2 mb-2 cursor-pointer'>
                          {showPassword.newPass ? (
                            <EyeSlash
                              size='24'
                              color='#111111'
                              onClick={() =>
                                setShowPassword({
                                  newPass: !showPassword.newPass,
                                  repeatPassword: showPassword.repeatPassword,
                                })
                              }
                            />
                          ) : (
                            <Eye
                              size='24'
                              color='#111111'
                              onClick={() =>
                                setShowPassword({
                                  newPass: !showPassword.newPass,
                                  repeatPassword: showPassword.repeatPassword,
                                })
                              }
                            />
                          )}
                        </div>
                        <div className='w-full mb-6 '>
                          <label
                            htmlFor='phone'
                            className='block font-bold text-[#2F3237] mb-2'>
                            رمز عبور
                          </label>
                          <input
                            id='newpassword'
                            placeholder='رمز عبور'
                            type={showPassword.newPass ? 'text' : 'password'}
                            className='block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7747C0]'
                            autoComplete='off'
                            ref={passwordInputRef}
                            onChange={(e) => {
                              validator()
                            }}
                            aria-autocomplete='none'
                          />
                        </div>
                        {/* {errors?.newpassword && (
                        <p className='mt-2 text-[#D42620]'>
                          {errors?.newpassword?.message}
                        </p>
                      )} */}
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
                  </div>
                )}

                {inputState === 'information' && (
                  <div className='flex flex-col gap-7'>
                    <div>
                      <label
                        htmlFor='password'
                        className='block text-sm font-medium text-[#2F3237] mb-2'>
                        نام و نام خانوادگی
                      </label>
                      <input
                        id='fullName'
                        value={inputRefs.current.fullName}
                        onChange={(e) =>
                          (inputRefs.current.fullName = e.target.value)
                        }
                        placeholder='نام و نام خانوادگی '
                        className='block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7747C0]'
                      />
                      {errors.fullName && (
                        <p className='text-red-700'>{errors.fullName}</p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor='password'
                        className='block text-sm font-medium text-[#2F3237] mb-2'>
                        اسم پنل خود را انتخاب کنید
                      </label>
                      <input
                        id='panelName'
                        value={inputRefs.current.panelName}
                        onChange={(e) =>
                          (inputRefs.current.panelName = e.target.value)
                        }
                        placeholder='اسم پنل'
                        className='block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7747C0]'
                      />
                      {errors.panelName && (
                        <p className='text-red-700'>{errors.panelName}</p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor='password'
                        className='block text-sm font-medium text-[#2F3237] mb-2'>
                        نام شرکت را وارد کنید
                      </label>
                      <input
                        id='companyName'
                        value={inputRefs.current.companyName}
                        onChange={(e) =>
                          (inputRefs.current.companyName = e.target.value)
                        }
                        placeholder='نام شرکت '
                        className='block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7747C0]'
                      />
                      {errors.companyName && (
                        <p className='text-red-700'>{errors.companyName}</p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor='password'
                        className='block text-sm font-medium text-[#2F3237] mb-2'>
                        شناسه ملی شرکت را وارد کنید
                      </label>
                      <input
                        id='companyID'
                        value={inputRefs.current.companyID}
                        onChange={(e) =>
                          (inputRefs.current.companyID = e.target.value)
                        }
                        placeholder='۲۴۵۲۴۵۱ '
                        className='block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7747C0]'
                      />
                      {errors.companyID && (
                        <p className='text-red-700'>{errors.companyID}</p>
                      )}
                    </div>
                  </div>
                )}
                {inputState === 'otp' ? (
                  <div className='my-10'>
                    <OTPInput setResult={setOTPcode} />
                  </div>
                ) : (
                  inputState === 'result' && (
                    <div className='flex bg-[#DAFEE5] gap-2 text-[#0CAD41] p-2 rounded-lg'>
                      <CheckMark color={`#0CAD41`} />
                      <p>ثبت نام شما با موفقیت انجام شد</p>
                    </div>
                  )
                )}
                <div className='flex flex-col gap-4 mt-6'>
                  {inputState === 'user' ? (
                    <button
                      onClick={() =>
                        // validateInputs() &&
                        setInputState('information')
                      }
                      className='fill-button h-10 w-full rounded-lg transition'>
                      ادامه
                    </button>
                  ) : (
                    <div className='flex gap-4'>
                      <button
                        type='button'
                        onClick={handleLogin}
                        className='py-2 px-4 w-full text-white bg-[#7747C0] rounded-lg transition'>
                        ورود
                      </button>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
          <div className='relative overflow-y-hidden flex flex-col items-center w-1/2 text-white'>
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
export default SignUp
