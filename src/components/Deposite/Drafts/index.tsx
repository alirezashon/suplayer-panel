import { useRef, useState } from 'react'
import {
  TickCircle,
  MoneySend,
  DocumentUpload,
  Trash,
  EyeSlash,
  Eye,
  ReceiptSquare,
} from 'iconsax-react'
import toast from 'react-hot-toast'
import Image from 'next/image'
import { getCookieByKey } from '@/actions/cookieToken'
import { AddDraftImage } from '@/services/deposit'
import Calendar from '@/components/shared/Calendar'

const Drafts = () => {
  const refs = useRef({
    amount: '',
    sheba: '',
    description: '',
  })
  const amountInputRef = useRef<HTMLInputElement>(null)
  const shebaInputRef = useRef<HTMLInputElement>(null)
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null)
  const [uploadStatus, setUploadStatus] = useState<
    'idle' | 'uploading' | 'success' | 'error' | 'showImage'
  >('idle')
  const [progress, setProgress] = useState<number>(0)
  const [chequeType, setChequeType] = useState<1 | 2>(1)
  const [draftSrc, setDraftSrc] = useState<string>()
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
          setUploadStatus('showImage')

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
          const result = await AddDraftImage({
            src: formData,
            accessToken,
          })
          if (result) {
          }
        } catch (error) {
          setUploadStatus('error')
          toast.error('خطا در بارگذاری')
          return error
        }
      }
      reader.readAsDataURL(file)
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
                id='amount'
                ref={amountInputRef}
                defaultValue={refs.current.amount}
                onChange={(e) => (refs.current.amount = e.target.value)}
                type='text'
                placeholder='مبلغ چک را به ریال وارد نمایید'
                className='w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400'
              />
            </div>
            <div className='w-full'>
              <label
                htmlFor='amount'
                className='block text-gray-600 mb-2 text-right'>
                تاریخ {chequeType === 1 ? ' چک ' : ' سند '}
              </label>
              <Calendar setDate={(value: string) => value} />
            </div>
          </div>

          <div>
            <label
              htmlFor='sheba'
              className='block text-gray-600 mb-2 text-right'>
              {chequeType === 1 ? ' شماره شبا حساب مبدا' : ''}
            </label>
            <input
              id='sheba'
              ref={shebaInputRef}
              defaultValue={refs.current.sheba}
              onChange={(e) => (refs.current.sheba = e.target.value)}
              type='text'
              placeholder={`${
                chequeType === 1 ? '۹۲۷۴۳۵۹۲' : 'شماره شبا را وارد کنید'
              }`}
              className='w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400'
            />
          </div>
          <div className='flex gap-10'>
            <div className='w-full'>
              <label
                htmlFor='sheba'
                className='block text-gray-600 mb-2 text-right'>
                شماره سریال {chequeType === 1 ? ' چک ' : ' سند '}
              </label>
              <input
                id='sheba'
                ref={shebaInputRef}
                defaultValue={refs.current.sheba}
                onChange={(e) => (refs.current.sheba = e.target.value)}
                type='text'
                placeholder='شماره شبا را وارد کنید'
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
                id='sheba'
                ref={shebaInputRef}
                defaultValue={refs.current.sheba}
                onChange={(e) => (refs.current.sheba = e.target.value)}
                type='text'
                placeholder={`شناسه${
                  chequeType === 1 ? ' چک ' : ' سند '
                }صیاد را وارد کنید`}
                className='w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400'
              />
            </div>
          </div>
          <div className='flex gap-10'>
            <div className='w-full'>
              <label
                htmlFor='sheba'
                className='block text-gray-600 mb-2 text-right'>
                نام بانک
              </label>
              <input
                id='sheba'
                ref={shebaInputRef}
                defaultValue={refs.current.sheba}
                onChange={(e) => (refs.current.sheba = e.target.value)}
                type='text'
                placeholder='نام بانک را وارد کنید'
                className='w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400'
              />
            </div>
            <div className='w-full'>
              <label
                htmlFor='sheba'
                className='block text-gray-600 mb-2 text-right'>
                کد شعبه
              </label>
              <input
                id='sheba'
                ref={shebaInputRef}
                defaultValue={refs.current.sheba}
                onChange={(e) => (refs.current.sheba = e.target.value)}
                type='text'
                placeholder='کد شعبه بانک را وارد کنید'
                className='w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400'
              />
            </div>
          </div>
          <div>
            <label
              htmlFor='description'
              className='block text-gray-600 mb-2 text-right'>
              شرح واریز
            </label>
            <textarea
              id='description'
              ref={descriptionInputRef}
              defaultValue={refs.current.description}
              onChange={(e) => (refs.current.description = e.target.value)}
              placeholder='شرح واریز'
              className='w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400'
              rows={3}
            />
          </div>
          <div className='flex gap-10'>
            <button className='flex items-center gap-2 w-full justify-center h-10 rounded-lg bg-[#7747C0] hover:bg-[#7747C0] text-white font-bold'>
              ذخیره
            </button>
            <button className='flex items-center gap-2 w-full justify-center h-10 rounded-lg bg-purple-50 hover:bg-purple-100 text-[#7747C0] border border-[#7747c0] font-bold'>
              انصراف
            </button>
          </div>
        </div>

        <div className='flex flex-col w-full justify-between h-fit mb-6'>
          <h3 className='text-gray-700 text-lg font-bold flex items-center gap-2 mb-2'>
            <ReceiptSquare size='20' color='#704CB9' />
            عکس {chequeType === 1 ? ' چک ' : ' سند '}
          </h3>
          <div className='flex gap-5'>
            {draftSrc ? (
              <div
                className={`gap-5 w-full p-5 rounded-lg flex flex-col justify-center items-center border 
            border-[#C9D0D8] border-dashed
            text-[#50545F] cursor-pointer my-6`}>
                {uploadStatus === 'showImage' && (
                  <div
                    className={`gap-5 w-full p-5 rounded-lg flex justify-center items-center cursor-pointer my-6`}>
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
                className={`flex-col gap-5 w-full p-5 rounded-lg flex justify-center items-center border ${
                  uploadStatus === 'uploading'
                    ? 'bg-gradient-to-r from-[#EFFEF3] to-[#D7FCEB]'
                    : 'border-[#C9D0D8] border-dashed'
                } text-[#50545F] cursor-pointer my-6`}
                htmlFor='avatarUpload'>
                <DocumentUpload
                  size={32}
                  className='bg-[#F5F7F8] p-1 rounded-full text-[#50545F]'
                />
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
                    <p>
                      <b className='text-[#4B89E6]'>کلیک کنید</b> یا فایل خود را
                      در این محل قرار دهید.
                    </p>
                    <p className='text-[#B2BBC7]'> PNG, JPG (max. 2mb)</p>
                  </>
                )}
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
        </div>
      </div>
    </div>
  )
}

export default Drafts
