import { setComma } from '@/hooks/NumberFormat'
import { BeneficiaryData } from '@/interfaces'
import { TransactionMinus } from 'iconsax-react'

const BeneficiaryCard: React.FC<{
  data: BeneficiaryData
  setDeleteItems: (value: string) => void
  showDeleteMode: boolean
  showReportModal: (value: BeneficiaryData | null) => void
}> = ({ data, setDeleteItems, showDeleteMode, showReportModal }) => {
  return (
    <div className='flex flex-col p-4 border rounded-lg shadow-sm bg-white cursor-pointer'>
      <div className='flex items-center justify-between gap-1'>
        {showDeleteMode && (
          <input
            type='checkbox'
            onChange={() => setDeleteItems(data.visitor_uid)}
            className='accent-[#8455D2]'
          />
        )}
        <p className=''>{data.visitor_full_name}</p>
        <TransactionMinus
          size={24}
          color='#000'
          onClick={() => showReportModal(data)}
        />
      </div>
      <p className='flex justify-between mt-5'>
        <span className='text-[#8455D2]'>تخصیص کل</span>
        {setComma(`${data.Uncollectible_credit}`)}
      </p>
      <p className='flex justify-between mt-3'>
        <span className='text-[#8455D2]'>آزادسازی نشده</span>
        {setComma(`${data.Uncollectible_credit - data.collectible_credit }`)}
      </p>
    </div>
  )
}
export default BeneficiaryCard
