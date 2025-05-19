import { setComma } from '@/hooks/NumberFormat'
import { CommissionFullList } from '@/interfaces'
import { ReceiveSquare, TransmitSquare } from 'iconsax-react'

const TransactionRowItem = ({ data }: { data: CommissionFullList }) => {
  return (
    <div className='flex items-center max-md:text-[12px] overflow-hidden my-2'>
      <button className='!flex !w-full !items-center !justify-between !last-of-type:mb-0 !rounded-lg'>
        <div className='flex gap-3 '>
          <div className='text-start'>
            <div className='flex items-center mb-2'>
              <p className='block text-zinc-800 text-nowrap'>
                {data.rec_type === 1 ? (
                  <ReceiveSquare size={32} color={'#7747C0'} />
                ) : (
                  <TransmitSquare size={32} color={'#98A2B3'} />
                )}
                {data.rec_type === 1 ? 'تخصیص اعتبار' : 'آزاد سازی '}
              </p>
              <span
                className={`ms-2 py-[0.1rem] rounded-md px-2 text-[10px] font-light text-nowrap ${
                  data.wstatus === 0
                    ? 'bg-green-200 text-green-800'
                    : ' bg-yellow-200 text-yellow-800'
                  // : tstatus === '7'
                  // ? 'bg-yellow-200 text-yellow-800'
                  // : tstatus === '1'
                  // ? 'bg-blue-200 text-blue-800'
                  // : ['3', '2', '8', '87'].includes(`${tstatus}`) &&
                  //   'bg-red-200 text-red-800'
                }`}>
                {data.wstatus === 0 ? 'موفق' : 'در انتظار'}
              </span>
            </div>
            <p className='block text-xs text-zinc-600 font-light'>
              <span dir='ltr'>{data.regdate_pe}</span>
            </p>
          </div>
        </div>
      </button>

      <div className='flex gap-4  items-center justify-center'>
        <p className={`text-zinc-700 `}>
          <span dir='ltr' className={`font-medium `}>
            {setComma(data.amount)}
          </span>
          <small className={`ms-1`}>ریال</small>
        </p>
      </div>
    </div>
  )
}
export default TransactionRowItem
