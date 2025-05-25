import { getCookieByKey } from '@/actions/cookieToken'
import { BeneficiaryData } from '@/interfaces'
import { CreateBeneficiary, EditBeneficiary } from '@/services/items'
import { CloseSquare, Grammerly, SearchNormal } from 'iconsax-react'
import dynamic from 'next/dynamic'
import { useState, useRef } from 'react'
import CitySelector from '@/components/shared/CitySelector'
import { errorClass } from '@/app/assets/style'
import { getBeneficiaryData } from '@/actions/setData'
import { useData } from '@/Context/Data'
import { useStates } from '@/Context/States'
import { SearchAddress, searchAddress } from '@/components/Address/handler'
const Map = dynamic(() => import('../../Address/Map'), { ssr: false })

interface AddModalProps {
  data?: BeneficiaryData
  close: (show: boolean) => void
}

const AddModal = ({ data, close }: AddModalProps) => {
  const [mapData, setMapData] = useState<[number, number]>([
    data?.latitude || 35.72249924640049,
    data?.longitude || 51.335191350784214,
  ])
  const [step, setStep] = useState<number>(1)
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [type, setType] = useState<number>(1)
  const [search, setSearch] = useState<string>('')
  const [showDropdown, setShowDropdown] = useState<boolean>(false)
  const [errors, setErrors] = useState<Record<string, string | number>>({
    visitor_name: '',
    visitor_family: '',
    visitor_tel: '',
  })
  const [foundAddresses, setFoundAddresses] = useState<SearchAddress[]>([])
  const refs = useRef({
    supervisor_id: data?.supervisor_id || 0,
    visitor_type: data?.visitor_type || 0,
    visitor_tob: data?.visitor_tob || 1,
    visitor_uid: data?.visitor_uid || '',
    visitor_tel: data?.visitor_uid || '',
    visitor_full_name: data?.visitor_full_name || '',
    visitor_name: data?.visitor_name || '',
    visitor_family: data?.visitor_family || '',
    visitor_status: data?.visitor_status || 1,
    CityUID: data?.CityUID || '',
    visitor_address: data?.visitor_address || '',
    visitor_specialty: data?.visitor_specialty || 0,
    default_weight: data?.default_weight || 0,
    latitude: data?.latitude || 0,
    longitude: data?.longitude || 0,
  })
  const { setBeneficiaryData } = useData()
  const { showModal, submitting, setSubmitting } = useStates()
  const beneficiaries = ['شخص', 'کسب و کار']
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    refs.current = {
      ...refs.current,
      [name]: value,
    }
    setErrors({ ...errors, [name]: '' })
  }
  const handleSubmit = async () => {
    setIsConfirmed(true)
    const newErrors: Record<string, string> = {}
    if (!refs.current.visitor_name) newErrors.visitor_name = 'این فیلد اجباریست'
    if (!refs.current.visitor_family)
      newErrors.visitor_family = 'این فیلد اجباریست'
    if (!refs.current.visitor_tel) newErrors.visitor_tel = 'این فیلد اجباریست'
    setErrors(newErrors)
    console.log(newErrors)
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    const accessToken = await getCookieByKey('access_token')
    setSubmitting(true)
    if (data && data.visitor_uid) {
      EditBeneficiary({
        ...data,
        ...Object.fromEntries(
          Object.entries(refs.current).filter(
            ([, value]) => value !== '' && value !== 0
          )
        ),
        accessToken,
      })
        .then(async (value) => {
          if (value?.status === 1) {
            showModal({
              type: 'success',
              main: <p>{value.message}</p>,
              title: 'موفق',
              autoClose: 2,
            })
            await getBeneficiaryData().then((result) => {
              if (result) setBeneficiaryData(result)
            })
          } else
            showModal({
              type: 'error',
              main: <p>{value.message}</p>,
              title: 'خطا',
              autoClose: 2,
            })
          close(false)
        })
        .catch(() =>
          showModal({
            type: 'error',
            main: <p>خطایی پیش آمد</p>,
            title: 'خطا',
            autoClose: 2,
          })
        )
    } else {
      await CreateBeneficiary({
        accessToken,
        ...refs.current,
        visitor_full_name:
          type === 1
            ? refs.current.visitor_name + ' ' + refs.current.visitor_family
            : refs.current.visitor_full_name,
        visitor_uid: refs.current?.visitor_tel,
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
    setSubmitting(false)
  }
  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!refs.current.visitor_name) newErrors.visitor_name = 'این فیلد اجباریست'
    if (!refs.current.visitor_family)
      newErrors.visitor_family = 'این فیلد اجباریست'
    if (!refs.current.visitor_tel) newErrors.visitor_tel = 'این فیلد اجباریست'
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    } else setStep(step === 1 ? 2 : 1)
  }

  const handleSearchChange = async (value: string) => {
    setSearch(value)
    if (value.length > 2) {
      await searchAddress(value, setFoundAddresses)
      setShowDropdown(true)
    } else {
      setShowDropdown(false)
    }
  }
  const handleSelectAddress = (selected: SearchAddress) => {
    setMapData([selected?.y, selected?.x])
    refs.current.visitor_address = selected.title
    setShowDropdown(false)
  }
  return (
    <div>
      <div className='absolute bg-slate-600 opacity-50 w-full h-[200vh] z-50 top-0 right-0'></div>
      <div
        style={{ scrollbarWidth: 'none' }}
        className={`fixed overflow-auto px-8 z-50 right-0 top-0 max-md:left-[0] max-md:w-[100%] w-[40vw] h-full bg-white border border-gray-300 shadow-lg transition-transform duration-300 ease-in-out right-side-animate`}>
        <div className='sticky top-0 py-4 bg-white flex justify-between items-center w-full text-xl font-medium text-right text-gray-800'>
          <div className=' flex-1 shrink  min-w-[240px]'>
            {data?.visitor_uid ? 'ویرایش ذی‌‌نفع' : 'ذی‌ نفع جدید'}
          </div>
          <CloseSquare
            size={24}
            cursor='pointer'
            color='#50545F'
            onClick={() => close(false)}
          />
        </div>
        <div className='w-full flex justify-around items-center mb-6 '>
          <div className='w-[49%] absolute flex'>
            <div className='border w-full border-[#7747C0]'></div>
            <div
              className={`border w-full ${
                step > 1 ? 'border-[#7747C0]' : 'border-[#C9D0D8]'
              }`}></div>
          </div>
          {['اطلاعات اولیه', 'اطلاعات آدرس'].map((section, index) => (
            <div className='flex flex-col items-center' key={index}>
              <div
                onClick={() => validateForm()}
                className={`w-10 h-10 z-30 p-6 flex items-center justify-center rounded-full border-4  border-white mt-5 cursor-pointer text-white ${
                  step >= index + 1
                    ? ' bg-[#7747C0] '
                    : 'bg-[#C9D0D8] text-[#50545F]'
                }`}>
                {index + 1}
              </div>
              <p className=' text-[#7747C0]'>{section}</p>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className='flex flex-col bg-white '>
          {step === 1 ? (
            <>
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
                        onChange={() => {
                          setType(index === 0 ? 1 : 2)
                          refs.current.visitor_tob = index === 0 ? 1 : 2
                        }}
                        className='w-5 h-5 cursor-pointer accent-[#7747C0]'
                      />
                      <span className='text-gray-700'>{beneficiary}</span>
                    </label>
                  ))}
                </div>
              </div>
              {type === 1 ? (
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
                        <span className='text-red-500'>
                          {errors.visitor_name}
                        </span>
                      )}
                    </div>
                    <div className='flex flex-col w-full'>
                      <label>نام خانوادگی</label>
                      <input
                        defaultValue={
                          data?.visitor_family ||
                          refs.current.visitor_family ||
                          ''
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
                        type='number'
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
                        <span className='text-red-500'>
                          {errors.visitor_tel}
                        </span>
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
                          data?.visitor_full_name ||
                          refs.current.visitor_full_name ||
                          ''
                        }
                        name='visitor_name'
                        onChange={handleChange}
                        placeholder='نام کسب و کار'
                        className={`border ${
                          errors.visitor_full_name && errorClass
                        }`}
                      />
                      {errors.visitor_full_name && (
                        <span className='text-red-500'>
                          {errors.visitor_full_name}
                        </span>
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
                        defaultValue={refs.current.visitor_full_name}
                        className={`border ${
                          errors.visitor_full_name && errorClass
                        }`}
                        name='visitor_full_name'
                        onChange={handleChange}
                        placeholder='امیر'
                      />
                    </div>
                    <div className='flex flex-col w-full'>
                      <label>نام خانوادگی صاحب کسب و کار </label>
                      <input
                        defaultValue={refs.current.visitor_family}
                        className={`border ${
                          errors.visitor_family && errorClass
                        }`}
                        name='visitor_family'
                        onChange={handleChange}
                        placeholder='امیدی'
                      />
                    </div>
                  </div>
                  <div className='flex gap-4 my-3'>
                    <div className='flex flex-col w-full'>
                      <label>تخصص ذی نفع </label>
                      <input
                        defaultValue={
                          data?.visitor_specialty ||
                          refs.current.visitor_specialty ||
                          ''
                        }
                        onChange={handleChange}
                        name='visitor_specialty'
                        className={`border ${
                          errors.visitor_specialty && errorClass
                        }`}
                        placeholder='روانپزشکی'
                      />
                    </div>
                    <div className='flex flex-col w-full'>
                      <label>شماره همراه </label>
                      <input
                        defaultValue={
                          data?.visitor_uid || refs.current.visitor_uid || ''
                        }
                        onChange={handleChange}
                        name='visitor_uid'
                        className={`border ${errors.visitor_uid && errorClass}`}
                        placeholder='۰۹۱۲۷۶۸۵۶۴۷۳'
                      />
                      {errors.visitor_uid && (
                        <span className='text-red-500'>
                          {errors.visitor_uid}
                        </span>
                      )}
                    </div>
                  </div>
                </>
              )}
              <div className='my-2'>
                <label>انتخاب وزن برای ذی‌ نفع</label>
                <select
                  defaultValue={
                    data?.default_weight || refs.current.default_weight || ''
                  }
                  onChange={(e) =>
                    (refs.current.default_weight = parseInt(
                      `${e.target.value}`
                    ))
                  }
                  className='w-full border rounded-lg h-10 px-1'>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select>
              </div>
            </>
          ) : (
            <>
              <CitySelector
                state={data?.StateCode || ''}
                countyCode={data?.CountyCode || ''}
                city={data?.CityUID || ''}
                setResult={(value: string) => (refs.current.CityUID = value)}
              />

              <div className='relative'>
                <div className='relative w-full flex items-center'>
                  <div className='absolute left-[18px] top-[18px] z-20 cursor-pointer text-[#50545F]'>
                    <SearchNormal size={24} color='gray' />
                  </div>
                  <input
                    type='search'
                    placeholder='جستجو'
                    value={search}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className='absolute top-[12px] right-[12px] w-[calc(100%-24px)] z-10 border border-gray-300 rounded-md px-4 py-2 text-right outline-none focus:border-red-400'
                  />
                </div>

                {showDropdown && (
                  <div className='absolute top-[calc(100%+48px)] right-[12px] w-[calc(100%-24px)] bg-white border border-gray-300 mt-1 max-h-40 overflow-y-auto z-20 rounded-md shadow-md'>
                    {foundAddresses.map((item, index) => (
                      <div
                        key={index}
                        className='p-2 cursor-pointer hover:bg-gray-100'
                        onClick={() => handleSelectAddress(item)}>
                        {item.title}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <Map
                coord={
                  data?.latitude ? [data.latitude, data.longitude] : mapData
                }
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
                  defaultValue={refs.current.visitor_address}
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
            </>
          )}
        </form>
        <div className='flex items-center'>
          <button
            type={step === 1 ? 'button' : 'submit'}
            onClick={() => (step === 1 ? validateForm() : handleSubmit())}
            style={{
              animation: `${
                isConfirmed
                  ? 'hideSubmitAnimate 1s ease-in-out forwards '
                  : 'showSubmitAnimate 1s ease-in-out forwards '
              }`,
            }}
            disabled={submitting}
            className={`w-full ${
              submitting && 'opacity-30 cursor-not-allowed'
            } fill-button px-10 h-10 mt-10 rounded-lg transition-transform duration-200 ease-in-out hover:scale-105`}>
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
      </div>
    </div>
  )
}

export default AddModal
