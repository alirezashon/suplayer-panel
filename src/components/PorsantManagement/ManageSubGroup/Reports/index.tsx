import { getCookieByKey } from '@/actions/cookieToken'
import Calendar from '@/components/shared/Calendar'
import { useData } from '@/Context/Data'
import { setComma } from '@/hooks/NumberFormat'
import { AllocationListInterface } from '@/interfaces'
import { GetCommissionFulList, GetdDocFile } from '@/services/allocation'
import {
  ExportCurve,
  ImportCurve,
  Receipt1,
  ReceiveSquare,
  TransmitSquare,
} from 'iconsax-react'
import { useEffect, useState } from 'react'
const headers = [
  'ردیف',
  'نام و نام خانوادگی',
  'نوع تراکنش',
  'مبلغ(ریال)',
  'تاریخ',
  'فایل محاسبه',
]
const Reports = () => {
  const [initialData, setInitialData] = useState<
    Partial<AllocationListInterface>[]
  >([])
  const { setCommissionFullList, commissionFullList } = useData()

  useEffect(() => {
    const fetchData = async () => {
      await GetCommissionFulList({
        accessToken: (await getCookieByKey('access_token')) || '',
      }).then((result) => {
        if (result) setCommissionFullList(result)
      })
    }
    fetchData()
  }, [setCommissionFullList])
  useEffect(() => {
    setInitialData(
      Array.isArray(commissionFullList)
        ? commissionFullList.map((transaction) => ({
            visitor_uid: transaction.visitor_full_name,
            wstatus: transaction.rec_type,
            amount: setComma(transaction.amount),
            regdate: transaction.regdate_pe,
            file_uid: transaction.allocation_status_id_file,
          }))
        : []
    )
  }, [commissionFullList])

  const filterPersonnel = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    const filteredData = commissionFullList?.filter(
      (person: Partial<AllocationListInterface>) => {
        const fieldValue = person?.[name as keyof AllocationListInterface]
        if (typeof fieldValue === 'string') {
          return !value || fieldValue.includes(value)
        }
        return !value
      }
    )

    // فقط فیلدهای خاص را ذخیره می‌کنیم
    const filteredFieldsData = filteredData?.map((transaction) => ({
      visitor_uid: transaction.visitor_uid,
      wstatus: transaction.wstatus,
      amount: transaction.amount,
      regdate: transaction.regdate_pe,
      file_uid: transaction.allocation_status_id_file,
    }))

    setInitialData(filteredFieldsData as Partial<AllocationListInterface>[])
  }

  return (
    <div className='p-6 bg-white rounded-lg border border-gray-200'>
      <div className='flex justify-between'>
        <div className='flex gap-3'>
          <Receipt1 color='#7747C0' size={24} />
          <p className='text-2xl'>گزارش فعالیت پورسانت‌دهی</p>
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
              نوع تراکنش
            </label>
            <input
              name='pers_tel'
              onChange={filterPersonnel}
              placeholder='شماره همراه'
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
              مبلغ
            </label>
            <div className='flex gap-4'>
              <input className='flex-1' placeholder='از مبلغ' />
              <input className='flex-1' placeholder='تا مبلغ' />
            </div>
          </div>
        </div>
        <div className='mt-10 w-full flex justify-end'>
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
                <tr key={index} className='border-b '>
                  {[index + 1, ...[...Object.values(personnel)]].map(
                    (detail, detailIndex) => (
                      <td
                        key={detailIndex}
                        className={`text-center h-10 ${
                          detailIndex === 0
                            ? ' border-r '
                            : detailIndex === 5 && ' border-l '
                        }`}>
                        {detailIndex === 2 ? (
                          <div className='flex justify-center items-center gap-2'>
                            {detail === 1 ? (
                              <p className='bg-[#E2F1FC] rounded-full p-1'>
                                <TransmitSquare size={22} color='#0F6195' />
                              </p>
                            ) : (
                              <p className='bg-[#DAFEE5] rounded-full p-1'>
                                <ReceiveSquare size={22} color='#0F973D' />
                              </p>
                            )}
                            <p>
                              {detail === 1
                                ? 'آزاد سازی اعتبار'
                                : 'تخصیص اعتبار'}
                            </p>
                          </div>
                        ) : detailIndex === 5 ? (
                          <p className='flex justify-center cursor-pointer'>
                            <ImportCurve
                              color='#7747C0'
                              className={`${!detail && 'cursor-not-allowed opacity-45'}`}
                              size={24}
                              onClick={async () => {
                                if (detail)
                                  await GetdDocFile({
                                    file_uid: `${detail}`,
                                    accessToken: await getCookieByKey(
                                      'access_token'
                                    ),
                                  })
                              }}
                            />
                          </p>
                        ) : (
                          detail
                        )}
                      </td>
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Reports
