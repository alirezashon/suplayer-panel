import { useRef, useState } from 'react'
import { WalletInfo } from './WalletBalance'
import { BeneficiaryProps } from '@/interfaces'
import { InfoCircle, Star, Star1 } from 'iconsax-react'
import Loading from '../shared/LoadingSpinner'
import Image from 'next/image'
import { bankImages } from '../shared/MatchingBankLogo'
import WithdrawSheba from './Sheba'

export const WithdrawalForm: React.FC = () => {
  const [tab, setTab] = useState<number>(1)
  const [showShabaSuggestion, setShowShabaSuggestion] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [showIbanPage, setShowIbanPage] = useState<boolean>(false)
  const [selectedSheba, setSelectedSheba] = useState<{
    name: string
    bank: string
  }>()
  const formRef = useRef<HTMLFormElement>(null)
  const [errors, setErrors] = useState<Record<string, boolean>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(formRef.current!)
    const formValues: Record<string, string> = {}
    const newErrors: Record<string, boolean> = {}

    formData.forEach((value, key) => {
      formValues[key] = value.toString()
      if (!value) {
        newErrors[key] = true // Mark field as required
      }
    })

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      console.log('Form Submitted:', formValues)
    }
  }

  const beneficiaries: BeneficiaryProps[] = [
    { name: 'سعدی اسدی', iban: 'IR۳۵۰۱۹۰۰۰۰۰۰۰۰۰۰۰۲۳۴۵۹۲۳۱' },
    { name: 'محمد باقری', iban: 'IR۳۵۰۱۹۰۰۰۰۰۰۰۰۰۰۰۲۳۴۵۹۲۳۱' },
    { name: 'محسن تنابنده', iban: 'IR۳۵۰۱۹۰۰۰۰۰۰۰۰۰۰۰۲۳۴۵۹۲۳۱' },
  ]

  return (
    <>
      {!showIbanPage ? (
        <div className='flex px-3 gap-3'>
          <form
            ref={formRef}
            className='flex flex-col gap-6 p-6 bg-white rounded-lg border border-gray-300 w-full'
            onSubmit={handleSubmit}>
            <div className='flex items-start self-center w-full text-base text-center max-md:max-w-full'>
              <button
                type='button'
                onClick={() => setTab(0)}
                tabIndex={0}
                className={`flex-1 self-stretch p-2.5 rounded-r-lg ${
                  tab === 0
                    ? 'bg-purple-800 text-white'
                    : 'bg-gray-200 text-zinc-400'
                }`}>
                شبا آزاد
              </button>
              <button
                type='button'
                onClick={() => setTab(1)}
                tabIndex={1}
                className={`flex-1 self-stretch p-2.5 rounded-l-lg ${
                  tab === 1
                    ? 'bg-purple-800 text-white'
                    : 'bg-gray-200 text-zinc-400'
                }`}>
                شبا ذی‌نفع
              </button>
            </div>
            <div className='flex flex-col'>
              <label htmlFor='amount' className='text-gray-700'>
                مبلغ به ریال
              </label>
              <input
                id='amount'
                name='amount'
                type='text'
                placeholder='مقدار واریزی به ریال'
                className={`mt-2 p-3 rounded-lg border ${
                  errors.amount ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.amount && (
                <span className='text-red-500 text-sm mt-1'>
                  این فیلد الزامی است
                </span>
              )}
            </div>
            {tab === 0 ? (
              <div className='w-full'>
                <div id='sheba-input'>
                  <label htmlFor='username' className='block mb-3'>
                    شماره شبا
                  </label>
                  <div className='relative w-full flex items-center'>
                    <input
                      style={{ direction: 'ltr' }}
                      id='shaba_number'
                      maxLength={24}
                      className={`${'border-[#F97570]'} w-full !rounded-lg px-2`}
                      autoComplete='off'
                      placeholder='1234-1123-4135-1312-1235-1456'
                      onClick={() => setShowShabaSuggestion(true)}
                    />
                    <div
                      className='absolute right-2 cursor-pointer'
                      onClick={() => setShowIbanPage(true)}>
                      <Star1 color='#FFCD3C' variant='Bold' size={24} />
                    </div>
                  </div>
                  {loading && (
                    <div className='flex justify-center items-center'>
                      {<Loading />}
                    </div>
                  )}
                  {selectedSheba && (
                    <div className='w-full flex justify-between px-2 text-primary'>
                      <p>{selectedSheba?.name}</p>
                      {bankImages[selectedSheba?.bank] && (
                        <Image
                          src={bankImages[selectedSheba?.bank] || ''}
                          width={30}
                          height={30}
                          alt={'بانک'}
                          className='inline-block rounded-full'
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className='flex flex-col'>
                <p className='text-gray-700'>انتخاب ذی‌نفع</p>
                <div className='flex flex-col gap-3 mt-2'>
                  {beneficiaries.map((beneficiary, index) => (
                    <label
                      key={index}
                      className='flex items-center gap-3 cursor-pointer'>
                      <input
                        type='radio'
                        name='beneficiary'
                        value={beneficiary.iban}
                        className={`w-5 h-5 cursor-pointer accent-purple-700 ${
                          errors.beneficiary ? 'border-red-500' : ''
                        }`}
                      />
                      <span className='text-gray-700'>{beneficiary.name}</span>
                    </label>
                  ))}
                </div>
                {errors.beneficiary && (
                  <span className='text-red-500 text-sm mt-1'>
                    این فیلد الزامی است
                  </span>
                )}
              </div>
            )}
            <div className='flex flex-col'>
              <label htmlFor='description' className='text-gray-700'>
                شرح برداشت
              </label>
              <textarea
                id='description'
                name='description'
                placeholder='شرح برداشت'
                className={`mt-2 p-3 rounded-lg border resize-none ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}></textarea>
              {errors.description && (
                <span className='text-red-500 text-sm mt-1'>
                  این فیلد الزامی است
                </span>
              )}
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              className='mt-4 px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800'>
              ادامه
            </button>
          </form>
          <div className='bg-white w-full h-fit px-8 py-6 rounded-lg border'>
            <h1 className='text-2xl'>قوانین برداشت ریالی</h1>
            <div className='flex gap-1 my-5'>
              <InfoCircle size={24} color='#E2A831' />
              <p>
                پول شما در قالب ریال در کیف پول شما در سامانه سلامت بدون مرز
                قرار دارد. مسئولیت صحت کلیه اطلاعات به عهده خود پزشک می باشد.
                لطفا در وارد کردن شماره شبا دقت نمایید. حداقل برداشت در روز
                5.000.000 ریال و حداکثر 2.000.000.000 ریال می باشد. تراکنش‌های
                تا قبل از ساعت 21 در فردا روز کاری ساعت 11:30 صبح و تراکنش‌های
                بعد از ساعت 21 با 24 ساعت تاخیر پردازش می‌شوند.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className='p-5 bg-white'>
          <WithdrawSheba />
        </div>
      )}
    </>
  )
}
