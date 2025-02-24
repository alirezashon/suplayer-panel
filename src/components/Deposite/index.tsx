import Report from './Report'
import Drafts from './Drafts'
import { useState } from 'react'
import OnlinePayment from './OnlinePayment'

const Deposite = () => {
  const [tab, setTab] = useState<number>(0)
  return (
    <div className=''>
      <div className='flex border-b'>
        <div
          className={`transition-all duration-500 px-5 border-b ${
            tab === 0 && 'bg-[#E6DBFB80] border-b-[#704CB9]'
          }`}>
          <button
            className={`w-full flex justify-center !rounded-lg items-center gap-4 !py-3 ${
              tab === 0 ? '!text-[#704CB9]' : 'text-[#344054]'
            }`}
            onClick={() => {
              setTab(0)
            }}>
            <div
              className={`flex gap-1 ${
                tab === 0 ? 'text-[#2f27ce]' : 'text-[#344054]'
              }`}>
              واریز آنلاین
            </div>
          </button>
        </div>
        {/* <div
          className={`transition-all duration-500 px-5 border-b ${
            tab === 1 && 'bg-[#E6DBFB80] border-b-[#704CB9]'
          }`}>
          <button
            className={`w-full flex justify-center !rounded-lg items-center gap-4 !py-3 ${
              tab === 1 ? '!text-[#704CB9]' : 'text-[#344054]'
            }`}
            onClick={() => {
              setTab(1)
            }}>
            <div
              className={`flex gap-1 ${
                tab === 1 ? 'text-[#2f27ce]' : 'text-[#344054]'
              }`}>
              واریز شناسه‌دار
            </div>
          </button>
        </div>
        <div
          className={`transition-all duration-500 px-5 border-b ${
            tab === 2 && 'bg-[#E6DBFB80] border-b-[#704CB9]'
          }`}>
          <button
            className={`w-full flex justify-center !rounded-lg items-center gap-4 !py-3 ${
              tab === 2 ? '!text-[#704CB9]' : 'text-[#344054]'
            }`}
            onClick={() => {
              setTab(2)
            }}>
            <div
              className={`flex gap-1 ${
                tab === 2 ? 'text-[#2f27ce]' : 'text-[#344054]'
              }`}>
              لینک پرداخت
            </div>
          </button>
        </div> */}
        <div
          className={`transition-all duration-500 px-5 border-b ${
            tab === 3 && 'bg-[#E6DBFB80] border-b-[#704CB9]'
          }`}>
          <button
            className={`w-full flex justify-center !rounded-lg items-center gap-4 !py-3 ${
              tab === 3 ? '!text-[#704CB9]' : 'text-[#344054]'
            }`}
            onClick={() => {
              setTab(3)
            }}>
            <div
              className={`flex gap-1 ${
                tab === 3 ? 'text-[#2f27ce]' : 'text-[#344054]'
              }`}>
              ثبت چک
            </div>
          </button>
        </div>
      </div>
      {tab === 0 ? (
        <OnlinePayment />
      ) : (
        // : tab === 1 ? (
        //   <PayByID />
        // ) : tab === 2 ? (
        //   <PaymentLink />
        // )
        tab === 3 && <Drafts />
      )}
      <Drafts />
      <Report />
    </div>
  )
}

export default Deposite
