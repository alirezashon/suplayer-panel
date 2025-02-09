import { getCookieByKey } from '@/actions/cookieToken'
import { BeneficiaryData} from '@/interfaces'
import { CreateBeneficiary, EditBeneficiary } from '@/services/items'
import { CloseSquare, Grammerly } from 'iconsax-react'
import dynamic from 'next/dynamic'
import { useState, useRef } from 'react'
import CitySelector from '@/components/shared/CitySelector'
import { errorClass } from '@/app/assets/style'
import { getBeneficiaryData } from '@/actions/setData'
import { useData } from '@/Context/Data'
import { useStates } from '@/Context/States'

const Map = dynamic(() => import('../../Address/Map'), { ssr: false })

interface AddModalProps {
  data?: BeneficiaryData
  close: (show: boolean) => void
}

const AddModal = ({ data, close }: AddModalProps) => {
  const [mapData, setMapData] = useState<[number, number]>([
    35.72249924640049, 51.335191350784214,
  ])
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [errors, setErrors] = useState<Record<string, string | number>>({
    visitor_name: data?.visitor_family || '',
    visitor_family: '',
    visitor_tel: '',
  })
  const refs = useRef({
    supervisor_id: 0,
    visitor_type: 0,
    visitor_tob: 0,
    visitor_uid: '',
    visitor_tel: '',
    visitor_full_name: '',
    visitor_name: '',
    visitor_family: '',
    visitor_status: 0,
    CityUID: '',
    visitor_address: '',
    visitor_specialty: '',
    default_weight: 0,
    latitude: 0,
    longitude: 0,
  })
  const { setBeneficiaryData } = useData()
  const { showModal } = useStates()
  const beneficiaries = ['شخص', 'کسب و کار']
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
    setIsConfirmed(true)
    const newErrors: Record<string, string> = {}
    if (!refs.current.visitor_name) newErrors.visitor_name = 'این فیلد اجباریست'
    if (!refs.current.visitor_family)
      newErrors.visitor_family = 'این فیلد اجباریست'
    if (!refs.current.visitor_tel) newErrors.visitor_tel = 'این فیلد اجباریست'
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    const accessToken = await getCookieByKey('access_token')

    if (data?.CityUID) {
      EditBeneficiary({ ...data, accessToken })
        .then((value) => {
          value?.status === '-1'
            ? showModal({
                type: 'success',
                main: <p>{value.message}</p>,
                title: 'خطا',
                autoClose: 3,
              })
            : showModal({
                type: 'error',
                main: <p>{value.message}</p>,
                title: 'خطا',
                autoClose: 3,
              })
          close(false)
        })
        .catch(() =>
          showModal({
            type: 'error',
            main: <p>خطایی پیش آمد</p>,
            title: 'خطا',
            autoClose: 3,
          })
        )
    } else {
      await CreateBeneficiary({
        accessToken,
        ...refs.current,
        visitor_full_name:
          refs.current.visitor_name + ' ' + refs.current.visitor_family,
      }).then(
        async (value) =>
          value &&
          (await getBeneficiaryData().then(
            (data) => data && setBeneficiaryData(data)
          ))
      )
    }
    setTimeout(() => {
      setIsConfirmed(false)
    }, 2222)
  }

  return (
    <div>
      <div className='absolute bg-slate-600 opacity-50 w-full h-[200vh] z-50 top-0 right-0'></div>
      <div
        style={{ scrollbarWidth: 'none' }}
        className={`fixed overflow-auto p-8 z-50 right-0 top-0 max-md:left-[0] max-md:w-[100%] w-[40vw] h-full bg-white border border-gray-300 shadow-lg transition-transform duration-300 ease-in-out right-side-animate`}>
        <form onSubmit={handleSubmit} className='flex flex-col bg-white '>
          <div className='sticky top-0 py-4 bg-white flex justify-between items-center w-full text-xl font-medium text-right text-gray-800'>
            <div className=' flex-1 shrink  min-w-[240px]'>
              {data ? 'ویرایش ذی‌‌نفع' : 'ذی‌ نفع جدید'}
            </div>
            <CloseSquare
              size={24}
              cursor='pointer'
              color='#50545F'
              onClick={() => close(false)}
            />
          </div>
          <div className='flex flex-col mt-7'>
            <p className='text-[#7747C0]'>انتخاب نوع ذی‌ نفع </p>
            <div className='flex flex-col gap-3 mt-2'>
              {beneficiaries.map((beneficiary, index) => (
                <label
                  key={index}
                  className='flex items-center gap-3 cursor-pointer'>
                  <input
                    type='radio'
                    defaultChecked={index === 0}
                    name='beneficiary'
                    value={beneficiary}
                    onChange={() =>
                      (refs.current.visitor_tob = index === 0 ? 1 : 2)
                    }
                    className='w-5 h-5 cursor-pointer accent-[#7747C0]'
                  />
                  <span className='text-gray-700'>{beneficiary}</span>
                </label>
              ))}
            </div>
          </div>
          {refs.current.visitor_tob === 1 ? (
            <>
              <div className='flex gap-4 my-2'>
                <div className='flex flex-col w-full'>
                  <label>نام</label>
                  <input
                    defaultValue={
                      data?.visitor_name || refs.current.visitor_name || ''
                    }
                    name='visitor_name'
                    onChange={handleChange}
                    placeholder='پرهام'
                    className={` ${errors.visitor_name && errorClass}`}
                  />
                  {errors.visitor_name && (
                    <span className='text-red-500'>{errors.visitor_name}</span>
                  )}
                </div>
                <div className='flex flex-col w-full'>
                  <label>نام خانوادگی</label>
                  <input
                    defaultValue={
                      data?.visitor_family || refs.current.visitor_family || ''
                    }
                    onChange={(e) =>
                      (refs.current.visitor_family = e.target.value)
                    }
                    placeholder='پازکی'
                    className={` ${errors.visitor_family && errorClass}`}
                  />
                  {errors.visitor_family && (
                    <span className='text-red-500'>
                      {errors.visitor_family}
                    </span>
                  )}
                </div>
              </div>
              <div className='flex gap-4 my-3'>
                <div className='flex flex-col w-full'>
                  <label>تخصص ذی‌ نفع</label>
                  <input
                    defaultValue={
                      data?.visitor_specialty ||
                      refs.current.visitor_specialty ||
                      ''
                    }
                    name='visitor_specialty'
                    onChange={handleChange}
                    placeholder='متخصص پوست و مو'
                  />
                </div>
                <div className='flex flex-col w-full'>
                  <label>شماره همراه ذی‌ نفع</label>
                  <input
                    defaultValue={
                      data?.visitor_tel || refs.current.visitor_tel || ''
                    }
                    name='visitor_tel'
                    onChange={handleChange}
                    placeholder='۰۹۱۲۷۶۸۵۶۴۷۳'
                    className={`border ${errors.visitor_tel && errorClass}`}
                  />
                  {errors.visitor_tel && (
                    <span className='text-red-500'>{errors.visitor_tel}</span>
                  )}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className='flex gap-4 my-2'>
                <div className='flex flex-col w-full'>
                  <label>نام کسب و کار</label>
                  <input
                    defaultValue={
                      data?.visitor_full_name || refs.current.visitor_name || ''
                    }
                    name='visitor_name'
                    onChange={handleChange}
                    placeholder='نام کسب و کار'
                    className={`border ${errors.visitor_name && errorClass}`}
                  />
                  {errors.visitor_name && (
                    <span className='text-red-500'>{errors.visitor_name}</span>
                  )}
                </div>
                <div className='flex flex-col w-full'>
                  <label>تلفن ثابت (با کد شهر) </label>
                  <input
                    defaultValue={
                      data?.visitor_tel || refs.current.visitor_tel || ''
                    }
                    name='visitor_tel'
                    onChange={handleChange}
                    placeholder='021-77889999'
                    className={`border ${errors.lastName && errorClass}`}
                  />
                  {errors.lastName && (
                    <span className='text-red-500'>{errors.lastName}</span>
                  )}
                </div>
              </div>
              <div className='flex gap-4 my-3'>
                <div className='flex flex-col w-full'>
                  <label>نام صاحب کسب و کار </label>
                  <input
                    defaultValue={
                      data?.visitor_family ||
                      refs.current.visitor_specialty ||
                      ''
                    }
                    name='visitor_specialty'
                    onChange={handleChange}
                    placeholder='متخصص پوست و مو'
                  />
                </div>
                <div className='flex flex-col w-full'>
                  <label>شماره همراه </label>
                  <input
                    defaultValue={
                      data?.visitor_tel || refs.current.visitor_tel || ''
                    }
                    onChange={handleChange}
                    name='visitor_tel'
                    placeholder='۰۹۱۲۷۶۸۵۶۴۷۳'
                  />
                  {errors.phone && (
                    <span className='text-red-500'>{errors.phone}</span>
                  )}
                </div>
              </div>
            </>
          )}
          <CitySelector
            setResult={(value: string) => (refs.current.CityUID = value)}
          />

          <Map
            coord={mapData}
            setCoord={setMapData}
            setAddress={(value: string) =>
              (refs.current.visitor_address = value)
            }
          />
          <div className='flex gap-3'>
            <div className=''>
              <label htmlFor=''> طول جغرافیایی</label>
              <input className='w-full' disabled value={mapData[0]} />
            </div>
            <div className=''>
              <label htmlFor=''>عرض جغرافیایی</label>
              <input className='w-full' disabled value={mapData[1]} />
            </div>
          </div>
          <div className='my-4'>
            <label>آدرس</label>
            <input
              defaultValue={
                data?.visitor_address || refs.current.visitor_address
              }
              name='visitor_address'
              onChange={handleChange}
              className={`w-full border ${
                errors.address ? 'border-red-500' : ''
              }`}
            />
            {errors.address && (
              <span className='text-red-500'>{errors.address}</span>
            )}
          </div>
          <div className='my-2'>
            <label>انتخاب وزن برای ذی‌ نفع</label>
            <select
              defaultValue={
                data?.default_weight || refs.current.default_weight || ''
              }
              onChange={(e) =>
                (refs.current.default_weight = parseInt(`${e.target.value}`))
              }
              className='w-full border rounded-lg h-10 px-1'>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </div>

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
              ثبت و ذخیره
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
        </form>
      </div>
    </div>
  )
}

export default AddModal
