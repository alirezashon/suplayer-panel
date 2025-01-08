import { useRef, useState } from 'react'
import {
  CloseCircle,
  TickCircle,
  MoneySend,
  Add,
  ArrowRight2,
} from 'iconsax-react'
import QRCode from 'react-qr-code'

const PaymentLink = () => {
  const [QR, setQR] = useState<string>('')

  const refs = useRef({
    amount: '',
    phone: '',
    lastName: '',
  })


  return (
    <div className='min-h-screen flex justify-center p-4'>
      <div className='w-full flex bg-white rounded-lg shadow-lg p-6 gap-8'>
        {QR.length > 0 ? (
          <div className='w-full flex flex-col gap-4'>
            <p className='text-gray-700 flex items-center gap-2 mr-4 cursor-pointer' onClick={()=>setQR('')}>
              <ArrowRight2 size='24' color='#704CB9' />
              بازگشت
            </p>

            <div className='flex justify-between'>
              <label
                htmlFor='amount'
                className=' text-slate-400 mb-2 text-right flex justify-between items-center'>
                مبلغ واریزی به ریال
              </label>
              <p>{`${refs.current.amount}`}</p>
            </div>
            <div className='flex justify-between'>
              <label
                htmlFor='amount'
                className=' text-slate-400 mb-2 text-right flex justify-between items-center'>
                شماره موبایل
              </label>
              <p>{`${refs.current.phone}`}</p>
            </div>
            <div className='flex justify-between'>
              <label
                htmlFor='amount'
                className=' text-slate-400 mb-2 text-right flex justify-between items-center'>
                نام و نام خانوادگی
              </label>
              <p>{`${refs.current.lastName}`}</p>
            </div>
            <div className='flex gap-10'>
              <button
                className='flex items-center gap-2 w-full justify-center h-10 rounded-lg bg-purple-600 hover:bg-[#7747C0] text-white font-bold'
                onClick={() => setQR('linkalakinka')}>
                <Add size='20' color='#ffffff' variant='Bold' />
                <p>ارسال لینک پرداخت</p>
              </button>
            </div>
          </div>
        ) : (
          <div className='w-full flex flex-col gap-4'>
            <h2 className='text-gray-700 text-xl font-bold flex items-center gap-2 mr-4'>
              <MoneySend size='24' color='#704CB9' />
              واریز از طریق لینک پرداخت
            </h2>

            <div>
              <label
                htmlFor='amount'
                className=' text-gray-600 mb-2 text-right flex justify-between items-center'>
                <p>مبلغ به ریال</p>
                <p className='text-slate-400 text-xs'>
                  کارمزد بانکی : ۱۰۰۰۰۰ ریال
                </p>
              </label>
              <input
                id='amount'
                defaultValue={refs.current.amount}
                onChange={(e) => (refs.current.amount = e.target.value)}
                type='text'
                placeholder='مبلغ خود را به ریال وارد نمایید'
                className='w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400'
              />
            </div>

            <div className='flex justify-between'>
              <button
                onClick={() => (refs.current.amount = '100000000')}
                className='px-4 py-2 rounded-md border hover:bg-gray-100 text-[#7747C0]'>
                ۱۰۰ میلیون ریال
              </button>
              <button
                onClick={() => (refs.current.amount = '200000000')}
                className='px-4 py-2 rounded-md border hover:bg-gray-100 text-[#7747C0]'>
                ۲۰۰ میلیون ریال
              </button>
              <button
                onClick={() => (refs.current.amount = '300000000')}
                className='px-4 py-2 rounded-md border hover:bg-gray-100 text-[#7747C0]'>
                ۳۰۰ میلیون ریال
              </button>
            </div>
            <div>
              <label
                htmlFor='phone'
                className='block text-gray-600 mb-2 text-right'>
                نام نام خانوادگی
              </label>
              <input
                id='phone'
                defaultValue={refs.current.phone}
                onChange={(e) => (refs.current.phone = e.target.value)}
                type='text'
                placeholder='نام و نام خانوادگی را وارد کنید'
                className='w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400'
              />
            </div>

            <div>
              <label
                htmlFor='phone'
                className='block text-gray-600 mb-2 text-right'>
                شماره موبایل
              </label>
              <input
                id='phone'
                defaultValue={refs.current.phone}
                onChange={(e) => (refs.current.phone = e.target.value)}
                type='text'
                placeholder='شماره موبایل خود را وارد کنید'
                className='w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400'
              />
            </div>
            <div className='flex gap-10'>
              <button className='flex items-center gap-2 w-full justify-center h-10 rounded-lg bg-purple-600 hover:bg-[#7747C0] text-white font-bold'
                onClick={() => setQR('linkalakinka')}
              >
                <TickCircle
                  size='20'
                  color='#ffffff'
                  variant='Bold'
                />
                تایید
              </button>
              <button className='flex items-center gap-2 w-full justify-center h-10 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-600 border border-600 font-bold'>
                <CloseCircle size='20' color='#704CB9' variant='Bold' />
                انصراف
              </button>
            </div>
          </div>
        )}

        <div
          className={`flex justify-center w-full  h-fit py-20 ${
            QR.length === 0 && 'opacity-10'
          }`}>
          <QRCode value={QR} size={333} bgColor='#ffffff' fgColor='#7747C0' />
        </div>
      </div>
    </div>
  )
}

export default PaymentLink
