import { BeneficiaryData } from '@/interfaces'
import { Receipt, Receipt2, Receipt21, ReceiptMinus } from 'iconsax-react'

const BeneficiaryCard: React.FC<{
  data: BeneficiaryData
  setDeleteItems: (value: string) => void
  showDeleteMode: boolean
}> = ({ data, setDeleteItems, showDeleteMode }) => {
  return (
    <div className='flex flex-col p-4 border rounded-lg shadow-sm bg-white cursor-pointer'>
      <div className='flex items-center gap-1'>
        {showDeleteMode && (
          <input
            type='checkbox'
            onChange={() => setDeleteItems(data.visitor_uid)}
            className='accent-[#8455D2]'
          />
        )}
        <p className=''>{data.visitor_name}</p>
        <ReceiptMinus size={24} color='#000' />
      </div>
      <p className='flex justify-between'>
        <span className='text-[#8455D2]'>تخصیص کل</span>
        {data.collectible_credit}
      </p>
      <p className='flex justify-between'>
        <span className='text-[#8455D2]'>آخرین تخصیص</span>
        {data.visitor_name}
      </p>
      <p className='flex justify-between'>
        <span className='text-[#8455D2]'>آزادسازی نشده</span>
        {data.Uncollectible_credit}
      </p>
    </div>
  )
}
export default BeneficiaryCard
