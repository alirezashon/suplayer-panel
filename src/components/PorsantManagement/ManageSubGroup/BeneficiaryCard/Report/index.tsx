'use client'
import { getCookieByKey } from '@/actions/cookieToken'
import TransactionReports from './TransactionRowItem'
import Calendar from '@/components/shared/Calendar'
import { BeneficiaryData, CommissionFullList } from '@/interfaces'
import { GetCommissionFulList } from '@/services/allocation'
import {
  CloseCircle,
  CloseSquare,
  ReceiveSquare,
  TransmitSquare,
} from 'iconsax-react'
import { useEffect, useState } from 'react'
import { setComma } from '@/hooks/NumberFormat'

const BeneficiaryReport = ({
  beneficiary,
  close,
}: {
  beneficiary: BeneficiaryData
  close: () => void
}) => {
  const [selectedDate, setSelectedDate] = useState<{
    start: string
    end: string
  }>()
  const [data, setData] = useState<{
    initialed: CommissionFullList[]
    filtered: CommissionFullList[]
  }>({ initialed: [], filtered: [] })
  const [tab, setTab] = useState<number>(0)

  useEffect(() => {
    const fetchData = async () => {
      await GetCommissionFulList({
        accessToken: (await getCookieByKey('access_token')) || '',
        visitor_uid: beneficiary.visitor_uid,
      }).then((result) => {
        if (result) {
          setData({ initialed: result, filtered: result })
        }
      })
    }
    fetchData()
  }, [beneficiary])

  return (
    <div>
      <div className='absolute bg-slate-600 opacity-50 w-full h-[200vh] z-50 top-0 right-0'></div>
      <div
        className={`fixed p-4 z-50 right-0 top-0 max-md:left-[0] max-md:w-[100%] w-[40vw] h-full bg-white border border-gray-300 shadow-lg transition-transform duration-300 ease-in-out right-side-animate`}>
        <div className='flex justify-between mb-7'>
          <p>تاریخچه تخصیص</p>
          <CloseSquare
            size={32}
            color='#50545F'
            cursor={'pointer'}
            onClick={close}
          />
        </div>
        <div className='flex p-4 flex-col border rounded-lg'>
          <h2 className='font-bold'> {beneficiary.visitor_full_name}</h2>
          <div className='flex justify-between '>
            <p className='text-[#8455D2]'>تخصیص کل</p>
            <p className=''>
              {setComma(beneficiary.collectible_credit)}
              <small className={`ms-1`}>ریال</small>
            </p>
          </div>
          <div className='flex justify-between '>
            <p className='text-[#8455D2]'>آزاد سازی نشده</p>
            <p className=''>
              {setComma(beneficiary.Uncollectible_credit)}
              <small className={`ms-1`}>ریال</small>
            </p>
          </div>
        </div>
        <div className='flex gap-5 items-center my-7'>
          <Calendar
            placeholder='از تاریخ'
            setDate={(result: string) =>
              setSelectedDate({ start: result, end: selectedDate?.end || '' })
            }
          />
          <Calendar
            placeholder='تا تاریخ'
            setDate={(result: string) =>
              setSelectedDate({ start: result, end: selectedDate?.end || '' })
            }
          />
          <div>
            <CloseCircle size={32} color='#7747C0' />
          </div>
        </div>

        <div className='flex sticky  top-0 mb-4 sm:mb-6'>
          {['تراکنش‌های آزادسازی شده', 'تراکنش‌های تخصیص اعتبار']?.map(
            (report, index) => (
              <div
                key={index}
                className={`flex-1 border-b ${
                  tab === index ? 'border-b-[#7747C0]' : ''
                }`}>
                <button
                  className={`w-full flex justify-center !rounded-lg items-center gap-4 !py-3 ${
                    tab === index ? 'text-[#7747C0]' : 'text-[#98A2B3]'
                  }`}
                  onClick={() => {
                    setTab(index)
                  }}>
                  {index === 1 ? (
                    <ReceiveSquare
                      size={32}
                      color={tab === index ? '#7747C0' : '#98A2B3'}
                    />
                  ) : (
                    <TransmitSquare
                      size={32}
                      color={tab === index ? '#7747C0' : '#98A2B3'}
                    />
                  )}
                  {report}
                </button>
              </div>
            )
          )}
        </div>
        {data.filtered?.length > 0 &&
          data.filtered?.map((item, index) =>
            tab === 0
              ? item.rec_type === 1 && (
                  <TransactionReports data={item} key={index} />
                )
              : item.rec_type === 2 && (
                  <TransactionReports data={item} key={index} />
                )
          )}
      </div>
    </div>
  )
}

export default BeneficiaryReport
