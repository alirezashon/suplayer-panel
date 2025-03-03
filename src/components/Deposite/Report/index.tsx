'use client'
import { getDraftsData } from '@/actions/setData'
import ExcelGenerator from '@/components/shared/GenerateExcel'
import { useData } from '@/Context/Data'
import { Receipt1 } from 'iconsax-react'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const Table = dynamic(() => import('../../Table'), {
  ssr: false,
})
const Report = () => {
  const { draftsData, setDraftsData } = useData()
  const [rows, setRows] = useState<(string | number)[][]>([])

  useEffect(() => {
    const fetchData = async () => {
      await getDraftsData().then((value) => {
        if (Array.isArray(value)) {
          const rowItems = value?.map((row) => [...Object.values(row)])
          setRows(rowItems)
          setDraftsData(value)
        }
      })
    }
    fetchData()
  }, [setDraftsData])
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
  const initialData = draftsData?.map((item) => {
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
      if (key === 'cheque_type') obj[key] = item[key] === 1 ? 'چک' : 'سند'
      else obj[key] = item[key as keyof typeof item]
      return obj
    }, {} as Record<string, string | number>)
  })
  return (
    <div className='flex flex-col p-4 bg-white shadow-lg m-4 rounded-lg'>
      <div className='flex justify-between'>
        <div className='flex my-5 gap-3'>
          <Receipt1 size={24} color='#7747C0' />
          <h1> گزارش‌های واریز</h1>
        </div>
        <div className='h-fit p-2 rounded-lg bg-[#7747C0] cursor-pointer'>
          <ExcelGenerator rows={rows} header={headers} />
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
        {initialData && <Table data={initialData} headers={headers} />}
      </div>
    </div>
  )
}
export default Report
