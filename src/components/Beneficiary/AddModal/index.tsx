import { getCookieByKey } from '@/actions/cookieToken'
import { Cities, County, States } from '@/interfaces'
import { CreateBeneficiary } from '@/services/items'
import { GetCity, GetCounty, GetStates } from '@/services/location'
import { CloseSquare, Grammerly } from 'iconsax-react'
import { useState, useRef, useEffect } from 'react'

interface FormData {
  name?: string
  lastName?: string
  speciality?: string
  phone?: string
  address?: string
  weight?: number
}

interface AddModalProps {
  data?: FormData
  close: (show: boolean) => void
}

const AddModal = ({ data, close }: AddModalProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [states, setStates] = useState<States[]>([])
  const [county, setCounty] = useState<County[]>([])
  const [cities, Setcities] = useState<Cities[]>([])
  const [beneficiaryType, setBeneficiaryType] = useState<1 | 2>(1)
  const [isConfirmed, setIsConfirmed] = useState(false)

  const detailsRefs = useRef({
    name: '',
    lastName: '',
    speciality: '',
    phone: '',
    address: '',
    weight: 1,
  })
  const locationRefs = useRef({ state: '', county: '', city: '' })
  const beneficiaries = ['شخص', 'کسب و کار']

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsConfirmed(true)
    const accessToken = await getCookieByKey('access_token')

    setErrors({})

    const newErrors: Record<string, string> = {}
    Object.keys(detailsRefs).forEach((key) => {
      if (!detailsRefs[key as keyof typeof detailsRefs]) {
        newErrors[key] = 'این فیلد اجباری است'
      }
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    await CreateBeneficiary({
      accessToken,
      name: detailsRefs.current.name?.trim() || '',
      family: detailsRefs.current.lastName?.trim() || '',
      fullName: '',
      mobile: detailsRefs.current.phone?.trim() || '',
      CityUID: locationRefs.current.city?.trim() || '',
      address: detailsRefs.current.address?.trim() || '',
      expertise: detailsRefs.current.speciality?.trim() || '',
      weight: detailsRefs.current.weight || 1,
      lat: 0,
      long: 0,
      tob: beneficiaryType,
    })
    setTimeout(() => {
      setIsConfirmed(false)
    }, 2222)
  }

  return (
    <div>
      <div className='absolute bg-slate-600 opacity-50 w-full h-[200vh] z-50 top-0 right-0'></div>
      <div
        style={{ scrollbarWidth: 'none' }}
        className={`fixed overflow-auto  z-50 right-0 top-0 max-md:left-[0] max-md:w-[100%] w-[40vw] h-full bg-white border border-gray-300 shadow-lg transition-transform duration-300 ease-in-out right-side-animate`}>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col mx-2 my-2 bg-white pb-[70px]'>
          <div className='sticky top-0 bg-white flex justify-between items-center w-full text-xl font-medium text-right text-gray-800'>
            <div className=' flex-1 shrink my-auto min-w-[240px]'>
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
                    onChange={() => setBeneficiaryType(index === 0 ? 1 : 2)}
                    className='w-5 h-5 cursor-pointer accent-[#7747C0]'
                  />
                  <span className='text-gray-700'>{beneficiary}</span>
                </label>
              ))}
            </div>
          </div>
          {beneficiaryType === 1 ? (
            <>
              <div className='flex gap-4 my-2'>
                <div className='flex flex-col w-full'>
                  <label>نام</label>
                  <input
                    defaultValue={data?.name || detailsRefs.current.name || ''}
                    onChange={(e) =>
                      (detailsRefs.current.name = e.target.value)
                    }
                    placeholder='محمدی حسین'
                    className={`border ${errors.name ? 'border-red-500' : ''}`}
                  />
                  {errors.name && (
                    <span className='text-red-500'>{errors.name}</span>
                  )}
                </div>
                <div className='flex flex-col w-full'>
                  <label>نام خانوادگی</label>
                  <input
                    defaultValue={
                      data?.lastName || detailsRefs.current.lastName || ''
                    }
                    onChange={(e) =>
                      (detailsRefs.current.lastName = e.target.value)
                    }
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
                  <label>تخصص ذی‌ نفع</label>
                  <input
                    defaultValue={
                      data?.speciality || detailsRefs.current.speciality || ''
                    }
                    onChange={(e) =>
                      (detailsRefs.current.speciality = e.target.value)
                    }
                    placeholder='متخصص پوست و مو'
                    className={`border ${
                      errors.speciality ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.speciality && (
                    <span className='text-red-500'>{errors.speciality}</span>
                  )}
                </div>
                <div className='flex flex-col w-full'>
                  <label>شماره همراه ذی‌ نفع</label>
                  <input
                    defaultValue={
                      data?.phone || detailsRefs.current.phone || ''
                    }
                    onChange={(e) =>
                      (detailsRefs.current.phone = e.target.value)
                    }
                    placeholder='۰۹۱۲۷۶۸۵۶۴۷۳'
                    className={`border ${errors.phone ? 'border-red-500' : ''}`}
                  />
                  {errors.phone && (
                    <span className='text-red-500'>{errors.phone}</span>
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
                    defaultValue={data?.name || detailsRefs.current.name || ''}
                    onChange={(e) =>
                      (detailsRefs.current.name = e.target.value)
                    }
                    placeholder='محمدی حسین'
                    className={`border ${errors.name ? 'border-red-500' : ''}`}
                  />
                  {errors.name && (
                    <span className='text-red-500'>{errors.name}</span>
                  )}
                </div>
                <div className='flex flex-col w-full'>
                  <label>تلفن ثابت (با کد شهر) </label>
                  <input
                    defaultValue={
                      data?.phone || detailsRefs.current.phone || ''
                    }
                    onChange={(e) =>
                      (detailsRefs.current.phone = e.target.value)
                    }
                    placeholder='021-77889999'
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
                  <label>نام صاحب کسب و کار </label>
                  <input
                    defaultValue={
                      data?.speciality || detailsRefs.current.speciality || ''
                    }
                    onChange={(e) =>
                      (detailsRefs.current.speciality = e.target.value)
                    }
                    placeholder='متخصص پوست و مو'
                    className={`border ${
                      errors.speciality ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.speciality && (
                    <span className='text-red-500'>{errors.speciality}</span>
                  )}
                </div>
                <div className='flex flex-col w-full'>
                  <label>شماره همراه </label>
                  <input
                    defaultValue={
                      data?.phone || detailsRefs.current.phone || ''
                    }
                    onChange={(e) =>
                      (detailsRefs.current.phone = e.target.value)
                    }
                    placeholder='۰۹۱۲۷۶۸۵۶۴۷۳'
                    className={`border ${errors.phone ? 'border-red-500' : ''}`}
                  />
                  {errors.phone && (
                    <span className='text-red-500'>{errors.phone}</span>
                  )}
                </div>
              </div>
            </>
          )}
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
                onChange={(e) => (locationRefs.current.city = e.target.value)}>
                {cities.length > 0 &&
                  cities.map((item, index) => (
                    <option key={index} value={item.CityUID}>
                      {item.CityDesc}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className='my-2'>
            <label>انتخاب وزن برای ذی‌ نفع</label>
            <select
              defaultValue={data?.weight || detailsRefs.current.weight || ''}
              onChange={(e) =>
                (detailsRefs.current.weight = parseInt(`${e.target.value}`))
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
