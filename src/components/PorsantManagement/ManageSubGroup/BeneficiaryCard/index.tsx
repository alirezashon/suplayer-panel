import { BeneficiaryData } from '@/interfaces'

const BeneficiaryCard: React.FC<{
  data: BeneficiaryData
  setDeleteItems: (value: string) => void
  showDeleteMode: boolean
}> = ({ data, setDeleteItems, showDeleteMode }) => {
  return (
    <div className='flex flex-col p-4 border rounded-lg shadow-sm bg-white'>
      <div className='flex items-center gap-1'>
        {showDeleteMode && (
          <input
            type='checkbox'
            onChange={() => setDeleteItems(data.visitor_uid)}
            className='accent-[#8455D2]'
          />
        )}
        <p className=''>{data.visitor_name}</p>
      </div>
      <p className='flex justify-between'>
        <span className='text-[#8455D2]'>تخصیص کل</span>
        {data.visitor_name}
      </p>
      <p className='flex justify-between'>
        <span className='text-[#8455D2]'>آخرین تخصیص</span>
        {data.visitor_name}
      </p>
      <p className='flex justify-between'>
        <span className='text-[#8455D2]'>آزادسازی نشده</span>
        {data.visitor_family}
      </p>
    </div>
  )
}
export default BeneficiaryCard
