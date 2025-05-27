import { getCookieByKey } from '@/actions/cookieToken'
import { errorClass } from '@/app/assets/style'
import Calendar from '@/components/shared/Calendar'
import MultiLevelSelect from '@/components/shared/MultiLevelSelect'
import { useStates } from '@/Context/States'
import { OptionTrees } from '@/interfaces'
import { CreatePromotion } from '@/services/promotion'
import Image from 'next/image'
import { locationTree } from '../../../hooks/Locations'
import { FormEvent, useRef, useState } from 'react'
import ImageUploader from '../lib/ImageUploader'
import { setComma } from '@/hooks/NumberFormat'
import TimePicker from '@/components/shared/TimePicker'

const AddPromotion = () => {
  const [draftSrc, setDraftSrc] = useState<string | null>(null)
  const {
    showModal,
    productGroupSelectorData,
    groupSelectorData,
    submitting,
    setSubmitting,
  } = useStates()
  const [step, setStep] = useState<number>(1)

  const refs = useRef({
    cstatus: 1,
    ctitle: '',
    start_date: '1380-03-07',
    exp_date: '2380-03-07',
    cta_link: '',
    distype: 0,
    file_uid: '',
    desc: '',
    budget: '',
    pdetails: [
      {
        pgroup_id: 0,
        chart_id: 0,
        product_uid: '',
      },
    ],
    sdetails: [
      {
        sgroup_id: 0,
        supervisor_id: 0,
      },
    ],
    ldetails: [
      {
        CityUID: '',
        CityCode: '',
        CountyCode: '',
        StateCode: '',
      },
    ],
  })

  const [errors, setErrors] = useState<Record<string, string>>({
    ctaLink: '',
    file_uid: '',
    discountType: '',
    title: '',
    budget: '',
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name } = e.target
    let { value } = e.target
    if (['budget'].includes(name)) value = value.replace(/,/g, '')
    refs.current = {
      ...refs.current,
      [name]: value,
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }))
  }
  const validateForm = (step?: number) => {
    const newErrors: Record<string, string> = {}
    if (!step || step < 3) {
      if (!refs.current.ctitle) newErrors.ctitle = 'این فیلد اجباری است'
      if (!refs.current.file_uid) newErrors.file_uid = 'این فیلد اجباری است'
      if (!refs.current.cta_link) newErrors.cta_link = 'این فیلد اجباری است'
      if (!refs.current.budget) newErrors.budget = 'این فیلد اجباری است'
    }
    setErrors(newErrors)
    if (step && !Object.keys(newErrors).length) setStep(step + 1)
    else setStep(1)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (validateForm() && step === 3) {
      setSubmitting(true)
      const accessToken = (await getCookieByKey('access_token')) || ''
      await CreatePromotion({ accessToken, ...refs.current }).then((result) => {
        showModal({
          type: result && result.status === 1 ? 'success' : 'error',
          main: <p>{result && result.message}</p>,
          title: result && result.status === 1 ? 'موفق' : 'خطا',
          autoClose: 2,
        })
      })
      setSubmitting(false)
    }
  }

  return (
    <div className='flex flex-col items-center bg-gray-100 p-8'>
      <div
        className='w-full h-[169px] rounded-md flex items-center justify-between p-6 px-20'
        style={{
          background: `
          conic-gradient(
            from 99.3deg at 0% 1%, 
            rgba(112, 76, 185, 0.9) 0deg, 
            rgba(56, 10, 148, 0.8) 360deg
            ), conic-gradient(
              from -45deg at 50% 50%, 
            rgba(112, 76, 185, 0.1) 0deg, 
            rgba(56, 10, 148, 0.1) 360deg
          )`,
        }}>
        <div className='flex flex-col items-end text-right text-white'>
          <h2 className='text-lg font-bold'>شعار | جمله برند شما</h2>
          <p>تخفیف شما</p>
          <button className='mt-2 px-4 py-2 bg-white text-purple-800 rounded-md'>
            لینک خرید
          </button>
        </div>
        <div className='flex flex-col items-start text-white'>
          <h1 className='text-2xl font-bold'>تاریخ و زمان پروموشن</h1>
          <p className='text-sm'>ثانیه | دقیقه | ساعت | روز</p>
        </div>
        <div
          className={`w-[20%] h-full ${
            draftSrc ? 'mt-2' : 'mt-16'
          } p-2  overflow-hidden`}>
          {draftSrc ? (
            <Image
              src={draftSrc}
              width={777}
              height={777}
              className='w-full object-contain'
              alt='Uploaded file preview'
            />
          ) : (
            <div
              className='w-full h-full'
              style={{
                backgroundSize: '10px 10px',
                backgroundImage: `
            linear-gradient(45deg, gray 25%, transparent 25%, 
                            transparent 75%, gray 75%, gray),
            linear-gradient(45deg, gray 25%, transparent 25%, 
                            transparent 75%, gray 75%, gray),
            linear-gradient(45deg, #fff 25%, transparent 25%, 
                            transparent 75%, #fff 75%, #fff),
            linear-gradient(45deg, #fff 25%, transparent 25%, 
                            transparent 75%, #fff 75%, #fff)
          `,
                backgroundPosition: '0 0, 25px 25px, 25px 0, 0 25px',
              }}></div>
          )}
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className='mt-8 w-full bg-white p-6 rounded-md shadow-md'>
        <h2 className='text-center text-xl font-bold mb-6 text-[#704CB9]'>
          پروموشن خود را بسازید
        </h2>
        <div className='w-full flex justify-around items-center mb-6 '>
          <div className='w-[50%] absolute flex'>
            <div className='border w-full border-[#7747C0]'></div>
            <div
              className={`border w-full ${
                step > 1 ? 'border-[#7747C0]' : 'border-[#C9D0D8]'
              }`}></div>
          </div>
          {['اطلاعات پروموشن', 'گروه هدف', 'محصول'].map((section, index) => (
            <div className='flex flex-col items-center' key={index}>
              <div
                onClick={() => validateForm(index)}
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

        {step === 1 ? (
          <div className='flex justify-center'>
            <div className='flex flex-col w-[67%]  gap-3'>
              <div>
                <label className='block mb-1 text-sm font-bold'>
                  شعار یا جمله برند پروموشن را بنویسید
                </label>
                <input
                  name='ctitle'
                  value={refs.current.ctitle}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded-md  ${
                    errors.ctitle && errorClass
                  }`}
                  placeholder='شعار / جمله'
                />
                {errors.ctitle && (
                  <p className='text-red-500 text-sm'>{errors.ctitle}</p>
                )}
              </div>
              <div className='flex gap-5'>
                <div className='w-full '>
                  <label className='block mb-1 text-sm font-bold'>
                    تاریخ شروع پروموشن
                  </label>
                  <Calendar
                    placeholder='تاریخ شروع'
                    hasError={errors.start_date ? true : false}
                    setDate={(value: string) =>
                      (refs.current.start_date = value)
                    }
                  />
                </div>
                <div className='w-full '>
                  <label className='block mb-1 text-sm font-bold'>
                    تاریخ پایان پروموشن
                  </label>
                  <Calendar
                    placeholder='تاریخ پایان'
                    hasError={errors.exp_date ? true : false}
                    setDate={(value: string) => (refs.current.exp_date = value)}
                  />
                </div>
              </div>
              <div className='flex gap-2 items-center mt-4'>
                <input type='checkbox' className='accent-[#7747C0] w-4 h-4' />
                <p>میخواهم زمان داشته باشد</p>
              </div>
              <div className='flex gap-3'>
                <Calendar
                  placeholder='تاریخ شروع'
                  hasError={errors.exp_date ? true : false}
                  setDate={(value: string) => (refs.current.exp_date = value)}
                />
                <TimePicker
                  placeholder='ساعت شروع'
                  hasError={errors.exp_date ? true : false}
                  setData={(value: string) => (refs.current.exp_date = value)}
                />
                <Calendar
                  placeholder='تاریخ پایان'
                  hasError={errors.exp_date ? true : false}
                  setDate={(value: string) => (refs.current.exp_date = value)}
                />
                <TimePicker
                  placeholder='ساعت پایان'
                  hasError={errors.exp_date ? true : false}
                  setData={(value: string) => (refs.current.exp_date = value)}
                />
              </div>
              <div>
                <label className='block mb-2 text-sm font-bold'>
                  لینک CTA پروموشن خود را وارد کنید.
                </label>
                <input
                  type='url'
                  name='cta_link'
                  value={refs.current.cta_link}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded-md ${
                    errors.cta_link && errorClass
                  }`}
                  placeholder='لینک CTA پروموشن'
                />
                {errors.cta_link && (
                  <p className='text-red-500 text-sm'>{errors.cta_link}</p>
                )}
              </div>
              <div>
                <label className='block mb-2 text-sm font-bold'>بودجه</label>
                <input
                  name='budget'
                  defaultValue={setComma(refs.current.budget)}
                  onChange={(e) =>
                    e.target.value.replace(/,/g, '') && handleInputChange(e)
                  }
                  onInput={(e) => {
                    e.currentTarget.value = setComma(
                      e.currentTarget.value.replace(/,/g, '')
                    )
                  }}
                  className={`w-full p-2 border rounded-md ${
                    errors.budget && errorClass
                  }`}
                  placeholder='بودجه کمپین را تعریف کنید'
                />
                {errors.budget && (
                  <p className='text-red-500 text-sm'>{errors.budget}</p>
                )}
              </div>
              <ImageUploader
                draftSrc={draftSrc}
                setDraftSrc={setDraftSrc}
                hasError={errors?.file_uid?.length > 0 ? true : false}
              />
              <div>
                <div className='flex w-full flex-col gap-3'>
                  <div className='col-span-2'>
                    <p className='text-lg font-bold'>
                      نوع تخفیف خود را انتخاب کنید
                    </p>
                    <div className='flex gap-40 my-5'>
                      <label className='flex items-center'>
                        <input
                          type='radio'
                          defaultChecked={true}
                          name='discountType'
                          value='cash'
                          onChange={handleInputChange}
                          className='w-5 h-5 cursor-pointer accent-[#7747C0]'
                        />
                        تخفیف نقدی
                      </label>
                      <label className='flex items-center'>
                        <input
                          type='radio'
                          name='discountType'
                          value='product'
                          onChange={handleInputChange}
                          className='w-5 h-5 cursor-pointer accent-[#7747C0]'
                        />
                        تخفیف غیر نقدی
                      </label>
                    </div>
                    <input
                      name='expected_amount'
                      // value={refs.current.budget || ''}
                      onChange={handleInputChange}
                      className=' p-2 border rounded-md'
                      placeholder=' درصد تخفیف'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : step === 2 ? (
          <MultiLevelSelect
            data={locationTree as OptionTrees[]}
            onSelectionChange={(result) => {
              const states = result.level1.map((state) => ({
                CityUID: '',
                CityCode: '',
                CountyCode: '',
                StateCode: state,
              }))
              const counties = result.level2.map((county) => ({
                CityUID: '',
                CityCode: '',
                CountyCode: county,
                StateCode: '',
              }))
              const cities = result.level3.map((city) => ({
                CityUID: '',
                CityCode: city,
                CountyCode: '',
                StateCode: '',
              }))
              refs.current.ldetails = [...states, ...counties, ...cities]
            }}
            title='مناطق جغرافیایی خود را انتخاب کنید'
          />
        ) : (
          step === 3 && (
            <>
              <MultiLevelSelect
                data={groupSelectorData as OptionTrees[]}
                onSelectionChange={(result) => {
                  const groups = result.level2.map((group) => ({
                    sgroup_id: parseInt(`${group}`),
                    supervisor_id: 0,
                  }))
                  const subGroups = result.level3.map((subGroup) => ({
                    sgroup_id: 0,
                    supervisor_id: parseInt(`${subGroup}`),
                  }))
                  refs.current.sdetails = [...groups, ...subGroups]
                }}
                title='گروه خود را انتخاب کنید'
              />
              <MultiLevelSelect
                data={productGroupSelectorData as OptionTrees[]}
                onSelectionChange={(result) => {
                  const groups = result.level2.map((group) => ({
                    sgroup_id: parseInt(`${group}`),
                    supervisor_id: 0,
                  }))
                  const subGroups = result.level3.map((subGroup) => ({
                    sgroup_id: 0,
                    supervisor_id: parseInt(`${subGroup}`),
                  }))
                  refs.current.sdetails = [...groups, ...subGroups]
                }}
                title='گروه خود را انتخاب کنید'
              />
            </>
          )
        )}
        <div className='w-full flex justify-end gap-3'>
          {step > 1 && (
            <button
              type='button'
              onClick={() => setStep(step - 1)}
              className='mt-6 px-12 bg-[#7747C0] text-white py-2 rounded-md'>
              مرحله قبل
            </button>
          )}
          <button
            type={step < 3 ? 'button' : 'submit'}
            onClick={() => step < 3 && validateForm(step)}
            disabled={submitting}
            className={`mt-6 px-12 bg-[#7747C0] text-white py-2 rounded-md ${
              submitting && 'opacity-30 cursor-not-allowed'
            } `}>
            {step < 3 ? 'مرحله بعد' : ' ثبت پروموشن'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddPromotion
