import { useRef, useState } from 'react'
import {
  WalletMoney,
  CloseCircle,
  TickCircle,
  MoneySend,
  DocumentUpload,
  Trash,
  EyeSlash,
  Eye,
} from 'iconsax-react'
import Image from 'next/image'
import { useStates } from '@/Context/States'

const PayByID = () => {
  const refs = useRef({
    amount: '',
    sheba: '',
    description: '',
  })
  const { showModal } = useStates()
  const amountInputRef = useRef<HTMLInputElement>(null)
  const shebaInputRef = useRef<HTMLInputElement>(null)
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null)
  const [uploadStatus, setUploadStatus] = useState<
    'idle' | 'uploading' | 'success' | 'error' | 'showImage'
  >('idle')
  const [progress, setProgress] = useState<number>(0)
  const [identityCard, setIdentityCard] = useState<string>()
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    if (!['image/png', 'image/jpg', 'image/jpeg'].includes(`${file?.type}`)) {
      showModal({
        type: 'error',
        main: <p>پسوند فایل قابل قبول نمی باشد,</p>,
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
          setIdentityCard(newAvatarUrl)
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
        } catch (error) {
          setUploadStatus('error')
          showModal({
            type: 'error',
            main: <p> خطا </p>,
            title: 'خطا',
            autoClose: 2,
          })
          return error
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const walletBoxStyle = {
    background:
      'linear-gradient(white, white) padding-box, conic-gradient(rgb(246, 230, 255), #ffffff 18%, #644a9e 31% 43%, rgb(228, 228, 255), #ffffff, #7a5fb7, #e7d9d5, #e4e0ed) border-box',
    border: '3px solid transparent',
    borderRadius: '1vh',
    padding: '1.5rem',
  }

  return (
    <div className='min-h-screen flex justify-center p-4'>
      <div className='w-full flex bg-white rounded-lg shadow-lg p-6 gap-8'>
        <div className='w-full flex flex-col gap-4'>
          <h2 className='text-gray-700 text-xl font-bold flex items-center gap-2 mr-4'>
            <MoneySend size='24' color='#704CB9' />
            واریز شناسه‌دار
          </h2>

          <div>
            <label
              htmlFor='amount'
              className='block text-gray-600 mb-2 text-right'>
              مبلغ چک به ریال
            </label>
            <input
              id='amount'
              ref={amountInputRef}
              defaultValue={refs.current.amount}
              onChange={(e) => (refs.current.amount = e.target.value)}
              
              placeholder='مبلغ چک را به ریال وارد نمایید'
              className='w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400'
            />
          </div>

          <div>
            <label
              htmlFor='sheba'
              className='block text-gray-600 mb-2 text-right'>
              شماره شبا واریز کننده
            </label>
            <input
              id='sheba'
              ref={shebaInputRef}
              defaultValue={refs.current.sheba}
              onChange={(e) => (refs.current.sheba = e.target.value)}
              
              placeholder='شماره شبا را وارد کنید'
              className='w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400'
            />
          </div>
          <div className='flex gap-10'>
            <div className='w-full'>
              <label
                htmlFor='sheba'
                className='block text-gray-600 mb-2 text-right'>
                شناسه‌واریز
              </label>
              <input
                id='sheba'
                ref={shebaInputRef}
                defaultValue={refs.current.sheba}
                onChange={(e) => (refs.current.sheba = e.target.value)}
                
                placeholder='شناسه واریز را وارد کنید'
                className='w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400'
              />
            </div>
            <div className='w-full'>
              <label
                htmlFor='sheba'
                className='block text-gray-600 mb-2 text-right'>
                کدرهگیری
              </label>
              <input
                id='sheba'
                ref={shebaInputRef}
                defaultValue={refs.current.sheba}
                onChange={(e) => (refs.current.sheba = e.target.value)}
                
                placeholder='کدرهگیری را وارد کنید'
                className='w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400'
              />
            </div>
          </div>
          <div className='flex gap-5'>
            {identityCard ? (
              <div
                className={`gap-5 w-full p-5 rounded-lg flex flex-col justify-center items-center border 
            border-[#C9D0D8] border-dashed
            text-[#50545F] cursor-pointer my-6`}>
                {uploadStatus === 'showImage' && (
                  <div
                    className={`gap-5 w-full p-5 rounded-lg flex justify-center items-center cursor-pointer my-6`}>
                    <Image
                      src={identityCard}
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
                        size={24}
                        onClick={() => setUploadStatus('showImage')}
                        color='#2F27CE'
                      />
                    ) : (
                      <EyeSlash
                        size={24}
                        onClick={() => setUploadStatus('success')}
                        color='#2F27CE'
                      />
                    )}
                    <Trash
                      size={24}
                      color='#BB1F1A'
                      onClick={() => {
                        setIdentityCard(undefined)
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
                  <div className='flex justify-between w-full h-full'>
                    <div className=''>
                      <DocumentUpload size={24} color='#50545F' />
                      <p>فیش واریز خود را بارگذاری کنید</p>
                      <p className='text-[#B2BBC7]'> PNG, JPG (max. 2mb)</p>
                    </div>
                    <button className='bg-[#704CB9] text-white rounded-lg w-20 h-10'>
                      بارگذاری
                    </button>
                  </div>
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
              placeholder=' قید کلمه «تادیه دیون» الزامی است'
              className='w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400'
              rows={3}
            />
          </div>

          <div className='flex gap-10'>
            <button className='flex items-center gap-2 w-full justify-center h-10 rounded-lg bg-[#7747C0] hover:bg-[#7747C0] text-white font-bold'>
              <TickCircle size='20' color='#ffffff' variant='Bold' />
              پرداخت
            </button>
            <button className='flex items-center gap-2 w-full justify-center h-10 rounded-lg bg-purple-50 hover:bg-purple-100 text-[#7747C0] border border-600 font-bold'>
              <CloseCircle size='20' color='#704CB9' variant='Bold' />
              انصراف
            </button>
          </div>
        </div>

        <div className='flex flex-col w-full justify-between h-fit mb-6'>
          <h3 className='text-gray-700 text-lg font-bold flex items-center gap-2 mb-2'>
            <WalletMoney size='20' color='#704CB9' />
            کیف پول
          </h3>
          <div style={walletBoxStyle} className='flex-1 shadow-md'>
            <h3 className='text-gray-700 text-lg font-bold flex items-center gap-2 mb-2'>
              <WalletMoney size='20' color='#704CB9' />
              کیف پول شما
            </h3>
            <p className='flex justify-between text-gray-500'>
              اعتبار قابل تخصیص <br />
              <span className='text-gray-800 font-semibold text-lg'>
                ۴۰۰۰۰۰  ریال
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PayByID
