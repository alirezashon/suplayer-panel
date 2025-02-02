import { getCookieByKey } from '@/actions/cookieToken'
import { Cities, County, ReferrerData, States } from '@/interfaces'
import { CreateReferrer } from '@/services/referrer'
import { GetCity, GetCounty, GetStates } from '@/services/location'
import { CloseSquare } from 'iconsax-react'
import { useState, useRef, useEffect } from 'react'
import Calendar from '@/components/shared/Calendar'
import toast from 'react-hot-toast'
import { useData } from '@/Context/Data'

interface AddModalProps {
  data?: ReferrerData
  close: (show: boolean) => void
}

const AddModal = ({ data, close }: AddModalProps) => {
  const [address, setAddress] = useState<string>('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [states, setStates] = useState<States[]>([])
  const [county, setCounty] = useState<County[]>([])
  const [cities, Setcities] = useState<Cities[]>([])
  const [referrerType, setReferrerType] = useState<number>(0)
  const [step, setStep] = useState<number>(1)
  const { referrerChartData } = useData()
  const refs = useRef({
    personnel_code: '',
    pers_chart_id: 0,
    pers_job_id: 0,
    pers_type: 1,
    pers_tob: 0,
    pers_uid: '',
    pers_tel: '',
    pers_full_name: '',
    pers_name: '',
    pers_family: '',
    pers_status: 1,
    CityUID: '',
    pers_address: '',
  })
  const nameRef = useRef<HTMLInputElement>(null)
  const lastNameRef = useRef<HTMLInputElement>(null)
  const specialityRef = useRef<HTMLInputElement>(null)
  const phoneRef = useRef<HTMLInputElement>(null)
  const addressRef = useRef<HTMLInputElement>(null)
  const locationRefs = useRef({ state: '', county: '', city: '' })

  const beneficiaries = ['شخص', 'کسب و کار']

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setErrors({})
    const formData = {
      name: nameRef.current?.value.trim() || '',
      lastName: lastNameRef.current?.value.trim() || '',
      speciality: specialityRef.current?.value.trim() || '',
      phone: phoneRef.current?.value.trim() || '',
      address: addressRef.current?.value.trim() || '',
    }

    const newErrors: Record<string, string> = {}
    Object.keys(formData).forEach((key) => {
      if (!formData[key as keyof typeof formData]) {
        newErrors[key] = 'این فیلد اجباری است'
      }
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    const accessToken = (await getCookieByKey('access_token')) || ''
    await CreateReferrer({
      accessToken,
      personnel_code: '',
      pers_chart_id: 0,
      pers_job_id: 0,
      pers_type: 1,
      pers_tob: referrerType,
      pers_uid: '',
      pers_tel: formData.phone,
      pers_full_name: formData.name + formData.lastName,
      pers_name: formData.name,
      pers_family: formData.lastName,
      pers_status: 1,
      CityUID: '',
      pers_address: formData.address,
    })
  }
  useEffect(() => {
    const getLocs = async () => {
      const accessToken = await getCookieByKey('access_token')
      await GetStates({ accessToken }).then(async (value) => {
        if (value) {
          setStates(value)
          await GetCounty({ accessToken, state: value[0].StateCode }).then(
            async (counties) => {
              if (counties) {
                setCounty(counties)
                await GetCity({
                  accessToken,
                  state: value[0].StateCode,
                  county: counties[0].CountyCode,
                }).then((cityList) => {
                  if (cityList) {
                    Setcities(cityList)
                  }
                })
              }
            }
          )
        }
      })
    }
    getLocs()
  }, [])

  const getCounty = async (state: string) => {
    const accessToken = await getCookieByKey('access_token')
    await GetCounty({ accessToken, state: state }).then(async (counties) => {
      if (counties) {
        setCounty(counties)
        await GetCity({
          accessToken,
          state: state,
          county: locationRefs.current.county,
        }).then((cityList) => {
          if (cityList) {
            Setcities(cityList)
          }
        })
      }
    })
  }
  const getCity = async (county: string) => {
    const accessToken = await getCookieByKey('access_token')
    await GetCity({
      accessToken,
      state: locationRefs.current.state,
      county: county,
    }).then((cityList) => {
      if (cityList) {
        Setcities(cityList)
      }
    })
  }

  return (
    <div>
      <div className='absolute bg-slate-600 opacity-50 w-full h-[200vh] z-50 top-0 right-0'></div>
      <div
        style={{ scrollbarWidth: 'none' }}
        className={`fixed overflow-auto  z-50 right-0 top-0 max-md:left-[0] max-md:w-[100%] w-[40vw] h-full bg-white border border-gray-300 shadow-lg transition-transform duration-300 ease-in-out right-side-animate`}>
        <div className='sticky top-0 p-3 bg-white flex justify-between items-center w-[97%] text-xl font-medium text-right text-gray-800'>
          <div className=' flex-1 shrink my-auto min-w-[240px]'>
            بازاریاب جدید
          </div>
          <CloseSquare
            size={24}
            cursor='pointer'
            color='#50545F'
            onClick={() => close(false)}
          />
        </div>
        <div className='w-full flex justify-around items-center my-6 '>
          <div className='w-[55%] absolute flex'>
            <div className='border w-full border-[#7747C0]'></div>
            <div
              className={`border w-full ${
                step > 1 ? 'border-[#7747C0]' : 'border-[#C9D0D8]'
              }`}></div>
          </div>
          {['انتخاب سطح بازاریاب', ' اطلاعات فردی بازاریاب'].map(
            (section, index) => (
              <div className='flex flex-col items-center' key={index}>
                <div
                  onClick={() => setStep(index + 1)}
                  className={`w-10 h-10 z-30 p-6 flex items-center justify-center rounded-full border-4  border-white mt-5 cursor-pointer text-white ${
                    step >= index + 1
                      ? ' bg-[#7747C0] '
                      : 'bg-[#C9D0D8] text-[#50545F]'
                  }`}>
                  {index + 1}
                </div>
                <p className=' text-[#7747C0]'>{section}</p>
              </div>
            )
          )}
        </div>
        {step === 1 ? (
          <div className='flex flex-col mt-3'>
            <p className='text-[#7747C0]'>انتخاب نوع بازاریاب</p>
            <div className='grid grid-cols-2  gap-4 mt-4'>
              {referrerChartData?.map((chart, index) => (
                <label
                  key={index}
                  className='flex items-center gap-3 cursor-pointer'>
                  <input
                    type='radio'
                    defaultChecked={index === 0}
                    name='beneficiary'
                    value={refs.current.pers_chart_id || chart.id}
                    onChange={() => (refs.current.pers_chart_id = chart.id)}
                    className='w-5 h-5 cursor-pointer accent-[#7747C0]'
                  />
                  <span className='text-gray-700'>{chart.chtitle}</span>
                </label>
              ))}
            </div>
            <div className='w-full mt-10 sticky bottom-0 left-0 right-0 bg-white flex items-center gap-4 p-2 max-w-[40vw] mx-auto'>
              <button
                onClick={() => setStep(2)}
                className='w-full h-10 text-white bg-[#7747C0] rounded-lg'>
                مرحله بعد
              </button>
              <button
                onClick={() => close(false)}
                className='flex justify-center items-center w-full h-10 border border-[#7747C0] text-[#7747C0] rounded-lg hover:bg-purple-100'>
                انصراف
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className='flex flex-col mx-2 my-2 bg-white p-4'>
            <div className='flex flex-col mt-3'>
              <p className='text-[#7747C0]'>انتخاب نوع بازاریاب</p>
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
                      onChange={() => setReferrerType(index)}
                      className='w-5 h-5 cursor-pointer accent-[#7747C0]'
                    />
                    <span className='text-gray-700'>{beneficiary}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className='flex gap-4 my-2'>
              <div className='flex flex-col w-full'>
                <label>نام</label>
                <input
                  ref={nameRef}
                  defaultValue={data?.pers_name || ''}
                  type='text'
                  placeholder='پرهام'
                  className={`border ${errors.name ? 'border-red-500' : ''}`}
                />
                {errors.name && (
                  <span className='text-red-500'>{errors.name}</span>
                )}
              </div>
              <div className='flex flex-col w-full'>
                <label>نام خانوادگی</label>
                <input
                  ref={lastNameRef}
                  defaultValue={data?.pers_family || ''}
                  type='text'
                  placeholder='پازکی'
                  className={`border ${
                    errors.lastName ? 'border-red-500' : ''
                  }`}
                />
                {errors.lastName && (
                  <span className='text-red-500'>{errors.lastName}</span>
                )}
              </div>
            </div>
            <div className='flex gap-4 my-3'>
              <div className='flex flex-col w-full'>
                <label>وضعیت تاهل</label>
                <select
                  className='w-full border rounded-lg h-10 px-1 outline-none'
                  onChange={(e) => {
                    getCounty(e.target.value)
                    locationRefs.current.state = e.target.value
                  }}>
                  <option value={1}>مجرد</option>
                  <option value={2}>بدبخت شده</option>
                </select>
                {errors.phone && (
                  <span className='text-red-500'>{errors.phone}</span>
                )}
              </div>
              <div className='flex flex-col w-full'>
                <label>تخصص بازاریاب</label>
                <input
                  ref={specialityRef}
                  defaultValue={data?.pers_job_id || ''}
                  type='text'
                  placeholder='متخصص پوست و مو'
                  className={`border ${
                    errors.speciality ? 'border-red-500' : ''
                  }`}
                />
                {errors.speciality && (
                  <span className='text-red-500'>{errors.speciality}</span>
                )}
              </div>
            </div>
            <div className='flex gap-4 my-3'>
              <div className='flex flex-col w-full'>
                <label>آخرین مدرک تحصیلی </label>
                <select
                  className='w-full border rounded-lg h-10 px-1 outline-none'
                  onChange={(e) => {
                    getCounty(e.target.value)
                    locationRefs.current.state = e.target.value
                  }}>
                  <option value={1}>پنجم دبستان</option>
                  <option value={2}>سیکل </option>
                </select>
                {errors.phone && (
                  <span className='text-red-500'>{errors.phone}</span>
                )}
              </div>
              <div className='flex flex-col w-full'>
                <label>آخرین رشته تحصیلی </label>
                <select
                  className='w-full border rounded-lg h-10 px-1 outline-none'
                  onChange={(e) => {
                    getCounty(e.target.value)
                    locationRefs.current.state = e.target.value
                  }}>
                  <option value={1}> آبیاری گیاهان دریایی</option>
                  <option value={2}> فضانوردی با موتوری </option>
                </select>
                {errors.speciality && (
                  <span className='text-red-500'>{errors.speciality}</span>
                )}
              </div>
            </div>
            <div className='flex gap-4 my-3'>
              <div className='flex flex-col w-full'>
                <label>جنسیت </label>
                <select
                  className='w-full border rounded-lg h-10 px-1 outline-none'
                  onChange={(e) => {
                    getCounty(e.target.value)
                    locationRefs.current.state = e.target.value
                  }}>
                  <option value={1}>زن </option>
                  <option value={2}>مرد </option>
                </select>
                {errors.phone && (
                  <span className='text-red-500'>{errors.phone}</span>
                )}
              </div>
              <div className='flex flex-col w-full'>
                <label> تاریخ تولد </label>
                <Calendar
                  setDate={(value: string) => toast.success(value)}
                  placeholder='۱۳۵۶/۰۶/۲۳'
                />
                {errors.speciality && (
                  <span className='text-red-500'>{errors.speciality}</span>
                )}
              </div>
            </div>
            <div className='flex gap-4 my-3'>
              <div className='flex-1'>
                <label> استان </label>
                <select
                  className='w-full border rounded-lg h-10 px-1 outline-none'
                  onChange={(e) => {
                    getCounty(e.target.value)
                    locationRefs.current.state = e.target.value
                  }}>
                  {states.length > 0 &&
                    states.map((item, index) => (
                      <option key={index} value={item.StateCode}>
                        {item.StateDesc}
                      </option>
                    ))}
                </select>
              </div>
              <div className='flex-1'>
                <label> شهرستان </label>
                <select
                  className='w-full border rounded-lg h-10 px-1 outline-none'
                  onChange={(e) => {
                    getCity(e.target.value)
                    locationRefs.current.county = e.target.value
                  }}>
                  {county.length > 0 &&
                    county.map((item, index) => (
                      <option key={index} value={item.CountyCode}>
                        {item.CountyDesc}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className='flex gap-4 my-3'>
              <div className='flex-1'>
                <label> شهر </label>
                <select
                  className='w-full border rounded-lg h-10 px-1 outline-none'
                  onChange={(e) =>
                    (locationRefs.current.city = e.target.value)
                  }>
                  {cities.length > 0 &&
                    cities.map((item, index) => (
                      <option key={index} value={item.CityUID}>
                        {item.CityDesc}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div className='my-4'>
              <label>آدرس</label>
              <input
                value={address.length > 0 ? address : data?.pers_address}
                onChange={(e) => setAddress(e.target.value)}
                type='text'
                className={`w-full border ${
                  errors.address ? 'border-red-500' : ''
                }`}
              />
              {errors.address && (
                <span className='text-red-500'>{errors.address}</span>
              )}
            </div>

            <div className='w-full sticky bottom-0 left-0 right-0 bg-white flex items-center gap-4 p-2 max-w-[40vw] mx-auto'>
              <button
                type='submit'
                className='w-full h-10 text-white bg-[#7747C0] rounded-lg'>
                ثبت و ادامه
              </button>
              <button
                type='submit'
                className='flex justify-center items-center w-full h-10 border border-[#7747C0] text-[#7747C0] rounded-lg hover:bg-purple-100'>
                ثبت و بررسی
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default AddModal
