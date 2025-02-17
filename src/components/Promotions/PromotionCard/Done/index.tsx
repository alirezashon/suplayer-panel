import { useMenu } from '@/Context/Menu'
import { useStates } from '@/Context/States'
import { PromotionInterface } from '@/interfaces'
import { Eye, MouseCircle, Personalcard } from 'iconsax-react'

const Done = ({ promotion }: { promotion: PromotionInterface }) => {
  const { setMenu } = useMenu()
  const { setSelectedPromotionData } = useStates()
  return (
    <div
      onClick={() => {
        setMenu('promotion-view')
        location.hash = 'promotion-view'
        setSelectedPromotionData(promotion)
      }}
      className='bg-white rounded-lg shadow border-2 border-[#A1E3CB] p-4 relative cursor-pointer'>
      <div className='flex justify-between items-center'>
        <div className='flex gap-2'>
          <span
            className={`text-xs px-2 py-1 rounded bg-[#E6DBFB80] text-[#704CB9]`}>
            {promotion.ctitle}
          </span>
        </div>
      </div>
      <div className='my-4 px-1 flex justify-between '>
        <div className='flex gap-1 '>
          <Personalcard size={24} color='#7747C0' />
          <p className='text-gray-600 mb-2'> شعار</p>
        </div>
        <p>{promotion.ctitle}</p>
      </div>

      <div className='my-4 px-1 flex justify-between '>
        <div className='flex gap-1 '>
          <Eye size={24} color='#7747C0' />
          <p className='text-gray-600 mb-2'> تعداد بازدید</p>
        </div>
        <p>{promotion.file_uid}</p>
      </div>
      <div className='my-4 px-1 flex justify-between '>
        <div className='flex gap-1 '>
          <MouseCircle size={24} color='#7747C0' />
          <p className='text-gray-600 mb-2'> تعداد کلیک</p>
        </div>
        <p>{promotion.exp_date}</p>
      </div>
    </div>
  )
}

export default Done
