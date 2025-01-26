import Calendar from '@/components/shared/Calendar'
import CitySelector from '@/components/shared/CitySelector'
import SelectList from '@/components/shared/SelectList'
import { CampaignInterface } from '@/interfaces'
import { ArrowRight2, CloseSquare, Message } from 'iconsax-react'
import { FormEvent, useRef, useState } from 'react'

const AddCampaign = ({
  existData,
  close,
}: {
  existData?: CampaignInterface
  close: (show: boolean) => void
}) => {
  const [prvData] = useState<CampaignInterface | null>(existData || null)

  const [step, setStep] = useState<number>(1)
  const [showDetails, setshowDetails] = useState<boolean>(false)
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    ctaLink: '',
    campaignImage: null,
    discountType: '',
    title: '',
    description: '',
  })

  const refs = useRef({
    cstatus: 0,
    ctitle: '',
    ctype: 0,
    start_date: '',
    exp_date: '',
    loc_type: 0,
    loc_uid: '',
    budget: 0,
    expected_response: 0,
    expected_amunt: 0,
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
    campaignImage: '',
    discountType: '',
    title: '',
    description: '',
  })
  const [, setSelectedItems] = useState<Array<string | number>>([])
  const items = [
    { id: 1, label: 'گروه زنان و زایمان' },
    { id: 2, label: 'گروه پوست و مو' },
    { id: 3, label: 'گروه پزشکان عمومی' },
    { id: 4, label: 'گروه قلب و عروق' },
  ]
  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    refs.current = { ...formData, [name]: value }
    setErrors({ ...errors, [name]: '' })
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.startDate) newErrors.startDate = 'این فیلد اجباری است'
    if (!formData.endDate) newErrors.endDate = 'این فیلد اجباری است'
    if (!formData.ctaLink) newErrors.ctaLink = 'این فیلد اجباری است'
    if (!formData.campaignImage) newErrors.campaignImage = 'این فیلد اجباری است'
    if (!formData.discountType) newErrors.discountType = 'این فیلد اجباری است'
    if (!formData.title) newErrors.title = 'این فیلد اجباری است'
    if (!formData.description) newErrors.description = 'این فیلد اجباری است'

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      // Submit the form data
      console.log('Form submitted:', formData)
    }
  }

  return (
    <div>
      <div className='absolute bg-slate-600 opacity-50 w-full h-[200vh] z-50 top-0 right-0'></div>
      <div
        style={{ scrollbarWidth: 'none' }}
        className={`fixed p-5 z-50 right-0 top-0 max-md:left-[0] max-md:w-[100%] w-[40vw] h-full bg-white border border-gray-300 shadow-lg transition-transform duration-300 ease-in-out right-side-animate overflow-y-auto
          `}>
        <div
          onClick={() =>
            showDetails
              ? setshowDetails(false)
              : step > 1
              ? setStep(step - 1)
              : ''
          }
          className='flex justify-between items-center w-full text-xl font-medium text-right text-gray-800 max-md:max-w-full'>
          <div className='flex-1 flex items-center shrink self-stretch my-auto min-w-[240px] max-md:max-w-full'>
            {step !== 1 && <ArrowRight2 size={24} color='#50545F' />}
            تعریف کمپین
          </div>
          <div
            className='
                '>
            <CloseSquare
              size={24}
              cursor='pointer'
              color='#50545F'
              onClick={() => close(false)}
            />
          </div>
        </div>
        {!showDetails ? (
          <>
            <div className='w-full flex justify-around items-center mb-6 '>
              <div className='w-[65%] absolute flex'>
                <div className='border w-full border-[#7747C0]'></div>
                <div
                  className={`border w-full ${
                    step > 1 ? 'border-[#7747C0]' : 'border-[#C9D0D8]'
                  }`}></div>
              </div>
              {[
                'اطلاعات اولیه',
                '  انتخاب مخاطب کمپین',
                'انتخاب محصول کمپین ',
              ].map((section, index) => (
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
              ))}
            </div>
            <form
              onSubmit={handleSubmit}
              className='flex flex-col bg-white max-w-[594px] pb-[852px] max-md:px-5 max-md:pb-24'>
              {step === 1 ? (
                <div className='flex w-full flex-col gap-5'>
                  <div className='flex flex-col w-full'>
                    <label className='text-base font-medium text-right text-gray-800'>
                      نام
                    </label>
                    <input
                      defaultValue={prvData?.ctitle}
                      onChange={(e) => (refs.current.ctitle = e.target.value)}
                      type='text'
                      placeholder='نام کمپین خود را بنویسید'
                    />
                  </div>
                  <div className=''>
                    <label className='my-2'> نوع کمپین </label>
                    <SelectList
                      items={items}
                      setSelectedItems={setSelectedItems}
                      label='تبلیغات'
                    />
                  </div>
                  <div className='flex gap-4'>
                    <div className='w-full'>
                      <label className=' m-1 text-sm'>تاریخ شروع</label>
                      <Calendar
                        setDate={(value: string) =>
                          (refs.current.start_date = value)
                        }
                      />
                      {errors.startDate && (
                        <p className='text-red-500 text-sm'>
                          {errors.startDate}
                        </p>
                      )}
                    </div>

                    <div className='w-full'>
                      <label className=' m-1 text-sm'>تاریخ پایان</label>
                      <Calendar
                        setDate={(value: string) =>
                          (refs.current.exp_date = value)
                        }
                      />
                      {errors.endDate && (
                        <p className='text-red-500 text-sm'>{errors.endDate}</p>
                      )}
                    </div>
                  </div>
                  <div className='flex gap-4'>
                    <div className='w-full'>
                      <label className='my-2'> کشور </label>
                      <SelectList
                        items={items}
                        setSelectedItems={setSelectedItems}
                        label='کشور'
                      />
                    </div>
                  </div>

                  <CitySelector
                    setResult={(value: string) =>
                      (refs.current.loc_uid = value)
                    }
                  />

                  <div>
                    <label className='block mb-2 text-sm'>بودجه</label>
                    <input
                      type='url'
                      name='ctaLink'
                      defaultValue={existData?.budget}
                      onChange={handleInputChange}
                      className='w-full p-2 border rounded-md'
                      placeholder='بودجه کمپین را تعریف کنید'
                    />
                    {errors.ctaLink && (
                      <p className='text-red-500 text-sm'>{errors.ctaLink}</p>
                    )}
                  </div>
                  <div className='flex gap-4'>
                    <div className='w-full'>
                      <label className='block mb-2 text-sm'>
                        پاسخ مورد انتظار
                      </label>
                      <input
                        type='url'
                        name='ctaLink'
                        defaultValue={formData.ctaLink}
                        onChange={handleInputChange}
                        className='w-full p-2 border rounded-md'
                        placeholder='   % '
                      />
                      {errors.ctaLink && (
                        <p className='text-red-500 text-sm'>{errors.ctaLink}</p>
                      )}
                    </div>
                    <div className='w-full'>
                      <label className='block mb-2 text-sm'>
                        درآمد مورد انتظار
                      </label>
                      <input
                        type='url'
                        name='ctaLink'
                        defaultValue={formData.ctaLink}
                        onChange={handleInputChange}
                        className='w-full p-2 border rounded-md'
                        placeholder='ریال'
                      />
                      {errors.ctaLink && (
                        <p className='text-red-500 text-sm'>{errors.ctaLink}</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className='block mb-2 text-sm'>شرح</label>
                    <textarea
                      defaultValue={formData.ctaLink}
                      className='w-full p-2 border rounded-md outline-none resize-none'
                      placeholder='شرح کمپین را بنویسید'
                    />
                    {errors.ctaLink && (
                      <p className='text-red-500 text-sm'>{errors.ctaLink}</p>
                    )}
                  </div>
                </div>
              ) : step === 2 ? (
                <div className='flex w-full flex-col gap-5'>
                  <div className='bg-[#E2F1FC] flex gap-3 p-2 rounded-lg'>
                    <Message size={24} color='#1D91CC' />
                    <p>
                      شما می‌توانید گروه مخاطب مد نظر خود را در این کمپین انتخاب
                      کنید
                    </p>
                  </div>
                  <div className=''>
                    <label className='my-2'> گروه خود را انتخاب کنید </label>
                    <SelectList
                      items={items}
                      setSelectedItems={setSelectedItems}
                      label='نام گروه'
                    />
                  </div>
                  <div className=''>
                    <label className='my-2'> زیرگروه خود را انتخاب کنید </label>
                    <SelectList
                      items={items}
                      setSelectedItems={setSelectedItems}
                      label='نام زیرگروه'
                    />
                  </div>
                </div>
              ) : (
                <div className='flex w-full flex-col gap-5'>
                  <div className='bg-[#E2F1FC] flex gap-3 p-2 rounded-lg'>
                    <Message size={24} color='#1D91CC' />
                    <p>
                      شما می‌توانید گروه محصول مد نظر خود را در این کمپین انتخاب
                      کنید
                    </p>
                  </div>
                  <div className=''>
                    <label className='my-2'> گروه محصول را انتخاب کنید </label>
                    <SelectList
                      items={items}
                      setSelectedItems={setSelectedItems}
                      label='گروه محصول'
                    />
                  </div>
                  <div className=''>
                    <label className='my-2'> برند محصول را انتخاب کنید</label>
                    <SelectList
                      items={items}
                      setSelectedItems={setSelectedItems}
                      label='برندها'
                    />
                  </div>
                  <div className=''>
                    <label className='my-2'> محصول را انتخاب کنید</label>
                    <SelectList
                      items={items}
                      setSelectedItems={setSelectedItems}
                      label='محصول'
                    />
                  </div>
                </div>
              )}
              <div className='mt-10 w-full max-md:max-w-full'>
                <button
                  type='submit'
                  onClick={() =>
                    step !== 3 ? setStep(step + 1) : setshowDetails(true)
                  }
                  className={`fill-button px-10 h-10 rounded-lg w-full`}>
                  {step < 2 ? 'ادامه' : 'ثبت'}
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className=''>
            <div className='grid grid-cols-2 gap-6 mt-5'>
              <div className='flex flex-col'>
                <p className='text-[#5F6474]'>نام</p>
                <p className='text-[#8455D2]'>کمپین پیامک محصول</p>
              </div>
              <div className='flex flex-col'>
                <p className='text-[#5F6474]'>نوع</p>
                <p className='text-[#8455D2]'>پیامک انبوه</p>
              </div>
              <div className='flex flex-col'>
                <p className='text-[#5F6474]'>تاریخ شروع</p>
                <p className='text-[#8455D2]'>۱۴۰۳/۱۰/۱۰</p>
              </div>
              <div className='flex flex-col'>
                <p className='text-[#5F6474]'>تاریخ پایان</p>
                <p className='text-[#8455D2]'>۱۴۰۳/۱۰/۲۳</p>
              </div>
              <div className='flex flex-col'>
                <p className='text-[#5F6474]'>کشور</p>
                <p className='text-[#8455D2]'>ایران</p>
              </div>
              <div className='flex flex-col'>
                <p className='text-[#5F6474]'>استان</p>
                <p className='text-[#8455D2]'>تهران</p>
              </div>
              <div className='flex flex-col'>
                <p className='text-[#5F6474]'>شهرستان</p>
                <p className='text-[#8455D2]'>تهران</p>
              </div>
              <div className='flex flex-col'>
                <p className='text-[#5F6474]'>شهر</p>
                <p className='text-[#8455D2]'>شمیرانات</p>
              </div>
              <div className='flex flex-col'>
                <p className='text-[#5F6474]'>بودجه</p>
                <p className='text-[#8455D2]'>۲۰۰.۰۰۰.۰۰۰.۰۰۰ ریال</p>
              </div>
              <div className='flex flex-col'>
                <p className='text-[#5F6474]'>پاسخ مورد انتظار</p>
                <p className='text-[#8455D2]'>۲۰۰.۰۰۰.۰۰۰.۰۰۰ ریال</p>
              </div>
              <div className='flex flex-col col-span-2'>
                <p className='text-[#5F6474]'>شرح</p>
                <p className='text-[#8455D2]'>
                  این کمپین برای بهبود رفتاری ذی‌نفعان طراحی شده است
                </p>
              </div>
            </div>
            <div className='flex flex-col mt-5'>
              <p className='text-[#5F6474]'>وضعیت کمپین</p>
              <div className='flex gap-3'>
                <p className='text-[#713B16] bg-[#FFCA5E] px-5 py-1 rounded-full w-fit'>
                  شروع نشده
                </p>
                <p className='text-[#7747C0] bg-[#E1DCF8] px-5 py-1 rounded-full w-fit'>
                  در حال انجام
                </p>
                <p className='text-[#3B5A4F] bg-[#A1E3CB] px-5 py-1 rounded-full w-fit'>
                  تمام شده
                </p>
              </div>
            </div>
            <div className='flex flex-col mt-5'>
              <p className='text-[#5F6474]'>گروه‌ و زیرگروه‌های انتخاب شده </p>
              <div className='flex gap-3'>
                <p className='text-[#CA7E15] bg-[#FAF3CB] px-5 py-1 rounded-full w-fit'>
                  گروه شامپو
                </p>
                <p className='text-[#7747C0] bg-[#EAEAEA] px-5 py-1 rounded-full w-fit'>
                  زیرگروه فولیکا
                </p>
                <p className='text-[#2F3237] bg-[#EAEAEA] px-5 py-1 rounded-full w-fit'>
                  زیرگروه اوه
                </p>
              </div>
            </div>
            <div className='flex flex-col mt-5'>
              <p className='text-[#5F6474]'>گروه و برند محصول عضو شده </p>
              <div className='flex gap-3'>
                <p className='text-[#7747C0] bg-[#EAEAEA] px-5 py-1 rounded-full w-fit'>
                  گروه مو
                </p>
                <p className='text-[#0F973D] bg-[#DAFEE5] px-5 py-1 rounded-full w-fit'>
                  فولیکا
                </p>
                <p className='text-[#0F973D] bg-[#DAFEE5] px-5 py-1 rounded-full w-fit'>
                  فولیکا
                </p>
                <p className='text-[#0F973D] bg-[#DAFEE5] px-5 py-1 rounded-full w-fit'>
                  فولیکا
                </p>
                <p className='text-[#0F973D] bg-[#DAFEE5] px-5 py-1 rounded-full w-fit'>
                  فولیکا
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AddCampaign
