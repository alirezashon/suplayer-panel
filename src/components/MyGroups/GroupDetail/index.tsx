import React, { useState } from 'react'
import { Moneys, People } from 'iconsax-react'

interface RegionData {
  region: string
  allocatedBudget: string | null
  marketersCount: string
}

const subGroups: RegionData[] = [
  {
    region: 'منطقه ۸',
    allocatedBudget: '۳۰.۰۰۰ میلیون ریال',
    marketersCount: '۳۰',
  },
  {
    region: 'منطقه ۷',
    allocatedBudget: null,
    marketersCount: '۳۰',
  },
  {
    region: 'منطقه ۵',
    allocatedBudget: '۳۰.۰۰۰ میلیون ریال',
    marketersCount: '۳۰',
  },
]

const GroupsDetail: React.FC = () => {
  const [data, setData] = useState<RegionData[]>(subGroups)

  return (
    <div className='m-4'>
      <div className='flex justify-between items-center mb-7'>
        <p>
          <span className='text-[#98A2B3]'>تعاریف</span>/
          <span className='text-[#98A2B3]'>گروه‌های من</span>/
          <span className='text-[#7747C0]'>زیر گروه</span>
        </p>
      </div>

      <div className='p-6 bg-white rounded-lg border border-gray-200'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
          {data.map((product, index) => (
            <div
              key={index}
              className='flex flex-col justify-between items-start border rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300'>
              {/* Category Label */}
              <div className='flex items-center justify-between w-full mb-4'>
                <span className='text-sm bg-[#E1DCF8] text-[#6137A0] px-2 py-1 rounded'>
                  {product.region}
                </span>
              </div>
              <div className='flex my-5'>
                <Moneys size={24} color='#704CB9' />
                <p className='text-sm  px-2 py-1 rounded'>
                  {product.allocatedBudget ? (
                    <>
                      <span className='text-[#757575]'>تخصیص داده شده:</span>
                      {product.allocatedBudget}
                    </>
                  ) : (
                    '  هنوز اعتباری داده نشده'
                  )}
                </p>
              </div>
              <div className='flex my-5'>
                <People size={24} color='#704CB9' />
                <p className='text-sm  px-2 py-1 rounded'>
                  {product.marketersCount ? (
                    <>
                      <span className='text-[#757575]'>
                        تعداد بازاریاب‌ها :
                      </span>
                      {product.marketersCount}
                    </>
                  ) : (
                    '  بازاریابی   تعریف نشده است'
                  )}
                </p>
              </div>
              <button
                className={`w-full h-10  font-semibold rounded ${
                  !product.allocatedBudget
                    ? 'bg-purple-600 hover:bg-purple-700 text-white'
                    : 'border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white'
                } transition duration-300`}>
                {!product.allocatedBudget
                  ? 'تخصیص اعتبار  '
                  : 'مشاهده بازاریاب‌‌ها '}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default GroupsDetail
