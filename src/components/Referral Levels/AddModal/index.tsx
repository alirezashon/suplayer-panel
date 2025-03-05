import { getCookieByKey } from '@/actions/cookieToken'
import {
  ArrowLeft2,
  ArrowRight2,
  CloseSquare,
  Grammerly,
  TickSquare,
} from 'iconsax-react'
import { useEffect, useRef, useState } from 'react'
import { useData } from '@/Context/Data'
import { CreateReferrerChart } from '@/services/referrer'

import { TreeChartInterface } from '@/interfaces'
import { getReferrerChart } from '@/actions/setData'
import { useStates } from '@/Context/States'
import { errorClass } from '@/app/assets/style'

const AddModal = ({
  close,
  data,
}: {
  close: () => void
  data?: TreeChartInterface
}) => {
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [state, setState] = useState<number>(0)
  const [parent, setParent] = useState<{
    id: number
    name: string
    level: number
  }>({
    id: 0,
    name: '',
    level: 0,
  })
  const [errors, setErrors] = useState<Record<string, string>>({
    chtitle: '',
    chlabel: '',
  })
  const { setTreeChartInterface } = useData()
  const { showModal } = useStates()
  const refs = useRef({ chtitle: '', chlabel: '' })
  useEffect(() => {
    if (data) {
      setParent({ id: data.id, name: data.chtitle, level: data.id })
      setState(2)
    }
  }, [data])
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    refs.current = {
      ...refs.current,
      [name]: value,
    }
    setErrors({ ...errors, [name]: '' })
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}
    if (!refs.current.chtitle) newErrors.chtitle = 'این فیلد اجباریست'
    if (!refs.current.chlabel) newErrors.chlabel = 'این فیلد اجباریست'
    setErrors(newErrors)

    if (Object.keys(newErrors)[0] || state === 1) return

    setIsConfirmed(true)
    const accessToken = (await getCookieByKey('access_token')) || ''

    await CreateReferrerChart({
      accessToken,
      chpid: state === 0 ? 0 : parent?.id,
      chtitle: refs.current.chtitle,
      chlabel: refs.current?.chlabel,
    }).then(async (value) => {
      showModal({
        type: value.status === 1 ? 'success' : 'error',
        main: <p>{value.message}</p>,
        title: value.status === 1 ? 'موفق' : 'خطا',
        autoClose: 2,
      })
      if (value.status === 1) {
        setParent({
          id: value.data.regid,
          name: refs.current.chtitle,
          level: 0,
        })
        setState(1)
        await getReferrerChart().then(
          (value) => value && setTreeChartInterface(value)
        )
      }
    })

    setTimeout(() => {
      setIsConfirmed(false)
    }, 2222)
  }

  return (
    <div>
      <div className='absolute bg-slate-600 opacity-50 w-full h-[200vh] z-50 top-0 right-0'></div>
      <div
        style={{ overflow: 'hidden' }}
        className={`fixed p-8 z-50 right-0 top-0 max-md:left-[0] max-md:w-[100%] w-[40vw] overflow-y-auto h-full bg-white border border-gray-300 shadow-lg transition-transform duration-300 ease-in-out right-side-animate 
          `}>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col bg-white pb-[852px] max-md:px-5 max-md:pb-24 '>
          <div className='flex justify-between items-center w-full text-xl font-medium text-right text-gray-800 max-md:max-w-full'>
            <div className='flex shrink self-stretch my-auto min-w-[240px] max-md:max-w-full'>
              {state > 0 && (
                <ArrowRight2
                  color='#50545F'
                  cursor={'pointer'}
                  size={24}
                  onClick={() => setState(state - 1)}
                />
              )}
              {state === 2 ? 'ایجاد بالاترین سطح' : ' ایجاد سطح جدید'}
            </div>

            <div className=''>
              <CloseSquare
                size={24}
                cursor='pointer'
                color='#50545F'
                onClick={() => close()}
              />
            </div>
          </div>
          {state !== 1 && (
            <>
              <div className='mt-10 w-full max-md:max-w-full'>
                <div className='flex flex-col w-full my-3'>
                  <label className='text-base font-medium text-right text-gray-800'>
                    نام بالاترین سطح چارت سازمانی خود را وارد کنید.
                  </label>
                  <input
                    defaultValue={refs.current.chtitle}
                    onChange={handleChange}
                    className={`${errors.chtitle && errorClass}`}
                    name='chtitle'
                    placeholder='مثال: مدیر منطقه'
                  />
                  {errors?.chtitle && (
                    <p className='text-red-500 m-1'>{errors?.chtitle}</p>
                  )}
                </div>
              </div>
              <div className='flex flex-col w-full my-3'>
                <label className='text-base font-medium text-right text-gray-800'>
                  نام بخش یا مستعار این سطح را وارد کنید
                </label>
                <input
                  defaultValue={refs.current.chlabel}
                  onChange={handleChange}
                  className={`${errors.chlabel && errorClass}`}
                  name='chlabel'
                  placeholder='مثال:  شمال تهران'
                />
                {errors?.chlabel && (
                  <p className='text-red-500 m-1'>{errors?.chlabel}</p>
                )}
              </div>
            </>
          )}
          {state === 1 ? (
            <div className='my-5 '>
              <div className='flex bg-[#EFFEF3] gap-2 p-2 font-bold'>
                <TickSquare color='#0F973D' size={24} variant='Bold' />
                <p>سطح شما با موفقیت ایجاد شد</p>
              </div>
              <p className='my-5 text-[#8455D2]'>انتخاب سطح جدید</p>
              <div className='flex flex-col gap-3 mt-2'>
                {['سطح بعدی', 'سطح همتراز'].map((level, index) => (
                  <div className='flex flex-col' key={index}>
                    <label className='flex items-center gap-3 cursor-pointer'>
                      <input
                        type='radio'
                        defaultChecked={index === 0}
                        name='level'
                        value={level}
                        onChange={() =>
                          index === 1 &&
                          setParent({
                            level: data?.id || parent.id,
                            id: data?.id || parent.id,
                            name: parent.name,
                          })
                        }
                        className='w-5 h-5 cursor-pointer accent-[#7747C0]'
                      />
                      <span className='text-gray-700'>{level}</span>
                    </label>
                    <p className='text-slate-500'>
                      پیش‌نمایش سطح {index === 0 ? 'بعدی' : 'همتراز'} به صورت
                      زیر می‌باشد.
                    </p>

                    <ul className='list-none pl-4 mt-3'>
                      <li className='mb-4'>
                        <div
                          // onClick={() => toggleNode(node.id)}
                          className={`flex cursor-pointer items-center p-2 rounded-lg `}>
                          <ArrowLeft2
                            size={24}
                            color='#98A2B3'
                            className={` transition-all duration-500`}
                          />
                          <span className='flex-1'>
                            {index === 0 ? parent.name : refs.current.chtitle}
                          </span>
                        </div>
                        <div className={`${index === 0 && 'pr-9'}`}>
                          <ul className='list-none pl-4'>
                            <li className='mb-4'>
                              <div
                                className={`flex cursor-pointer items-center p-2 rounded-lg `}>
                                <ArrowLeft2
                                  size={24}
                                  color='#98A2B3'
                                  className={`transition-all duration-500 ${
                                    index === 0 && '-rotate-90'
                                  }`}
                                />
                                <span className='flex-1 text-slate-500'>
                                  {index === 0
                                    ? 'نام سطح بعدی'
                                    : 'نام سطح همتراز'}
                                </span>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            state === 2 && (
              <div className='flex flex-col'>
                <div className='flex justify-between mt-5'>
                  <p className='text-[#8455D2]'>والد سطح</p>
                  <div className='flex gap-2'>
                    <p className='font-bold'>{parent.name}</p>
                    <p className='bg-[#E1DCF8] text-[#7747C0] px-2 rounded-lg'>
                      {data?.chlabel || `سطح ${parent.level + 1}`}
                    </p>
                  </div>
                </div>
                <ul className='list-none pl-4'>
                  <li className='mb-4'>
                    <div
                      // onClick={() => toggleNode(node.id)}
                      className={`flex cursor-pointer items-center p-2 rounded-lg `}>
                      <ArrowLeft2
                        size={24}
                        color='#98A2B3'
                        className={` transition-all duration-500`}
                      />
                      <span className='flex-1'>
                        {data?.chtitle || parent.name}
                      </span>
                    </div>
                    <div className='pr-9'>
                      <ul className='list-none pl-4'>
                        <li className='mb-4'>
                          <div
                            // onClick={() => toggleNode(node.id)}
                            className={`flex cursor-pointer items-center p-2 rounded-lg `}>
                            <ArrowLeft2
                              size={24}
                              color='#98A2B3'
                              className={` transition-all duration-500`}
                            />
                            <span className='flex-1'>
                              {refs.current.chtitle}
                            </span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            )
          )}
          <div className='mt-10 w-full max-md:max-w-full'>
            <div className='flex items-center gap-4'>
              {state !== 1 ? (
                <>
                  <button
                    type={state === 1 ? 'button' : 'submit'}
                    onClick={() => {
                      if (state === 1) setState(2)
                    }}
                    style={{
                      animation: `${
                        isConfirmed
                          ? 'hideSubmitAnimate 1s ease-in-out forwards '
                          : 'showSubmitAnimate 1s ease-in-out forwards '
                      }`,
                    }}
                    className={`w-full fill-button px-10 h-10 mt-10 rounded-lg transition-transform duration-200 ease-in-out hover:scale-105`}>
                    ادامه
                  </button>
                  <button
                    onClick={() => {
                      setState(0)
                    }}
                    style={{
                      animation: `${
                        isConfirmed
                          ? 'hideSubmitAnimate 1s ease-in-out forwards '
                          : 'showSubmitAnimate 1s ease-in-out forwards '
                      }`,
                    }}
                    className={`w-full border-button px-10 h-10 mt-10 rounded-lg transition-transform duration-200 ease-in-out hover:scale-105`}>
                    {state === 0 ? 'انصراف' : 'ثبت و خروج'}
                  </button>
                  <div
                    className={`absolute ${
                      !isConfirmed && ' opacity-0 '
                    } transform -translate-x-1/2 text-[#0F973D] flex rounded-lg transition-all duration-1000 ease-in-out`}
                    style={{
                      animation: `${
                        isConfirmed
                          ? 'showSuccessText 1s ease-in-out forwards '
                          : 'hideSuccessText 1s ease-in-out forwards '
                      }`,
                    }}>
                    عملیات موفقیت‌آمیز بود!
                    <Grammerly size={24} color='#0F973D' />
                  </div>
                </>
              ) : (
                <>
                  <button
                    type='button'
                    onClick={(e) => {
                      e.preventDefault()

                      refs.current.chlabel = ''
                      refs.current.chtitle = ''
                      setState(2)
                    }}
                    className={`w-full fill-button px-10 h-10 mt-10 rounded-lg transition-transform duration-200 ease-in-out hover:scale-105`}>
                    ثبت و ادامه
                  </button>
                  <button
                    type='button'
                    onClick={(e) => {
                      e.preventDefault()
                      refs.current.chlabel = ''
                      refs.current.chtitle = ''
                      setState(1)
                    }}
                    className={`w-full border-button px-10 h-10 mt-10 rounded-lg transition-transform duration-200 ease-in-out hover:scale-105`}>
                    ثبت و خروج
                  </button>
                </>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
export default AddModal
