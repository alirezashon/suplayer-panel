import { CardProps } from '@/interfaces'

const ReferrerCard: React.FC<CardProps> = ({
  title,
  allocation,
  lastAllocation,
  released,
}) => {
  return (
    <div className='flex flex-col p-4 border rounded-lg shadow-sm bg-white'>
      <div className='flex items-center gap-1'>
        <input type='checkbox' className='accent-[#8455D2]' /> <p className=''>{title}</p>
      </div>
      <p className='flex justify-between'>
        <span className='text-[#8455D2]'>تخصیص کل</span>
        {allocation}
      </p>
      <p className='flex justify-between'>
        <span className='text-[#8455D2]'>آخرین تخصیص</span>
        {lastAllocation}
      </p>
      <p className='flex justify-between'>
        <span className='text-[#8455D2]'>آزادسازی نشده</span>
        {released}
      </p>
    </div>
  )
}
export default ReferrerCard
