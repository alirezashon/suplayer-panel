import Calendar from '@/components/shared/Calendar'
import { useData } from '@/Context/Data'
import { TransactionInterface } from '@/interfaces'
import { ExportCurve, Receipt1 } from 'iconsax-react'
import { useEffect, useState } from 'react'
const headers = ['ردیف', 'تراکنش', 'تاریخ', 'بدهکار', 'بستانکار']
const FinanceReports = () => {
  const [initialData, setInitialData] = useState<
    Partial<TransactionInterface>[]
  >([])
  const { transactionsData } = useData()
  useEffect(() => {
    setInitialData(transactionsData as TransactionInterface[])
  }, [transactionsData])

  const filterPersonnel = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    console.log(e)
    // const { name, value } = e.target
    // const filteredData = allocationList?.filter((person:AllocationListInterface) => {
    //   const fieldValue = person?.[name as keyof AllocationListInterface]
    //   if (typeof fieldValue === 'string') {
    //     return !value || fieldValue.includes(value)
    //   }
    //   return !value
    // })

    // فقط فیلدهای خاص را ذخیره می‌کنیم
    // const filteredFieldsData = filteredData?.map((transaction) => ({
    //   visitor_uid: transaction.visitor_uid,
    //   wstatus: transaction.wstatus,
    //   amount: transaction.amount,
    //   regdate: transaction.regdate_pe,
    //   file_uid: transaction.allocation_status_id_file,
    // }))
    // setInitialData(filteredFieldsData as Partial<AllocationListInterface>[])
  }

  return (
    <div className='p-6 bg-white rounded-lg border border-gray-200'>
      <div className='flex justify-between'>
        <div className='flex gap-3'>
          <Receipt1 color='#7747C0' size={24} />
          <p className='text-2xl'>گزارش مالی </p>
        </div>
        <p
          className='bg-[#7747C0] rounded-lg p-1 cursor-pointer'
          onClick={() =>
            alert('کارگران مشغول کارند، به زودی این مسیر هموار خواهد شد!')
          }>
          <ExportCurve color='#ffffff' size={32} />
        </p>
      </div>
      <form className='flex flex-col gap-10 bg-[#F6F5FD] my-3 p-3 max-md:px-5 max-md:pb-24 rounded-lg'>
        <div className='flex gap-4 items-center'>
          <div className='flex flex-col w-full'>
            <label className='text-base font-medium text-right text-gray-800'>
              نام خانوادگی
            </label>
            <input
              name='pers_family'
              onChange={filterPersonnel}
              placeholder='نام خانوادگی'
            />
          </div>
          <div className='flex flex-col w-full'>
            <label className='text-base font-medium text-right text-gray-800'>
              وضعیت تراکنش
            </label>
            <input
              name='pers_tel'
              onChange={filterPersonnel}
              placeholder='وضعیت تراکنش'
            />
          </div>
        </div>
        <div className='flex gap-4 items-center'>
          <div className='flex flex-col w-full'>
            <label className='text-base font-medium text-right text-gray-800'>
              تاریخ
            </label>
            <div className='flex gap-4'>
              <div className='flex-1'>
                <Calendar setDate={() => ''} placeholder='از تاریخ' />
              </div>
              <div className='flex-1'>
                <Calendar setDate={() => ''} placeholder='تا تاریخ' />
              </div>
            </div>
          </div>
          <div className='flex flex-col w-full'>
            <label className='text-base font-medium text-right text-gray-800'>
              مبلغ (ریال)
            </label>
            <div className='flex gap-4'>
              <input className='flex-1' placeholder='از مبلغ' />
              <input className='flex-1' placeholder='تا مبلغ' />
            </div>
          </div>
        </div>
        <div className='mt-10 w-full flex justify-end '>
          <button
            type='submit'
            className={` gap-2 px-2 py-2 w-40 text-base text-center text-white bg-[#7747C0] rounded-lg border border-[#7747C0] border-solid min-h-10 `}>
            جستجو
          </button>
        </div>
      </form>
      {initialData && initialData?.length > 0 && (
        <div className='p-6 bg-white rounded-lg border border-gray-200 flex flex-col gap-5'>
          <table className='my-10 w-full'>
            <thead className='bg-[#F3F4F5] border border-gray-200 '>
              <tr>
                {headers.map((head, headIndex) => (
                  <th className={` h-10 ${headIndex === 0} `} key={headIndex}>
                    <div className={`flex justify-center items-center  h-10 `}>
                      {head}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {initialData?.map((personnel, index) => (
                <tr key={index} className='border-b'>
                  {[
                    index + 1,
                    ...['pan', 'settlementDate_pe', 'Debit', 'Credit'].map(
                      (key) => personnel[key as keyof TransactionInterface]
                    ),
                  ].map((detail, detailIndex) => (
                    <td
                      key={detailIndex}
                      className={`text-center h-10 ${
                        detailIndex === 0
                          ? ' border-r '
                          : detailIndex === 5 && ' border-l '
                      }`}>
                      {detail}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default FinanceReports
