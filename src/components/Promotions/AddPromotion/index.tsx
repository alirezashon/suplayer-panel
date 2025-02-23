import { getCookieByKey } from '@/actions/cookieToken'
import { errorClass } from '@/app/assets/style'
import Calendar from '@/components/shared/Calendar'
import MultiLevelSelect from '@/components/shared/MultiLevelSelect'
import { useStates } from '@/Context/States'
import { OptionTrees } from '@/interfaces'
import { AddPromotionImage, CreatePromotion } from '@/services/promotion'
import { DocumentCloud, Eye, EyeSlash, TickCircle, Trash } from 'iconsax-react'
import Image from 'next/image'
import { FormEvent, useRef, useState } from 'react'

const AddPromotion = () => {
  const [uploadStatus, setUploadStatus] = useState<
    'idle' | 'uploading' | 'success' | 'error' | 'showImage'
  >('idle')
  const [progress, setProgress] = useState<number>(0)
  const [draftSrc, setDraftSrc] = useState<string>()
  const { showModal, productGroupSelectorData, groupSelectorData } = useStates()
  const [step, setStep] = useState<number>(2)

  const refs = useRef({
    cstatus: 1,
    cta_link: '',
    distype: 0,
    file_uid: '',
    ctitle: '',
    ctype: 0,
    start_date: '',
    exp_date: '',
    loc_type: 0,
    loc_uid: '',
    budget: '',
    expected_response: 0,
    expected_amount: 0,
    desc: '',
    sgroup_id: 0,
    supervisor_id: 0,
    pgroup_id: 0,
    chart_id: 0,
    product_uid: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({
    startDate: '',
    endDate: '',
    ctaLink: '',
    promotionImage: '',
    discountType: '',
    title: '',
    description: '',
  })

  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    refs.current = {
      ...refs.current,
      [name]: value,
    }
    setErrors({ ...errors, [name]: '' })
  }
  const validateForm = (step?: number) => {
    const newErrors: Record<string, string> = {}
    if (!step || step < 3) {
      if (!refs.current.ctitle) newErrors.ctitle = 'این فیلد اجباری است'
      if (!refs.current.start_date) newErrors.start_date = 'این فیلد اجباری است'
      if (!refs.current.exp_date) newErrors.exp_date = 'این فیلد اجباری است'
      if (!refs.current.budget) newErrors.budget = 'این فیلد اجباری است'
      if (!refs.current.file_uid) newErrors.file_uid = 'این فیلد اجباری است'
      if (!refs.current.cta_link) newErrors.cta_link = 'این فیلد اجباری است'
    }
    setErrors(newErrors)
    if (step && !Object.keys(newErrors).length) setStep(step + 1)
    else setStep(1)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      const accessToken = await getCookieByKey('access_token')
      await CreatePromotion({ accessToken, ...refs.current }).then((result) => {
        showModal({
          type: result.status === 1 ? 'success' : 'error',
          main: <p>{result.message}</p>,
          title: result.status === 1 ? 'موفق' : 'خطا',
          autoClose: 2,
        })
      })
    }
  }

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    if (!['image/png', 'image/jpg', 'image/jpeg'].includes(`${file?.type}`)) {
      showModal({
        type: 'error',
        main: <p>پسوند فایل قابل قبول نمی باشد</p>,
        title: 'خطا',
        autoClose: 2,
      })
      setUploadStatus('error')
      return
    }
    if (file?.size && file?.size < 50000) {
      showModal({
        type: 'error',
        main: <p>حجم فایل کمتر از حد مجاز است</p>,
        title: 'خطا',
        autoClose: 2,
      })
      setUploadStatus('error')
      return
    }
    if (file?.size && file?.size > 2200000) {
      showModal({
        type: 'error',
        main: <p>حجم فایل بیشتر از حد مجاز است</p>,
        title: 'خطا',
        autoClose: 2,
      })
      setUploadStatus('error')
      return
    }
    if (file) {
      const formData = new FormData()
      formData.append('file', file)

      setUploadStatus('uploading')
      const reader = new FileReader()
      reader.onloadend = async () => {
        try {
          const newAvatarUrl = reader.result as string
          setDraftSrc(newAvatarUrl)
          setUploadStatus('success')

          // Simulate upload progress
          let progressValue = 0
          const interval = setInterval(() => {
            if (progressValue >= 100) {
              clearInterval(interval)
              setProgress(100)
            } else {
              progressValue += 10
              setProgress(progressValue)
            }
          }, 200)
          const accessToken = (await getCookieByKey('access_token')) || ''
          const result = await AddPromotionImage({
            src: formData,
            accessToken,
          })
          if (result) {
            refs.current.file_uid = result.rec_id_file
          } else {
            setDraftSrc('')
            setUploadStatus('error')
            showModal({
              type: 'error',
              main: <p>خطا در بارگذاری</p>,
              title: 'خطا',
              autoClose: 2,
            })
            return
          }
        } catch (error) {
          setDraftSrc('')
          setUploadStatus('error')
          showModal({
            type: 'error',
            main: <p>خطا در بارگذاری</p>,
            title: 'خطا',
            autoClose: 2,
          })
          return error
        }
      }
      reader.readAsDataURL(file)
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
              className='w-full'
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
                  {errors.start_date && (
                    <p className='text-red-500 text-sm'>{errors.start_date}</p>
                  )}
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
                  {errors.exp_date && (
                    <p className='text-red-500 text-sm'>{errors.exp_date}</p>
                  )}
                </div>
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
                  defaultValue={refs.current.budget}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded-md ${
                    errors.budget && errorClass
                  }`}
                  placeholder='بودجه کمپین را تعریف کنید'
                />
                {errors.budget && (
                  <p className='text-red-500 text-sm'>{errors.budget}</p>
                )}
              </div>
              <div>
                <div className='flex gap-5 my-2'>
                  {draftSrc ? (
                    <div
                      className={`gap-5 w-full p-5 rounded-lg flex flex-col justify-center items-center border 
                      border-[#C9D0D8] border-dashed
                      text-[#50545F] cursor-pointer my-2`}>
                      {uploadStatus === 'showImage' && (
                        <div
                          className={`gap-5 w-full p-5 rounded-lg flex justify-center items-center cursor-pointer my-2`}>
                          <Image
                            src={draftSrc}
                            width={77}
                            height={77}
                            className='w-full max-w-96'
                            alt='Uploaded file preview'
                          />
                        </div>
                      )}
                      <div className='flex justify-between w-full items-center'>
                        <div className='flex gap-3'>
                          <TickCircle
                            size={24}
                            className='bg-[#0F973D] text-white rounded-full'
                          />
                          <p className='text-green-500 mt-2 text-sm'>
                            بارگذاری با موفقیت انجام شد
                          </p>
                        </div>

                        <div className='flex gap-3'>
                          {uploadStatus === 'success' ? (
                            <Eye
                              onClick={() => setUploadStatus('showImage')}
                              color='#2F27CE'
                              size={24}
                            />
                          ) : (
                            <EyeSlash
                              onClick={() => setUploadStatus('success')}
                              color='#2F27CE'
                              size={24}
                            />
                          )}
                          <Trash
                            size={24}
                            color='#BB1F1A'
                            onClick={() => {
                              setDraftSrc(undefined)
                              setUploadStatus('idle')
                            }}
                          />

                          {uploadStatus === 'error' && (
                            <p className='text-red-500 mt-2 text-sm'>
                              خطا در بارگذاری فایل
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <label
                      className={`gap-5 w-full p-5 rounded-lg flex justify-between items-center border ${
                        uploadStatus === 'uploading'
                          ? 'bg-gradient-to-r from-[#EFFEF3] to-[#D7FCEB]'
                          : 'border-[#C9D0D8] border-dashed'
                      } text-[#50545F] cursor-pointer my-2 ${
                        errors.ctitle && errorClass
                      }`}
                      htmlFor='avatarUpload'>
                      <DocumentCloud size={32} color='#50545F' />
                      <div className='flex w-full'>
                        {uploadStatus === 'uploading' ? (
                          <>
                            <p>در حال بارگذاری فایل...</p>
                            <progress
                              value={progress}
                              max='100'
                              className='w-full rounded-full mt-2'></progress>
                            <p className='text-[#B2BBC7] mt-2'>{progress}%</p>
                          </>
                        ) : (
                          <>
                            <div className='flex justify-between'>
                              <p>عکس مربوط به پروموشن را بارگذاری نمایید</p>
                              <p className='text-[#B2BBC7]'>
                                PNG, JPG (max. 2mb)
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                      <div className='px-4 bg-[#7747C0] text-white py-2 rounded-md'>
                        بارگذاری
                      </div>
                    </label>
                  )}
                  <input
                    id='avatarUpload'
                    type='file'
                    accept='image/*'
                    className='hidden'
                    onChange={handleImageUpload}
                  />
                </div>
                {errors.file_uid && (
                  <p className='text-red-500 text-sm'>{errors.file_uid}</p>
                )}
                <div className='flex w-full flex-col gap-3'>
                  <div className='col-span-2'>
                    <p className='text-lg font-bold'>
                      نوع تخفیف خود را انتخاب کنید
                    </p>
                    <div className='flex gap-40 my-5'>
                      <label className='flex items-center'>
                        <input
                          type='radio'
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
                        تخفیف جنسی
                      </label>
                    </div>
                    {errors.discountType && (
                      <p className='text-red-500 text-sm'>
                        {errors.discountType}
                      </p>
                    )}
                    <input
                      name='expected_amount'
                      value={refs.current.expected_amount || ''}
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
            data={groupSelectorData as OptionTrees[]}
            onSelectionChange={() => 'void'}
          />
        ) : (
          step === 3 && (
            <MultiLevelSelect
              data={productGroupSelectorData as OptionTrees[]}
              onSelectionChange={() => 'void'}
            />
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
            className='mt-6 px-12 bg-[#7747C0] text-white py-2 rounded-md'>
            {step < 3 ? 'مرحله بعد' : ' ثبت پروموشن'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddPromotion
