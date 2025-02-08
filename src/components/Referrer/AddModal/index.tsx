import { getCookieByKey } from '@/actions/cookieToken'
import { EducationalDegree, Major, ReferrerData } from '@/interfaces'
import { CreateReferrer } from '@/services/referrer'
import { CloseSquare } from 'iconsax-react'
import { useState, useRef, useEffect } from 'react'
import { useData } from '@/Context/Data'
import CitySelector from '@/components/shared/CitySelector'
import { GetEducationalDegree, GetMajor } from '@/services/general'
import { useMenu } from '@/Context/Menu'
import { errorClass } from '@/app/assets/style'

import { getReferrerData } from '@/actions/setData'
import { useStates } from '@/Context/States'

interface AddModalProps {
  data?: ReferrerData
  close: (show: boolean) => void
}

const AddModal = ({ data, close }: AddModalProps) => {
  const [step, setStep] = useState<number>(1)
  const [educational, setEducational] = useState<{
    major?: Major[]
    degree?: EducationalDegree[]
  }>()

  const text = [
    'text-purple-800',
    'text-blue-800',
    'text-yellow-600',
    'text-green-800',
    'text-red-700',
  ]
  const bg = [
    'bg-purple-200',
    'bg-blue-200',
    'bg-yellow-200',
    'bg-green-200',
    'bg-red-200',
  ]
  const { referrerChartData, setReferrerData } = useData()
  const { setMenu } = useMenu()
  const { showModal } = useStates()
  const refererTypes = ['شخص', 'کسب و کار']
  const [formData, setFormData] = useState({
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
    last_educational_degree_id: 0,
    last_educational_major_id: 0,
    marital_status_id: 0,
    sex_id: 0,
  })

  const [errors, setErrors] = useState<Record<string, string | number>>({
    pers_chart_id: 0,
    pers_tel: '',
    pers_name: '',
    pers_family: '',
    CityUID: '',
  })
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors({ ...errors, [name]: '' })
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}
    if (!formData.pers_name) newErrors.pers_name = 'این فیلد اجباریست'
    if (!formData.pers_family) newErrors.pers_family = 'این فیلد اجباریست'
    if (!formData.pers_uid) newErrors.pers_uid = 'این فیلد اجباریست'
    if (!formData.personnel_code) newErrors.personnel_code = 'این فیلد اجباریست'
    if (!formData.pers_chart_id) newErrors.pers_chart_id = 'این فیلد اجباریست'
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      showModal({
        type: 'error',
        main: <p>{' لطفا خطا ها را رفع کنید'}</p>,
        title: 'خطا',
        autoClose: 2,
      })
      return
    }
    const accessToken = (await getCookieByKey('access_token')) || ''
    await CreateReferrer({
      ...formData,
      pers_job_id: 1,
      pers_tel: formData.pers_uid,
      pers_full_name: formData.pers_name + formData.pers_family,
      accessToken,
    }).then(async (value) => {
      showModal({
        type: value.status === 1 ? 'success' : 'error',
        main: <p>{value.message}</p>,
        title: value.status === 1 ? 'موفق' : 'خطا',
        autoClose: 3,
      })
      if (value.status === 1) {
        await getReferrerData().then(
          (result) => result && setReferrerData(result)
        )
        close(false)
      }
    })
  }
  useEffect(() => {
    const getEducationDetails = async () => {
      const accessToken = await getCookieByKey('access_token')

      const degree = await GetEducationalDegree({ accessToken })
      const major = await GetMajor({ accessToken })
      if (degree && major) {
        setEducational({ degree, major })
      }
    }

    getEducationDetails()
  }, [])

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
            {errors.pers_chart_id != 0 && (
              <span className='text-red-500'>{errors.pers_chart_id}</span>
            )}
            <p className='text-[#7747C0]'>انتخاب سطح بازاریاب</p>
            {referrerChartData && referrerChartData.length > 0 ? (
              <div className='w-full'>
                <div className='grid grid-cols-2  gap-5 mt-4 px-5'>
                  {referrerChartData?.map((chart, index) => (
                    <label
                      key={index}
                      className='flex items-center gap-3 cursor-pointer mx-2'>
                      <input
                        type='radio'
                        name='pers_chart_id'
                        defaultChecked={chart.id === formData.pers_chart_id}
                        onChange={() => {
                          setErrors({})
                          formData.pers_chart_id = chart.id
                        }}
                        className='w-5 h-5 cursor-pointer accent-[#7747C0]'
                      />
                      <p className='flex justify-between w-full items-center gap-2'>
                        <span className='text-gray-700 text-nowrap'>
                          {chart.chtitle}
                        </span>
                        <span
                          className={`px-2  rounded-md text-nowrap ${
                            bg[index % bg.length]
                          } ${text[index % text.length]}`}>
                          {chart.chlabel}
                        </span>
                      </p>
                    </label>
                  ))}
                </div>
                <div className='w-full mt-10 sticky bottom-0 left-0 right-0 bg-white flex items-center gap-4 p-2 max-w-[40vw] mx-auto'>
                  <button
                    onClick={() =>
                      formData.pers_chart_id
                        ? setStep(2)
                        : setErrors((prv) => ({
                            ...prv,
                            pers_chart_id: 'لطفا یک گزینه را انتخاب کنید',
                          }))
                    }
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
              <button
                onClick={() => {
                  location.hash = 'referral-levels'
                  setMenu('referral-levels')
                }}
                className='fill-button h-10 rounded-md'>
                تعریف سطح بازاریاب
              </button>
            )}
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className='flex flex-col mx-2 my-2 bg-white p-4'>
            <div className='flex flex-col mt-3'>
              <p className='text-[#7747C0]'>انتخاب نوع بازاریاب</p>
              <div className='flex flex-col gap-3 mt-2'>
                {refererTypes.map((beneficiary, index) => (
                  <label
                    key={index}
                    className='flex items-center gap-3 cursor-pointer'>
                    <input
                      type='radio'
                      defaultChecked={index === 0}
                      name='beneficiary'
                      value={beneficiary}
                      onChange={() => (formData.pers_tob = index)}
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
                  name='pers_name'
                  defaultValue={data?.pers_name || ''}
                  placeholder='پرهام'
                  onChange={handleChange}
                  className={`border ${errors.pers_name && errorClass}`}
                />
                {errors.pers_name && (
                  <span className='text-red-500'>{errors.pers_name}</span>
                )}
              </div>
              <div className='flex flex-col w-full'>
                <label>نام خانوادگی</label>
                <input
                  name='pers_family'
                  defaultValue={data?.pers_family || ''}
                  onChange={handleChange}
                  placeholder='پازکی'
                  className={`border ${errors.pers_family && errorClass}`}
                />
                {errors.pers_family && (
                  <span className='text-red-500'>{errors.pers_family}</span>
                )}
              </div>
            </div>
            <div className='flex gap-4 my-3'>
              <div className='flex flex-col w-full'>
                <label>وضعیت تاهل</label>
                <select
                  name='marital_status_id'
                  className={`w-full border rounded-lg h-10 px-1 outline-none ${
                    errors.marital_status_id && errorClass
                  }`}
                  onChange={handleChange}>
                  <option value={0}>نامشخص</option>
                  <option value={1}>مجرد</option>
                  <option value={2}>متاهل </option>
                </select>
              </div>
              <div className='flex flex-col w-full'>
                <label>شماره همراه</label>
                <input
                  onChange={handleChange}
                  name='pers_uid'
                  defaultValue={data?.pers_uid || ''}
                  placeholder='متخصص پوست و مو'
                  className={`border ${errors.pers_uid && errorClass}`}
                />
                {errors.pers_uid && (
                  <span className='text-red-500'>{errors.pers_uid}</span>
                )}
              </div>
            </div>
            <div className='flex gap-4 my-3'>
              <div className='flex flex-col w-full'>
                <label>آخرین مدرک تحصیلی </label>
                <select
                  className='w-full border rounded-lg h-10 px-1 outline-none'
                  onChange={(e) => {
                    formData.last_educational_degree_id = parseInt(
                      `${e.target.value}`
                    )
                  }}>
                  {educational?.degree?.map((degree, index) => (
                    <option key={index} value={degree?.id}>
                      {degree.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className='flex flex-col w-full'>
                <label>آخرین رشته تحصیلی </label>
                <select
                  className='w-full border rounded-lg h-10 px-1 outline-none'
                  onChange={(e) => {
                    formData.last_educational_major_id = parseInt(
                      `${e.target.value}`
                    )
                  }}>
                  {educational?.major?.map((major, index) => (
                    <option key={index} value={major?.id}>
                      {major.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className='flex gap-4 my-3'>
              <div className='flex flex-col w-full'>
                <label>جنسیت </label>
                <select
                  name='sex_id'
                  className={`w-full border rounded-lg h-10 px-1 outline-none ${
                    errors.sex_id && errorClass
                  }`}
                  onChange={handleChange}>
                  <option value={1}>زن </option>
                  <option value={2}>مرد </option>
                </select>
              </div>
              <div className='flex flex-col w-full'>
                <label> کد پرسنلی</label>
                <input
                  defaultValue={data?.personnel_code}
                  name='personnel_code'
                  onChange={handleChange}
                  className={`w-full border ${
                    errors.personnel_code && errorClass
                  }`}
                />
                {errors.personnel_code && (
                  <span className='text-red-500'>{errors.personnel_code}</span>
                )}
              </div>
            </div>
            <CitySelector
              setResult={(value: string) => (formData.CityUID = value)}
            />
            <div className='my-4'>
              <label>آدرس</label>
              <input
                defaultValue={data?.pers_address}
                name='pers_address'
                onChange={(e) => (formData.pers_address = e.target.value)}
                className={`w-full border ${errors.address && errorClass}`}
              />
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
