import { CampaignInterface } from '@/interfaces'
import {
  Calendar,
  Eye,
  Moneys,
  MouseCircle,
  Personalcard,
  Trash,
} from 'iconsax-react'
import React from 'react'

const Done = ({ campaign }: { campaign: CampaignInterface }) => {
  return (
    <div className='bg-white rounded-lg shadow border-2 border-[#A1E3CB] p-4 relative cursor-pointer'>
      <div className='flex justify-between items-center'>
        <div className='flex gap-2'>
          <span
            className={`text-xs px-2 py-1 rounded bg-[#E6DBFB80] text-[#704CB9]`}>
            {campaign.name}
          </span>
        </div>
      </div>

      <div className='my-4 px-1 flex justify-between '>
        <div className='flex gap-1 '>
          <Calendar size={24} color='#7747C0' />
          <p className='text-gray-600 mb-2'> تاریخ شروع</p>
        </div>
        <p>{campaign.startDate}</p>
      </div>

      <div className='my-4 px-1 flex justify-between '>
        <div className='flex gap-1 '>
          <Calendar size={24} color='#7747C0' />
          <p className='text-gray-600 mb-2'> تاریخ پایان</p>
        </div>
        <p>{campaign.endDate}</p>
      </div>
      <div className='my-4 px-1 flex justify-between '>
        <div className='flex gap-1 '>
          <Moneys size={24} color='#7747C0' />
          <p className='text-gray-600 mb-2'> بودجه</p>
        </div>
        <p>{campaign.budget}</p>
      </div>
    </div>
  )
}

export default Done
