import { getCookieByKey } from '@/actions/cookieToken'
import { getKPITaskData } from '@/actions/setData'
import { errorClass } from '@/app/assets/style'
import { useData } from '@/Context/Data'
import { useStates } from '@/Context/States'
import { KPIData } from '@/interfaces'
import { CreateKPITask, EditKPITask } from '@/services/items'
import { CloseSquare, Grammerly } from 'iconsax-react'
import { useRef, useState } from 'react'

const AddModal = ({ data, close }: { data: KPIData; close: () => void }) => {
  const [name, ] = useState<string>(data?.kpi_title || '')
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [status, setStatus] = useState<React.ReactElement | null>()
  const [errors, setErrors] = useState<Record<string, string | number>>({
    kpi_title: '',
    kpi_code: '',
    kpi_time_series: '',
  })

  const { setKPITaskData } = useData()
  const { showModal } = useStates()
  const refs = useRef({
    kpi_title: data.kpi_title || '',
    kpi_code: data.kpi_code || '',
    kpi_type: data.kpi_type || 1,
    kpi_time_series: data.kpi_time_series || 1,
    kpi_internal_uid: '',
  })
  const setResult = (state: boolean, text?: string) => {
    if (state) {
      setStatus(
        <p className='text-[#0F973D] flex items-center gap-2'>
          عملیات موفقیت‌آمیز بود! <Grammerly size={24} color='#0F973D' />
        </p>
      )
    } else {
      setStatus(
        <p className='text-[#D42620] flex items-center gap-2'>
          {text} <Grammerly size={24} color='#D42620' />
        </p>
      )
    }
  }
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
    if (!refs.current.kpi_time_series)
      newErrors.kpi_time_series = 'این فیلد اجباریست'
    if (!refs.current.kpi_title) newErrors.kpi_title = 'این فیلد اجباریست'
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    setIsConfirmed(true)
    const accessToken = (await getCookieByKey('access_token')) || ''
    if (!data.id) {
      const response = await CreateKPITask({ accessToken, ...refs.current })
      showModal({
        type: response.status === 1 ? 'success' : 'error',
        main: <p>{response.message}</p>,
        title: response.status === 1 ? 'موفق' : 'خطا',
        autoClose: 2,
      })
      if (response.status === 1) {
        setResult(true)
        await getKPITaskData().then((value) => value && setKPITaskData(value))
      } else if (response.status === '-1') {
        setResult(false, response.message)
      } else {
        setResult(false, response.message)
      }
    } else {
      const response = await EditKPITask({
        accessToken,
        kpi_title: refs.current.kpi_title,
        kpi_code: refs.current.kpi_code,
        kpi_type: refs.current.kpi_type,
        kpi_time_series: refs.current.kpi_time_series,
        task_kpi_uid: data.task_kpi_uid,
        status: data.cstatus,
      })
      if (response.status === 1) {
        setResult(true)
        await getKPITaskData().then((value) => value && setKPITaskData(value))
      } else if (response.status === '-1') {
        setResult(false, response.message)
      } else {
        setResult(false, response.message)
      }
    }
    setTimeout(() => {
      setIsConfirmed(false)
      setStatus(null)
    }, 2222)
  }
  return (
    <div>
      <div className='absolute bg-slate-600 opacity-50 w-full h-[200vh] z-50 top-0 right-0'></div>
      <div
        className={`fixed p-8 z-50 right-0 top-0 max-md:left-[0] max-md:w-[100%] w-[40vw] h-full bg-white border border-gray-300 shadow-lg transition-transform duration-300 ease-in-out right-side-animate 
     `}>
              <form
          onSubmit={handleSubmit}
          className='flex flex-col bg-white  max-md:px-5 max-md:pb-24'>          <div className='flex justify-between items-center w-full text-xl font-medium text-right text-gray-800 max-md:max-w-full'>
            <div className='flex-1 shrink self-stretch my-auto min-w-[240px] max-md:max-w-full'>
              {data?.kpi_title ? 'ویرایش متغیر خارجی' : ' تعریف متغیر خارجی '}
            </div>
            <div
              className='
           '>
              <CloseSquare
                size={24}
                cursor='pointer'
                color='#50545F'
                onClick={() => close()}
              />
            </div>
          </div>

          <div className='mt-10 w-full max-md:max-w-full'>
            <div className='flex flex-col w-full'>
              <label className='text-base font-medium text-right text-gray-800'>
                نام متغیر خارجی
              </label>
              <input
                defaultValue={name}
                name='kpi_title'
                onChange={handleChange}
                className={`${errors.kpi_title && errorClass}`}
                placeholder='نام متغیر خارجی'
              />
              {errors.kpi_title && (
                <span className='text-red-500'>{errors.kpi_title}</span>
              )}
            </div>
          </div>

          <div className='mt-10 w-full max-md:max-w-full'>
            <div className='flex flex-col w-full'>
              <label className='text-base font-medium text-right text-gray-800'>
                کد متغیر خارجی
              </label>
              <select
                name='kpi_code'
                className={`${
                  errors.kpi_code && errorClass
                } w-full border rounded-lg h-10 px-1 outline-none`}
                onChange={handleChange}>
                <option value={1}>تبدیل</option>
                <option value={2}>فعالسازی </option>
              </select>
              {errors.kpi_code && (
                <span className='text-red-500'>{errors.kpi_code}</span>
              )}
            </div>
          </div>
          <div className='my-2'>
            <label>انتخاب بازه زمانی</label>
            <select
              onChange={handleChange}
              name='kpi_time_series'
              className={`${
                errors.kpi_time_series && errorClass
              } w-full border rounded-lg h-10 px-1 outline-none`}>
              <option value={''} disabled>
                روزانه/ ماهانه/ سالانه
              </option>
              <option value={2}>روزانه </option>
              <option value={3}> ماهانه</option>
              <option value={4}>سالانه </option>
            </select>
            {errors.kpi_time_series && (
              <span className='text-red-500'>{errors.kpi_time_series}</span>
            )}
          </div>

          <div className='mt-10 w-full max-md:max-w-full'>
            <div className='flex items-center'>
              <button
                type='submit'
                style={{
                  animation: `${
                    isConfirmed
                      ? 'hideSubmitAnimate 1s ease-in-out forwards '
                      : 'showSubmitAnimate 1s ease-in-out forwards '
                  }`,
                }}
                className={`w-full fill-button px-10 h-10 mt-10 rounded-lg transition-transform duration-200 ease-in-out hover:scale-105`}>
                ثبت
              </button>

              <div
                className={`absolute ${
                  !isConfirmed && ' opacity-0 '
                } transform -translate-x-1/2 transition-all duration-1000 ease-in-out`}
                style={{
                  animation: `${
                    isConfirmed
                      ? 'showSuccessText 1s ease-in-out forwards '
                      : 'hideSuccessText 1s ease-in-out forwards '
                  }`,
                }}>
                {status}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddModal
