'use client'

import { Wallet3 } from 'iconsax-react'

const ConfirmModal = () => {
  const walletBoxStyle = {
    background:
      'linear-gradient(white, white) padding-box, conic-gradient(rgb(246, 230, 255), #ffffff 18%, #644a9e 31% 43%, rgb(228, 228, 255), #ffffff, #7a5fb7, #e7d9d5, #e4e0ed) border-box',
    border: '3px solid transparent',
    borderRadius: '1vh',
    padding: '1.5rem',
  }
  const withdrawalInfo = [
    { label: 'مبلغ به ریال', value: ' ۲.۰۰۰.۰۰۰.۰۰۰ ' },
    { label: 'نام صاحب حساب', value: 'سعدی اسدی' },
    { label: 'شماره شبا', value: 'IR۳۵۰۱۹۰۰۰۰۰۰۰۰۰۰۰۲۳۴۵۹۲۳۱' },
    { label: 'شرح برداشت', value: 'برداشت برای بدهی دکتر مصطفی' },
  ]

  return (
    <>
    <div className="absolute bg-slate-600 opacity-50 w-full h-[200vh] z-50 top-0 right-0"></div>
     <div
        className={`fixed p-10 z-50 left-[20vw] top-[1vh] max-md:left-[0] max-md:w-[100%] max-md:h-[70vh] w-[60vw] h-[75vh] bg-white border border-gray-300 rounded-t-[30px] shadow-lg transition-transform duration-300 ease-in-out right-animate 
      `}>
        <div
          className={`flex flex-col justify-between  w-full min-h-[74px]`}
          style={walletBoxStyle}>
          <div className='flex gap-2 items-center   text-sm font-bold text-black w-[211px]'>
            <Wallet3 size={24} color='#704CB9' />
            <div className='self-stretch my-auto'> برداشت از کیف پول </div>
          </div>
        </div>
        <div className='flex flex-col mt-6 w-full'>
          {withdrawalInfo.map((info, index) => (
            <div
              key={index}
              className='my-4 flex gap-10 justify-between items-center w-full'>
              <div className='gap-2 self-stretch my-auto text-neutral-500'>
                {info.label}
              </div>
              <div className='gap-2 self-stretch my-auto text-black'>
                {info.value}
              </div>
            </div>
          ))}
          <div className='flex gap-5'>
            <button
              type='submit'
              className='w-full mt-4 px-4 py-2 bg-[#7747C0] text-white rounded-lg hover:bg-purple-800'>
              برداشت
            </button>
            <button
              type='submit'
              className='w-full mt-4 px-4 py-2 border border-[#7747C0] text-[#7747C0] rounded-lg hover:bg-purple-100'>
              ویرایش درخواست
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ConfirmModal
