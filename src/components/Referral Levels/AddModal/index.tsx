import { getCookieByKey } from '@/actions/cookieToken'
import {
  ArrowLeft2,
  ArrowRight2,
  CloseSquare,
  Grammerly,
  TickSquare,
} from 'iconsax-react'
import { useRef, useState } from 'react'
import { useData } from '@/Context/Data'
import { CreateReferrerChart, EditReferrerChart } from '@/services/referrer'
import toast from 'react-hot-toast'

const AddModal = ({
  existName,
  close,
  sup_group_code,
}: {
  existName?: string
  close: (show: null) => void
  sup_group_code: string
}) => {
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [state, setState] = useState<number>(0)
  const [parent, setParent] = useState<{ id: number; name: string }>({
    id: 0,
    name: 'stringawwww_O_0',
  })
  const { referrerChartData } = useData()
  const [openNodes, setOpenNodes] = useState<number[]>([])
  const [relationLevel, setrelationLevel] = useState<number>()
  const [errors, setErrors] = useState<Record<string, string>>()
  const refs = useRef({ chtitle: '', chlabel: '' })

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
    if (refs.current?.chtitle.length < 1) {
      setErrors({ name: 'این فیلد اجباریست' })
      return
    }
    setIsConfirmed(true)
    const accessToken = (await getCookieByKey('access_token')) || ''
    setState(1)
    if (!sup_group_code) {
      await CreateReferrerChart({
        accessToken,
        chpid: state === 0 ? 0 : parent?.id,
        chtitle: refs.current.chtitle,
        chlabel: refs.current?.chlabel,
      }).then((value) => {
        if (value.status === 1) {
          setParent({ id: value.data.regid, name: refs.current.chtitle })
          toast.success(value.message)
        } else if (value.status === '-1') {
          toast.error(value.message)
        } else toast.error('لطفا دوباره امتحان کنید')
      })
    } else {
      const response = await EditReferrerChart({
        accessToken,
        chpid: state === 0 ? 0 : parent?.id,
        chtitle: refs.current.chtitle,
        chid: 0,
        chlabel: '',
      })
      if (response.status === 1) {
        toast.success(response.message)
      } else if (response.status === '-1') {
        toast.error(response.message)
      } else {
        toast.error('لطفا دوباره امتحان کنید')
      }
    }
    setTimeout(() => {
      setIsConfirmed(false)
    }, 2222)
  }

  const getChildren = (parentId: number) => {
    return referrerChartData?.filter((node) => node.chpid === parentId)
  }

  // تغییر وضعیت باز و بسته شدن گره‌ها
  const toggleNode = (id: number) => {
    setOpenNodes((prev) =>
      prev.includes(id) ? prev.filter((nodeId) => nodeId !== id) : [...prev, id]
    )
  }

  const renderTree = (parentId: number) => {
    const nodes = referrerChartData?.filter((node) => node.chpid === parentId)

    return (
      <ul className='list-none pl-4'>
        {nodes?.map((node) => (
          <li key={node.chtitle} className='mb-4'>
            <div
              onClick={() => toggleNode(node.id)}
              className={`flex cursor-pointer items-center p-2 rounded-lg ${
                node.chlevel === 1
                  ? 'text-purple-800'
                  : node.chlevel === 2
                  ? 'text-blue-800'
                  : node.chlevel === 3
                  ? 'text-yellow-800'
                  : 'text-green-800'
              }`}>
              {
                <ArrowLeft2
                  size={24}
                  color='#98A2B3'
                  className={` transition-all duration-500 ${
                    openNodes?.includes(node.id) && '-rotate-90'
                  }`}
                />
              }
              <span className='flex-1'>{node.chtitle}</span>
            </div>
            <p className='pr-9'>
              {openNodes.includes(node.id) && renderTree(node.id)}
            </p>
          </li>
        ))}
      </ul>
    )
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
          className='flex flex-col bg-white max-w-[594px] pb-[852px] max-md:px-5 max-md:pb-24 '>
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
            <div
              className='
           '>
              <CloseSquare
                size={24}
                cursor='pointer'
                color='#50545F'
                onClick={() => close(null)}
              />
            </div>
          </div>
          {state === 0 ? (
            <>
              <div className='mt-10 w-full max-md:max-w-full'>
                <div className='flex flex-col w-full my-3'>
                  <label className='text-base font-medium text-right text-gray-800'>
                    نام بالاترین سطح چارت سازمانی خود را وارد کنید.
                  </label>
                  <input
                    defaultValue={refs.current.chtitle}
                    onChange={handleChange}
                    name='chtitle'
                    placeholder='مثال: مدیر منطقه'
                  />
                </div>
              </div>
              <div className='flex flex-col w-full my-3'>
                <label className='text-base font-medium text-right text-gray-800'>
                  نام بخش یا مستعار این سطح را وارد کنید
                </label>
                <input
                  defaultValue={refs.current.chlabel}
                  onChange={handleChange}
                  name='chlabel'
                  placeholder='مثال:  شمال تهران'
                />
              </div>
            </>
          ) : state === 1 ? (
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
                        // onChange={() => setBeneficiaryType(index === 0 ? 1 : 2)}
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
            <div className='flex flex-col'>
              <div className='flex justify-between mt-5'>
                <p className='text-[#8455D2]'>والد سطح</p>
                <div className='flex gap-2'>
                  <p className='font-bold'>مدیر فروش کل (شمال ایران)</p>
                  <p className='bg-[#E1DCF8] text-[#7747C0] px-2 rounded-lg'>
                    سطح ۱
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
                      {/* {index === 0 ? parent.name : name} */}
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
                          <span className='flex-1'></span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          )}
          <div className='mt-10 w-full max-md:max-w-full'>
            <div className='flex items-center gap-4'>
              <button
                type={state === 0 ? 'submit' : 'button'}
                onClick={() => {
                  state === 1 && setState(2)
                }}
                style={{
                  animation: `${
                    isConfirmed
                      ? 'hideSubmitAnimate 1s ease-in-out forwards '
                      : 'showSubmitAnimate 1s ease-in-out forwards '
                  }`,
                }}
                className={`w-full fill-button px-10 h-10 mt-10 rounded-lg transition-transform duration-200 ease-in-out hover:scale-105`}>
                {state === 1 ? 'ثبت و ادامه' : 'ادامه'}
              </button>
              <button
                type='button'
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
                عملیات موفقیت‌آمیز بود! <Grammerly size={24} color='#0F973D' />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
export default AddModal
