import { PromotionInterface } from '@/interfaces'
import {
  Edit2,
  Eye,
  MouseCircle,
  Personalcard,
  Timer,
  Trash,
} from 'iconsax-react'
import React from 'react'

const Progress = ({ promotion }: { promotion: PromotionInterface }) => {
  return (
    <div className='bg-white rounded-lg shadow border-2 border-[#B09CE9] p-4 relative cursor-pointer'>
      <div className='flex justify-between items-center'>
        <div className='flex gap-2'>
          <span
            className={`text-xs px-2 py-1 rounded bg-[#E6DBFB80] text-[#704CB9]`}>
            {promotion.selectedDoctorGroup}
          </span>
        </div>
        <div className='flex gap-2'>
          <div className='flex items-center gap-1'>
            <span className='text-sm font-medium text-zinc-950'>
              {promotion.endDate}
            </span>
            <Timer size={22} color='#704CB9' />
          </div>
        </div>
      </div>

      <div className='my-4 px-1 flex justify-between '>
        <div className='flex gap-1 '>
          <Personalcard size={24} color='#7747C0' />
          <p className='text-gray-600 mb-2'> شعار</p>
        </div>
        <p>{promotion.brandSlogan}</p>
      </div>

      <div className='my-4 px-1 flex justify-between '>
        <div className='flex gap-1 '>
          <Eye size={24} color='#7747C0' />
          <p className='text-gray-600 mb-2'> تعداد بازدید</p>
        </div>
        <p>{promotion.viewCount}</p>
      </div>
      <div className='my-4 px-1 flex justify-between '>
        <div className='flex gap-1 '>
          <MouseCircle size={24} color='#7747C0' />
          <p className='text-gray-600 mb-2'> تعداد کلیک</p>
        </div>
        <p>{promotion.clickedCount}</p>
      </div>
    </div>
  )
}

export default Progress
