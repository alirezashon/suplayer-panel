import { ArrowLeft2, Profile2User } from 'iconsax-react'
import React from 'react'

const Dashboard = () => {
  return (
    <div className='flex '>
      <div className='rounded-lg border w-full flex flex-col gap-7'>
        <div className='flex justify-between'>
          <p>گروه‌های من</p>
          <Profile2User color='#666bc9ff' size={24}/>
        </div>
        <div className="flex justify-between">
            <h2>14</h2>
        <div className="flex text-[#7747C0]">
            <p>مشاهده بیشتر</p>
            <ArrowLeft2 size={24} color='#7747C0'/>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
