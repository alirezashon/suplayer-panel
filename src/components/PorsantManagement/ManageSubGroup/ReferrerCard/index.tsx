import { CardProps } from '@/interfaces'
import { title } from 'process'

const ReferrerCard: React.FC<{
  data: CardProps
  setDeleteItems: (value: string) => void
  showDeleteMode: boolean
}> = ({ data, setDeleteItems, showDeleteMode }) => {
  return (
    <div className='flex flex-col p-4 border rounded-lg shadow-sm bg-white'>
      <div className='flex items-center gap-1'>
     {showDeleteMode &&  <input type='checkbox' onChange={()=>setDeleteItems(data.title)} className='accent-[#8455D2]' />}
        <p className=''>{data.title}</p>
      </div>
      <p className='flex justify-between'>
        <span className='text-[#8455D2]'>تخصیص کل</span>
        {data.allocation}
      </p>
      <p className='flex justify-between'>
        <span className='text-[#8455D2]'>آخرین تخصیص</span>
        {data.lastAllocation}
      </p>
      <p className='flex justify-between'>
        <span className='text-[#8455D2]'>آزادسازی نشده</span>
        {data.released}
      </p>
    </div>
  )
}
export default ReferrerCard
