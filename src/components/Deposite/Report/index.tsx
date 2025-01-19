'use client'
import { getCookieByKey } from '@/actions/cookieToken'
import { DraftsData } from '@/interfaces'
import { GetdDraftsList } from '@/services/deposit'
import { ExportCurve, Receipt1 } from 'iconsax-react'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const Table = dynamic(() => import('../../Table'), {
  ssr: false,
})
const Report = () => {
  const [data, setData] = useState<DraftsData[]>([])
  // const data = Array.from({ length: 15 }, (_, index) => ({
  //   draftNumber: '12345678',
  //   mablaghRial: '3,000,000,00',
  //   username: 'فاطمه جلیلی',
  //   mande: '3,000,000,00',
  //   tarikh: '۲۷ مهر ۱۴۰۳',
  //   hesab: 'حساب معین',
  //   status: index % 2 === 0 ? ' موفق' : 'ناموفق',
  // }))
  useEffect(() => {
    const fetchData = async () => {
      const accessToken = await getCookieByKey('access_token')
      await GetdDraftsList({ accessToken }).then(
        (value) => value && setData(value)
      )
    }
    fetchData()
  }, [setData])
  const headers = [
    'نوع اعتبار',
    ' مبلغ (ریال )',
    ' تاریخ ',
    'شماه شبا مبدا',
    'شماره سریال',
    'شناسه صیاد',
    ' نام بانک',
    'شعبه',
    ' وضعیت',
    'دانلود سند',
    'جزئیات',
  ]
  const initialData = data.map((item) => {
    return [
      'cheque_type',
      'amount',
      'cheque_date',
      'shaba_number',
      'cheque_number',
      'sayad_number',
      'cheque_bank',
      'cheque_branch',
      'cheque_status',
      'cheque_id_file',
      // 'description',
      // 'cheque_uid',
      // 'cheque_status_date',
      // 'status_description',
    ].reduce((obj, key) => {
      key === 'cheque_type'
        ? (obj[key] = item[key] === 1 ? 'چک' : 'سند')
        : (obj[key] = item[key as keyof typeof item])
      return obj
    }, {} as Record<string, any>)
  })
  return (
    <div className='flex flex-col p-4 bg-white shadow-lg m-4 rounded-lg'>
      <div className='flex justify-between'>
        <div className='flex my-5 gap-3'>
          <Receipt1 size={24} color='#7747C0' />
          <h1> گزارش‌های واریز</h1>
        </div>
        <div className='h-fit p-2 rounded-lg bg-[#7747C0]'>
          <ExportCurve size={24} color='#FFF' />
        </div>
      </div>
      <div className='flex flex-col  rounded-lg p-2'>
        <form className='flex flex-col'>
          <div className='flex gap-6'>
            <div className='w-full'>
              <label>از تاریخ</label>
              <input
                className={`!w-full outline-none rounded-lg  h-10 cursor-pointer text-slate-400 `}
              />
            </div>
            <div className='w-full'>
              <label> تا تاریخ</label>
              <select
                defaultValue={'0'}
                className={`!w-full outline-none border border-[#cccccc] rounded-lg  h-10 cursor-pointer text-slate-400`}>
                <option value='0'> نام بانک </option>
                <option value='1'>test</option>
              </select>
            </div>
            <div className='w-full'>
              <label> تا مبلغ </label>
              <select
                defaultValue={'0'}
                className={`!w-full outline-none border border-[#cccccc] rounded-lg  h-10 cursor-pointer  text-slate-400`}>
                <option value='0'>نام طرف حساب </option>
                <option value='1'>test</option>
              </select>
            </div>
            <div className='w-full'>
              <label> از مبلغ</label>
              <select
                defaultValue={'0'}
                className={`!w-full outline-none border border-[#cccccc] rounded-lg  h-10 cursor-pointer  text-slate-400`}>
                <option value='0'> وضعیت </option>
                <option value='1'>test</option>
              </select>
            </div>
          </div>
          <div className='flex gap-6 my-5'>
            <div className='w-full'>
              <label> وضعیت</label>
              <select
                defaultValue={'0'}
                className={`!w-full outline-none border border-[#cccccc] rounded-lg  h-10 cursor-pointer text-slate-400`}>
                <option value='0'> حساب کل </option>
                <option value='1'>test</option>
              </select>
            </div>
            <div className='w-full'>
              <label> شبا </label>
              <select
                defaultValue={'0'}
                className={`!w-full outline-none border border-[#cccccc] rounded-lg  h-10 cursor-pointer  text-slate-400`}>
                <option value='0'> حساب معین </option>
                <option value='1'>test</option>
              </select>
            </div>
          </div>
        </form>
        <div className='flex justify-end mt-6'>
          <button className=' bg-[#7747C0] text-white w-56 flex items-center justify-center py-1 px-2 rounded-lg '>
            جستجو
          </button>
        </div>
        {data && <Table data={initialData} headers={headers} />}
      </div>
    </div>
  )
}
export default Report