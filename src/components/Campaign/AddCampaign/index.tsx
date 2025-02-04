import { getCookieByKey } from '@/actions/cookieToken'
import Calendar from '@/components/shared/Calendar'
import CitySelector from '@/components/shared/CitySelector'
import SelectList from '@/components/shared/SelectList'
import { useData } from '@/Context/Data'
import { CampaignInterface } from '@/interfaces'
import { CreateCampaign } from '@/services/campaign'
import { ArrowRight2, CloseSquare, Message } from 'iconsax-react'
import { FormEvent, useRef, useState } from 'react'

const AddCampaign = ({
  existData,
  close,
}: {
  existData?: CampaignInterface
  close: (show: boolean) => void
}) => {
  const [step, setStep] = useState<number>(1)
  const [showDetails, setshowDetails] = useState<boolean>(false)
  const { groupData, subGroupData, productGroupData, brandsData, productData } =
    useData()
  const refs = useRef({
    cstatus: existData?.cstatus || 0,
    ctitle: existData?.ctitle || '',
    ctype: existData?.ctype || 0,
    start_date: existData?.start_date || '',
    exp_date: existData?.exp_date || '',
    loc_type: existData?.loc_type || 0,
    loc_uid: existData?.loc_uid || '',
    budget: existData?.budget || 0,
    expected_response: existData?.expected_response || 0,
    expected_amount: existData?.expected_amunt || 0,
    desc: existData?.desc || '',
    sgroup_id: existData?.sgroup_id || 0,
    supervisor_id: existData?.supervisor_id || 0,
    pgroup_id: existData?.pgroup_id || 0,
    chart_id: existData?.chart_id || 0,
    product_uid: existData?.product_uid || '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({
    ctitle: '',
    start_date: '',
    exp_date: '',
    budget: '',
    expected_amount: '',
    loc_uid: '',
  })
  const [, setSelectedItems] = useState<Array<string | number>>([])

  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    refs.current = {
      ...refs.current,
      [name]: value,
    }
    setErrors({ ...errors, [name]: '' })
  }

  const validateForm = (step: number) => {
    const newErrors: Record<string, string> = {}
    if (step === 1) {
      if (!refs.current.ctitle) newErrors.ctitle = 'این فیلد اجباری است'
      if (!refs.current.start_date) newErrors.start_date = 'این فیلد اجباری است'
      if (!refs.current.exp_date) newErrors.exp_date = 'این فیلد اجباری است'
      if (!refs.current.budget) newErrors.budget = 'این فیلد اجباری است'
      if (!refs.current.expected_amount)
        newErrors.expected_amount = 'این فیلد اجباری است'
      if (!refs.current.loc_uid) newErrors.loc_uid = 'این فیلد اجباری است'
    }

    setErrors(newErrors)
    console.log(newErrors)
    Object.keys(newErrors).length === 0 && setStep(step + 1)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const accessToken = await getCookieByKey('access_token')
    await CreateCampaign({ ...refs.current, accessToken }).then(
      (result) => result && setshowDetails(true)
    )
  }

  return (
    <div>
      <div className='absolute bg-slate-600 opacity-50 w-full h-[200vh] z-50 top-0 right-0'></div>
      <div
        style={{ scrollbarWidth: 'none' }}
        className={`fixed p-5 z-50 right-0 top-0 max-md:left-[0] max-md:w-[100%] w-[40vw] h-full bg-white border border-gray-300 shadow-lg transition-transform duration-300 ease-in-out right-side-animate overflow-y-auto
          `}>
        <div className='flex justify-between items-center w-full text-xl font-medium text-right text-gray-800 max-md:max-w-full'>
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
                      defaultValue={refs.current.ctitle || existData?.ctitle}
                      onChange={(e) => (refs.current.ctitle = e.target.value)}
                      type='text'
                      placeholder='نام کمپین خود را بنویسید'
                    />
                    {errors.ctitle && (
                      <p className='text-red-500 text-sm'>{errors.ctitle}</p>
                    )}
                  </div>
                  <div className='flex gap-4'>
                    <div className='w-full'>
                      <label className=' m-1 text-sm'>تاریخ شروع</label>
                      <Calendar
                        placeholder={refs.current.start_date || 'تاریخ شروع'}
                        setDate={(value: string) =>
                          (refs.current.start_date = value)
                        }
                      />
                      {errors.start_date && (
                        <p className='text-red-500 text-sm'>
                          {errors.start_date}
                        </p>
                      )}
                    </div>
                    <div className='w-full'>
                      <label className=' m-1 text-sm'>تاریخ پایان</label>
                      <Calendar
                        placeholder={refs.current.exp_date || 'تاریخ پایان'}
                        setDate={(value: string) =>
                          (refs.current.exp_date = value)
                        }
                      />
                      {errors.exp_date && (
                        <p className='text-red-500 text-sm'>
                          {errors.exp_date}
                        </p>
                      )}
                    </div>
                  </div>
                  <CitySelector
                    setResult={(value: string) =>
                      (refs.current.loc_uid = value)
                    }
                  />
                  {errors.loc_uid && (
                    <p className='text-red-500 text-sm'>{errors.loc_uid}</p>
                  )}
                  <div>
                    <label className='block mb-2 text-sm'>بودجه</label>
                    <input
                      name='budget'
                      defaultValue={refs.current.budget || existData?.budget}
                      onChange={handleInputChange}
                      className='w-full p-2 border rounded-md'
                      placeholder='بودجه کمپین را تعریف کنید'
                    />
                    {errors.budget && (
                      <p className='text-red-500 text-sm'>{errors.budget}</p>
                    )}
                  </div>
                  <div className='flex gap-4'>
                    <div className='w-full'>
                      <label className='block mb-2 text-sm'>
                        پاسخ مورد انتظار
                      </label>
                      <input
                        name='expected_response'
                        defaultValue={refs.current.expected_response}
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
                        name='expected_amount'
                        defaultValue={refs.current.expected_amount}
                        onChange={handleInputChange}
                        className='w-full p-2 border rounded-md'
                        placeholder='ریال'
                      />
                      {errors.expected_amount && (
                        <p className='text-red-500 text-sm'>
                          {errors.expected_amount}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className='block mb-2 text-sm'>شرح</label>
                    <textarea
                      rows={4}
                      defaultValue={refs.current.desc}
                      onChange={(e) => (refs.current.desc = e.target.value)}
                      className='w-full p-2 border rounded-md outline-none resize-none'
                      placeholder='شرح کمپین را بنویسید'
                    />
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
                      items={
                        groupData?.map((gp) => {
                          return {
                            id: gp.sup_group_id,
                            label: gp.sup_group_name,
                          }
                        }) || []
                      }
                      setSelectedItems={setSelectedItems}
                      label='نام گروه'
                    />
                  </div>
                  <div className=''>
                    <label className='my-2'> زیرگروه خود را انتخاب کنید </label>
                    <SelectList
                      items={
                        subGroupData?.map((sub) => {
                          return {
                            id: sub.supervisor_id,
                            label: sub.supervisor_name,
                          }
                        }) || []
                      }
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
                      items={
                        productGroupData?.map((pgp) => {
                          return {
                            id: pgp.id,
                            label: pgp.group_desc,
                          }
                        }) || []
                      }
                      setSelectedItems={setSelectedItems}
                      label='گروه محصول'
                    />
                  </div>
                  <div className=''>
                    <label className='my-2'> برند محصول را انتخاب کنید</label>
                    <SelectList
                      items={
                        brandsData?.map((brands) => {
                          return {
                            id: brands.id,
                            label: brands.group_desc,
                          }
                        }) || []
                      }
                      setSelectedItems={setSelectedItems}
                      label='برندها'
                    />
                  </div>
                  <div className=''>
                    <label className='my-2'> محصول را انتخاب کنید</label>
                    <SelectList
                      items={
                        productData?.map((gp) => {
                          return {
                            id: gp.id,
                            label: gp.ini_name,
                          }
                        }) || []
                      }
                      setSelectedItems={setSelectedItems}
                      label='محصول'
                    />
                  </div>
                </div>
              )}
              <div className='mt-10 w-full max-md:max-w-full'>
                <button
                  onClick={() => (step < 3 ? validateForm(step) : handleSubmit)}
                  className={`fill-button px-10 h-10 rounded-lg w-full`}>
                  {step < 3 ? 'ادامه' : 'ثبت'}
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
