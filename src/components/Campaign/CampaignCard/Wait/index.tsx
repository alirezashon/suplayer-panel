import { CampaignInterface } from '@/interfaces'
import { Calendar, Edit2, Moneys, Trash } from 'iconsax-react'
import React from 'react'

const Wait = ({
  campaign,
  enableEdit,
  deleteIt,
}: {
  campaign: CampaignInterface
  enableEdit: (data: CampaignInterface) => void
  deleteIt: (data: CampaignInterface) => void
}) => {
  return (
    <div className='bg-white rounded-lg shadow border-2 border-[#FFCA5E] p-4 relative cursor-pointer'>
      <div className='flex justify-between items-center'>
        <div className='flex gap-2'>
          <span
            className={`text-xs px-2 py-1 rounded bg-[#E6DBFB80] text-[#704CB9]`}>
            {campaign.ctitle}
          </span>
        </div>
        <div className='flex gap-2'>
          <Edit2
            size={20}
            color='#8455D2'
            cursor={'pointer'}
            onClick={() => enableEdit(campaign)}
          />
          <Trash
            size={20}
            color='#D42620'
            cursor={'pointer'}
            onClick={() => {
              deleteIt(campaign)
            }}
          />
        </div>
      </div>
      <div className='my-4 px-1 flex justify-between '>
        <div className='flex gap-1 '>
          <Calendar size={24} color='#7747C0' />
          <p className='text-gray-600 mb-2'> تاریخ شروع</p>
        </div>
        <p>{campaign.start_date}</p>
      </div>

      <div className='my-4 px-1 flex justify-between '>
        <div className='flex gap-1 '>
          <Calendar size={24} color='#7747C0' />
          <p className='text-gray-600 mb-2'> تاریخ پایان</p>
        </div>
        <p>{campaign.exp_date}</p>
      </div>
      <div className='my-4 px-1 flex justify-between '>
        <div className='flex gap-1 '>
          <Moneys size={24} color='#7747C0' />
          <p className='text-gray-600 mb-2'> بودجه</p>
        </div>
        <p>{campaign.budget}</p>
      </div>

      <button className='bg-[#7747C0] text-white w-full h-10 rounded-lg'>
        فعالسازی
      </button>
    </div>
  )
}

export default Wait
