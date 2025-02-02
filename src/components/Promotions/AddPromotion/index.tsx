import { getCookieByKey } from '@/actions/cookieToken'
import Calendar from '@/components/shared/Calendar'
import SelectList from '@/components/shared/SelectList'
import { useData } from '@/Context/Data'
import { AddPromotionImage, CreatePromotion } from '@/services/promotion'
import { DocumentCloud, Eye, EyeSlash, TickCircle, Trash } from 'iconsax-react'
import Image from 'next/image'
import { FormEvent, useRef, useState } from 'react'
import toast from 'react-hot-toast'

const AddPromotion = () => {
  const { groupData, subGroupData, productGroupData, brandsData, productData } =
    useData()

  const [uploadStatus, setUploadStatus] = useState<
    'idle' | 'uploading' | 'success' | 'error' | 'showImage'
  >('idle')
  const [progress, setProgress] = useState<number>(0)
  const [draftSrc, setDraftSrc] = useState<string>()

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
  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!refs.current.ctitle) newErrors.ctitle = 'این فیلد اجباری است'
    if (!refs.current.start_date) newErrors.start_date = 'این فیلد اجباری است'
    if (!refs.current.exp_date) newErrors.exp_date = 'این فیلد اجباری است'
    if (!refs.current.budget) newErrors.budget = 'این فیلد اجباری است'
    if (!refs.current.file_uid) newErrors.file_uid = 'این فیلد اجباری است'
    if (!refs.current.cta_link) newErrors.cta_link = 'این فیلد اجباری است'

    setErrors(newErrors)
    console.table(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      const accessToken = await getCookieByKey('access_token')
      await CreatePromotion({ accessToken, ...refs.current })
    }
  }

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    if (!['image/png', 'image/jpg', 'image/jpeg'].includes(`${file?.type}`)) {
      toast.error('پسوند فایل قابل قبول نمی باشد')
      setUploadStatus('error')
      return
    }
    if (file?.size && file?.size < 50000) {
      toast.error('حجم فایل کمتر از حد مجاز است')
      setUploadStatus('error')
      return
    }
    if (file?.size && file?.size > 2200000) {
      toast.error('حجم فایل بیشتر از حد مجاز است')
      setUploadStatus('error')
      return
    }
    if (file) {
      const formData = new FormData()
      console.log(file)
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
          }
        } catch (error) {
          setDraftSrc('')
          setUploadStatus('error')
          toast.error('خطا در بارگذاری')
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
        <div className='flex  gap-3'>
          <div className='flex w-full flex-col gap-3'>
            <p className='text-lg font-bold'>مخاطبین خود را انتخاب کنید</p>
            <div className=''>
              <label className='mb-2'> گروه خود را انتخاب کنید </label>
              <SelectList
                items={
                  groupData?.map((gp) => {
                    return {
                      id: gp.sup_group_id,
                      label: gp.sup_group_name,
                    }
                  }) || []
                }
                setSelectedItems={(value: any) =>
                  (refs.current.sgroup_id = value)
                }
                label='نام گروه'
              />
            </div>
            <div className=''>
              <label className='mb-2'> زیرگروه خود را انتخاب کنید </label>
              <SelectList
              items={
                Array.isArray(subGroupData)
                  ? subGroupData.map((gp) => ({
                      id: gp.sup_group_id,
                      label: gp.sup_group_name,
                    }))
                  : []
              }
                setSelectedItems={(value: any) =>
                  (refs.current.supervisor_id = value)
                }
                label='گروه پزشکان من خود را انتخاب کنید'
              />
            </div>
            <p className='text-lg font-bold'>محصولات خود را انتخاب کنید</p>
            <div>
              <label className='block mb-2 text-sm'>
                گروه محصول را انتخاب کنید
              </label>
              <SelectList
                items={
                  productData?.map((pgp) => {
                    return {
                      id: pgp.id,
                      label: pgp.group_desc,
                    }
                  }) || []
                }
                setSelectedItems={(value: any) =>
                  (refs.current.pgroup_id = value)
                }
                label={' گروه محصول'}
              />
              {errors.pgroup_id && (
                <p className='text-red-500 text-sm'>{errors.pgroup_id}</p>
              )}
            </div>
            <div>
              <label className='block mb-2 text-sm'>
                برند محصول را انتخاب کنید
              </label>
              <SelectList
                items={
                  productGroupData?.map((brand) => {
                    return {
                      id: brand.id,
                      label: brand.group_desc,
                    }
                  }) || []
                }
                setSelectedItems={(value: any) =>
                  (refs.current.chart_id = value)
                }
                label={' برند محصول'}
              />
              {errors.ctaLink && (
                <p className='text-red-500 text-sm'>{errors.ctaLink}</p>
              )}
            </div>
            <div>
              <label className='block mb-2 text-sm'>محصول را انتخاب کنید</label>
              <SelectList
                items={
                  productData?.map((product) => {
                    return {
                      id: product.id,
                      label: product.ini_name,
                    }
                  }) || []
                }
                setSelectedItems={(value: any) =>
                  (refs.current.product_uid = value)
                }
                label={'  محصول'}
              />
              {errors.ctaLink && (
                <p className='text-red-500 text-sm'>{errors.ctaLink}</p>
              )}
            </div>
            <div className='col-span-2'>
              <p className='text-lg font-bold'>نوع تخفیف خود را انتخاب کنید</p>
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
                <p className='text-red-500 text-sm'>{errors.discountType}</p>
              )}
              <input
                name='expected_amount'
                value={refs.current.expected_amount}
                onChange={handleInputChange}
                className=' p-2 border rounded-md'
                placeholder=' درصد تخفیف'
              />
            </div>
          </div>
          <div className='flex flex-col w-full gap-3'>
            <p className='text-lg font-bold'> اطلاعات ثبت پروموشن </p>
            <div>
              <label className='block mb-1 text-sm'>
                شعار یا جمله برند پروموشن را بنویسید
              </label>
              <input
                name='ctitle'
                value={refs.current.ctitle}
                onChange={handleInputChange}
                className='w-full p-2 border rounded-md'
                placeholder='شعار / جمله'
              />
              {errors.ctitle && (
                <p className='text-red-500 text-sm'>{errors.ctitle}</p>
              )}
            </div>
            <div className='flex gap-5'>
              <div className='w-full '>
                <label className='block mb-1 text-sm'>تاریخ شروع پروموشن</label>
                <Calendar
                  placeholder='تاریخ شروع'
                  setDate={(value: string) => (refs.current.start_date = value)}
                />
                {errors.start_date && (
                  <p className='text-red-500 text-sm'>{errors.start_date}</p>
                )}
              </div>
              <div className='w-full '>
                <label className='block mb-1 text-sm'>
                  تاریخ پایان پروموشن
                </label>
                <Calendar
                  placeholder='تاریخ پایان'
                  setDate={(value: string) => (refs.current.exp_date = value)}
                />
                {errors.exp_date && (
                  <p className='text-red-500 text-sm'>{errors.exp_date}</p>
                )}
              </div>
            </div>
            <p className='text-lg font-bold'>
              لینک CTA پروموشن خود را وارد کنید.
            </p>

            <div>
              <label className='block mb-2 text-sm'>لینک CTA پروموشن</label>
              <input
                type='url'
                name='cta_link'
                value={refs.current.cta_link}
                onChange={handleInputChange}
                className='w-full p-2 border rounded-md'
                placeholder='لینک CTA پروموشن'
              />
              {errors.cta_link && (
                <p className='text-red-500 text-sm'>{errors.cta_link}</p>
              )}
            </div>
            <div>
              <label className='block mb-2 text-sm'>بودجه</label>
              <input
                name='budget'
                defaultValue={refs.current.budget}
                onChange={handleInputChange}
                className='w-full p-2 border rounded-md'
                placeholder='بودجه کمپین را تعریف کنید'
              />
              {errors.budget && (
                <p className='text-red-500 text-sm'>{errors.budget}</p>
              )}
            </div>
            <div>
              <p className='text-lg font-bold'>عکس پروموشن</p>
              <div className='flex gap-5'>
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
                    } text-[#50545F] cursor-pointer my-2`}
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
                            <p>بارگذاری کنید</p>
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
            </div>
          </div>
        </div>
        <div className='w-full flex justify-end'>
          <button
            type='submit'
            className='mt-6 px-12 bg-[#7747C0] text-white py-2 rounded-md'>
            ثبت پروموشن
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddPromotion
