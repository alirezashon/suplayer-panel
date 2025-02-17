import  { useRef } from 'react'
import { WalletMoney, CloseCircle, TickCircle, MoneySend } from 'iconsax-react'

const OnlinePayment = () => {
  const refs = useRef({
    amount: '',
    phone: '',
    description: '',
  })
  const amountInputRef = useRef<HTMLInputElement>(null) // Ref for amount input
  const phoneInputRef = useRef<HTMLInputElement>(null) // Ref for phone input
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null) // Ref for description textarea

  const updateAmount = (value: string) => {
    refs.current.amount = value
    if (amountInputRef.current) {
      amountInputRef.current.value = value // Update input DOM value
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
            واریز آنلاین
          </h2>

          <div>
            <label
              htmlFor='amount'
              className='block text-gray-600 mb-2 text-right'>
              مبلغ به ریال
            </label>
            <input
              id='amount'
              ref={amountInputRef}
              defaultValue={refs.current.amount}
              onChange={(e) => (refs.current.amount = e.target.value)}
              
              placeholder='مبلغ خود را به ریال وارد نمایید'
              className='w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400'
            />
          </div>

          <div className='flex justify-between'>
            <button
              onClick={() => updateAmount('100000000')}
              className='px-4 py-2 rounded-md border hover:bg-gray-100 text-[#7747C0]'>
              ۱۰۰ میلیون ریال
            </button>
            <button
              onClick={() => updateAmount('200000000')}
              className='px-4 py-2 rounded-md border hover:bg-gray-100 text-[#7747C0]'>
              ۲۰۰ میلیون ریال
            </button>
            <button
              onClick={() => updateAmount('300000000')}
              className='px-4 py-2 rounded-md border hover:bg-gray-100 text-[#7747C0]'>
              ۳۰۰ میلیون ریال
            </button>
          </div>

          <div>
            <label
              htmlFor='phone'
              className='block text-gray-600 mb-2 text-right'>
              شماره موبایل
            </label>
            <input
              id='phone'
              ref={phoneInputRef}
              defaultValue={refs.current.phone}
              onChange={(e) => (refs.current.phone = e.target.value)}
              
              placeholder='شماره موبایل خود را وارد کنید'
              className='w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400'
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
              placeholder='شرح واریز'
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
                ۴۰۰۰۰۰ میلیون ریال
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OnlinePayment
