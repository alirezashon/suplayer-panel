import { useRef, useState } from 'react'
import { MoneySend, ReceiptSquare } from 'iconsax-react'
import toast from 'react-hot-toast'
import { getCookieByKey } from '@/actions/cookieToken'
import { AddDraftImage, DepositWithDraft } from '@/services/deposit'
import Calendar from '@/components/shared/Calendar'
import { generateDepositSignature } from '@/hooks/Signature'
import UploadPicture from '@/components/shared/UploadPicture'
import { useData } from '@/Context/Data'
import { getDraftsData } from '@/actions/setData'

const Drafts = () => {
  const { setDraftsData } = useData()
  const refs = useRef({
    cheque_type: '',
    amount: '',
    cheque_number: '',
    cheque_date: '',
    cheque_id_file: '',
    sayad_number: '',
    cheque_bank: '',
    cheque_branch: '',
    shaba_number: '',
    description: '',
  })
  const [chequeType, setChequeType] = useState<1 | 2>(1)
  const [errors, setErrors] = useState<Record<string, string>>({
    amount: '',
    cheque_number: '',
    cheque_date: '',
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

    if (!refs.current.amount) newErrors.amount = 'این فیلد اجباریست'
    if (!refs.current.cheque_number)
      newErrors.cheque_number = 'این فیلد اجباریست'
    if (!refs.current.cheque_date) newErrors.cheque_date = 'این فیلد اجباریست'

    setErrors(newErrors)
    console.table(newErrors)
    return Object.keys(newErrors).length === 0
  }
  const handleSubmit = async () => {
    const accessToken = (await getCookieByKey('access_token')) || ''
    const customerMobile = (await getCookieByKey('mobile')) || ''
    const Signature = await generateDepositSignature({
      amount: refs.current.amount.toString(),
      cheque_date: refs.current.cheque_date,
      customerMobile,
    })
    const chequeData = {
      accessToken,
      cheque_type: chequeType,
      amount: parseInt(`${refs.current.amount}`),
      cheque_number: refs.current.cheque_number,
      cheque_date: refs.current.cheque_date,
      cheque_id_file: refs.current.cheque_id_file || '',
      sayad_number: refs.current.sayad_number,
      cheque_bank: refs.current.cheque_bank,
      cheque_branch: refs.current.cheque_branch,
      shaba_number: refs.current.shaba_number,
      description: refs.current.description,
      Signature,
    }
    try {
      if (validateForm()) {
        const response = await DepositWithDraft(chequeData)
        if (response) {
          toast.success(`${response.message}`)
          await getDraftsData().then((value) => value && setDraftsData(value))
        } else {
        }
      }
    } catch (error) {
      toast.error('خطا در ثبت اطلاعات. لطفاً مجدداً تلاش کنید.')
    }
  }
  const UploadImage = async (formData: FormData): Promise<boolean> => {
    try {
      const accessToken = (await getCookieByKey('access_token')) || ''
      const result = await AddDraftImage({
        src: formData,
        accessToken,
      })
      if (result) {
        refs.current.cheque_id_file = result.rec_id_file
        return true
      } else return false
    } catch (error) {
      console.error('Upload failed:', error)
      return false
    }
  }
  return (
    <div className='min-h-screen flex justify-center p-4'>
      <div className='w-full flex bg-white rounded-lg shadow-lg p-6 gap-8'>
        <div className='w-full flex flex-col gap-4'>
          <h2 className='text-gray-700 text-xl font-bold flex items-center gap-2 mr-4'>
            <MoneySend size='24' color='#704CB9' />
            مشخصات {chequeType === 1 ? ' چک ' : ' سند '} واریزی
          </h2>
          <div className='flex flex-col mt-7'>
            <p className='text-[#7747C0]'>انتخاب نوع ذی‌ نفع </p>
            <div className='flex justify-between mt-2'>
              {['چک', 'سند'].map((beneficiary, index) => (
                <div className='w-full' key={index}>
                  <label className='flex items-center gap-3 cursor-pointer'>
                    <input
                      type='radio'
                      defaultChecked={index === 0}
                      name='beneficiary'
                      value={beneficiary}
                      onChange={() => setChequeType(index === 0 ? 1 : 2)}
                      className='w-5 h-5 cursor-pointer accent-[#7747C0]'
                    />
                    <span className='text-gray-700'>{beneficiary}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className='flex gap-10'>
            <div className='w-full'>
              <label
                htmlFor='amount'
                className='block text-gray-600 mb-2 text-right'>
                مبلغ
                {chequeType === 1 ? ' چک ' : ' سند '}
                به ریال
              </label>
              <input
                name='amount'
                defaultValue={refs.current.amount}
                onChange={handleInputChange}
                placeholder={`مبلغ ${
                  chequeType === 1 ? ' چک ' : 'سند'
                } را به ریال وارد نمایید`}
                className={`w-full p-3 border ${
                  errors.amount && errorClass
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400`}
              />
              {errors.amount && (
                <p className='text-red-500 m-1'>{errors.amount}</p>
              )}
            </div>
            <div className='w-full'>
              <label
                htmlFor='amount'
                className='block text-gray-600 mb-2 text-right'>
                تاریخ {chequeType === 1 ? ' چک ' : ' سند '}
              </label>
              <Calendar
                hasError={errors?.cheque_date?.length > 0}
                placeholder={`تاریخ${chequeType === 1 ? ' چک ' : ' سند '}`}
                setDate={(value: string) => (refs.current.cheque_date = value)}
              />
              {errors.cheque_date && (
                <p className='text-red-500 m-1'>{errors.cheque_date}</p>
              )}
            </div>
          </div>
          <div className='w-full'>
            <label
              htmlFor='cheque_number'
              className='block text-gray-600 mb-2 text-right'>
              شماره سریال {chequeType === 1 ? ' چک ' : ' سند '}
            </label>
            <input
              name='cheque_number'
              defaultValue={refs.current.cheque_number}
              onChange={handleInputChange}
              placeholder='شماره شبا را وارد کنید'
              className={`w-full ${
                errors.cheque_number && errorClass
              } p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400`}
            />
            {errors.cheque_number && (
              <p className='text-red-500 m-1'>{errors.cheque_number}</p>
            )}
          </div>
          {chequeType === 1 && (
            <div className='flex gap-10'>
              <div className='w-full'>
                <label
                  htmlFor='shaba_number'
                  className='block text-gray-600 mb-2 text-right'>
                  شماره شبا حساب مبدا
                </label>
                <input
                  name='shaba_number'
                  defaultValue={refs.current.shaba_number}
                  onChange={handleInputChange}
                  placeholder={`${
                    chequeType === 1 ? '۹۲۷۴۳۵۹۲' : 'شماره شبا را وارد کنید'
                  }`}
                  className='w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400'
                />
              </div>

              <div className='w-full'>
                <label
                  htmlFor='sheba'
                  className='block text-gray-600 mb-2 text-right'>
                  شناسه {chequeType === 1 ? ' چک ' : ' سند '} صیاد
                </label>
                <input
                  name='sayad_number'
                  defaultValue={refs.current.sayad_number}
                  onChange={handleInputChange}
                  placeholder={`شناسه${
                    chequeType === 1 ? ' چک ' : ' سند '
                  }صیاد را وارد کنید`}
                  className='w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400'
                />
              </div>
            </div>
          )}
          <div className='flex gap-10'>
            <div className='w-full'>
              <label
                htmlFor='sheba'
                className='block text-gray-600 mb-2 text-right'>
                نام بانک
              </label>
              <input
                name='cheque_bank'
                defaultValue={refs.current.cheque_bank}
                onChange={handleInputChange}
                placeholder='نام بانک را وارد کنید'
                className='w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400'
              />
            </div>
            <div className='w-full'>
              <label
                htmlFor='cheque_branch'
                className='block text-gray-600 mb-2 text-right'>
                کد شعبه
              </label>
              <input
                name='cheque_branch'
                defaultValue={refs.current.cheque_branch}
                onChange={handleInputChange}
                placeholder='کد شعبه بانک را وارد کنید'
                className='w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400'
              />
            </div>
          </div>

          <div className='w-full'>
            <label
              htmlFor='description'
              className='block text-gray-600 mb-2 text-right'>
              شرح واریز
            </label>
            <textarea
              name='description'
              defaultValue={refs.current.description}
              onChange={handleInputChange}
              placeholder='شرح واریز'
              className='w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400'
              rows={3}
            />
          </div>
          <div className='flex gap-10'>
            <button
              onClick={handleSubmit}
              className='flex items-center gap-2 w-full justify-center h-10 rounded-lg bg-[#7747C0] hover:bg-[#7747C0] text-white font-bold'>
              ذخیره
            </button>
            <button className='flex items-center gap-2 w-full justify-center h-10 rounded-lg bg-purple-50 hover:bg-purple-100 text-[#7747C0] border border-[#7747c0] font-bold'>
              انصراف
            </button>
          </div>
        </div>
        <div className='flex flex-col w-full h-fit justify-between mb-6'>
          <h3 className='text-gray-700 text-lg font-bold flex items-center gap-2 mb-2'>
            <ReceiptSquare size='20' color='#704CB9' />
            عکس {chequeType === 1 ? ' چک ' : ' سند '}
          </h3>
          <UploadPicture uploadImage={UploadImage} />
        </div>
      </div>
    </div>
  )
}

export default Drafts
