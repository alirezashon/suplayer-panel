import { getCookieByKey } from '@/actions/cookieToken'
import { Cities, County, States } from '@/interfaces'
import { CreateReferrer } from '@/services/items'
import { GetCity, GetCounty, GetStates } from '@/services/location'
import { CloseSquare, SearchNormal } from 'iconsax-react'
import { useState, useRef, useEffect } from 'react'

interface FormData {
  name?: string
  lastName?: string
  speciality?: string
  phone?: string
  address?: string
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
  const [showDropdown, setShowDropdown] = useState<
    'states' | 'county' | 'city' | null
  >()
  const [search, setSearch] = useState<string>('')
  const [referrerType, setReferrerType] = useState<number>(0)
  const nameRef = useRef<HTMLInputElement>(null)
  const lastNameRef = useRef<HTMLInputElement>(null)
  const specialityRef = useRef<HTMLInputElement>(null)
  const phoneRef = useRef<HTMLInputElement>(null)
  const addressRef = useRef<HTMLInputElement>(null)
  const weightRef = useRef<HTMLSelectElement>(null)
  const locationRefs = useRef({state:'',county:'',city:''})
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

  const getCounty = async () => {
    const accessToken = await getCookieByKey('access_token')
        await GetCounty({ accessToken, state: locationRefs.current.state }).then(
          async (counties) => {
            if (counties) {
              setCounty(counties)
              await GetCity({
                accessToken,
                state: locationRefs.current.state,
                county: locationRefs.current.county
              }).then((cityList) => {
                if (cityList) {
                  Setcities(cityList)
                }
              })
            }
          }
        )
      }
   
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // setErrors({})
    // const formData = {
    //   name: nameRef.current?.value.trim() || '',
    //   lastName: lastNameRef.current?.value.trim() || '',
    //   speciality: specialityRef.current?.value.trim() || '',
    //   phone: phoneRef.current?.value.trim() || '',
    //   address: addressRef.current?.value.trim() || '',
    //   weight: weightRef.current?.value || '',
    // }

    // const newErrors: Record<string, string> = {}
    // Object.keys(formData).forEach((key) => {
    //   if (!formData[key as keyof typeof formData]) {
    //     newErrors[key] = 'این فیلد اجباری است'
    //   }
    // })

    // if (Object.keys(newErrors).length > 0) {
    //   setErrors(newErrors)
    //   return
    // }

    // await CreateReferrer({
    //   accessToken: '',
    //   name: formData.name,
    //   family: formData.lastName,
    //   mobile: '',
    //   fullName: '',
    // })
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
                    onChange={() => setReferrerType(index)}
                    className='w-5 h-5 cursor-pointer accent-[#7747C0]'
                  />
                  <span className='text-gray-700'>{beneficiary}</span>
                </label>
              ))}
            </div>
          </div>

          {referrerType === 0 ? (
            <>
              <div className='flex gap-4 my-2'>
                <div className='flex flex-col w-full'>
                  <label>نام</label>
                  <input
                    ref={nameRef}
                    defaultValue={data?.name || ''}
                    type='text'
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
                    ref={lastNameRef}
                    defaultValue={data?.lastName || ''}
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
                  <label>تخصص ذی‌ نفع</label>
                  <input
                    ref={specialityRef}
                    defaultValue={data?.speciality || ''}
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
                <div className='flex flex-col w-full'>
                  <label>شماره همراه ذی‌ نفع</label>
                  <input
                    ref={phoneRef}
                    defaultValue={data?.phone || ''}
                    type='text'
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
                    ref={nameRef}
                    defaultValue={data?.name || ''}
                    type='text'
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
                    ref={lastNameRef}
                    defaultValue={data?.lastName || ''}
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
                  <label>نام صاحب کسب و کار </label>
                  <input
                    ref={specialityRef}
                    defaultValue={data?.speciality || ''}
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
                <div className='flex flex-col w-full'>
                  <label>شماره همراه </label>
                  <input
                    ref={phoneRef}
                    defaultValue={data?.phone || ''}
                    type='text'
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
                ref={weightRef}
                className='w-full border rounded-lg h-10 px-1 outline-none'>
                {states.length > 0 &&
                  states.map((item, index) => (
                    <option key={index} defaultValue={item.StateCode}>
                      {item.StateDesc}
                    </option>
                  ))}
              </select>
            </div>
            <div className='flex-1'>
              <label> شهرستان </label>
              <select
                ref={weightRef}
                className='w-full border rounded-lg h-10 px-1 outline-none'>
                {county.length > 0 &&
                  county.map((item, index) => (
                    <option key={index} defaultValue={item.CountyCode}>
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
                ref={weightRef}
                className='w-full border rounded-lg h-10 px-1 outline-none'>
                {cities.length > 0 &&
                  cities.map((item, index) => (
                    <option key={index} defaultValue={item.CountyCode}>
                      {item.CountyDesc}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className='my-2'>
            <label>انتخاب وزن برای ذی‌ نفع</label>
            <select
              ref={weightRef}
              className='w-full border rounded-lg h-10 px-1'>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
            </select>
          </div>
        </form>
        <div className='sticky bottom-0 left-0 right-0 bg-white flex items-center gap-4 p-2 max-w-[40vw] mx-auto'>
          <button
            type='submit'
            className='w-full h-10 text-white bg-[#7747C0] rounded-lg'>
            ثبت و ذخیره
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddModal
