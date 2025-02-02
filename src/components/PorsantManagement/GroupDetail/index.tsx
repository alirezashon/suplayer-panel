import { useEffect, useState } from 'react'
import { Moneys, People, ProfileCircle } from 'iconsax-react'
import { useMenu } from '@/Context/Menu'
import { useData } from '@/Context/Data'
import { SubGroup } from '@/interfaces'
import { useStates } from '@/Context/States'

const GroupsDetail = () => {
  const [data, setData] = useState<SubGroup[]>([])
  const { subGroupData } = useData()
  const { setMenu } = useMenu()
  const { setSelectedSubGroupData, selectedGroupData, setSelectedGroupData } =
    useStates()
  useEffect(() => {
    setData(
      subGroupData?.filter(
        (sub) =>
          sub.sup_group_id === parseInt(`${selectedGroupData?.sup_group_id}`)
      ) || []
    )
  }, [setData])
  return (
    <div className='m-4'>
      <div className='flex justify-between items-center mb-7'>
        <p>
          <span
            className='text-[#98A2B3] cursor-pointer'
            onClick={() => {
              setSelectedGroupData(null)
            }}>
            مدیریت پورسانت‌دهی
          </span>
          /
          <span className='text-[#7747C0]'>
            {selectedGroupData?.sup_group_name}
          </span>
        </p>
      </div>
      <div className='p-6 bg-white rounded-lg border border-gray-200'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
          {data.map((product, index) => (
            <div
              key={index}
              className='flex flex-col items-start border rounded-lg p-2 shadow-md hover:shadow-lg transition duration-300'>
              <div className='flex items-center justify-between w-full '>
                <span className='text-sm bg-[#E1DCF8] text-[#6137A0] px-2 py-1 rounded'>
                  {product.supervisor_name}
                </span>
              </div>
              <div className='flex mt-5'>
                <Moneys size={24} color='#704CB9' />
                <p className='text-sm  px-2 py-1 rounded'>
                  {product.assignment_amount ? (
                    <>
                      <span className='text-[#757575]'>تخصیص داده شده:</span>
                      {product.assignment_amount}
                    </>
                  ) : (
                    '  هنوز اعتباری داده نشده'
                  )}
                </p>
              </div>
              <div className='flex my-3'>
                <ProfileCircle size={24} color='#704CB9' />
                <p className='text-sm  px-2 py-1 rounded'>
                  <span className='text-[#757575]'>بازاریاب :</span>
                  {product.sup_group_id}
                </p>
              </div>
              <div className='flex mb-5 mt-1'>
                <People size={24} color='#704CB9' />
                <p className='text-sm  px-2 py-1 rounded'>
                  {product.visitor_count ? (
                    <>
                      <span className='text-[#757575]'>تعداد ذی‌ :</span>
                      {product.visitor_count}
                    </>
                  ) : (
                    'ذی‌نفعی‌ تعریف نشده است'
                  )}
                </p>
              </div>
              <button
                onClick={() => {
                  setMenu('porsantmanagement')
                  location.hash = 'porsantmanagement'
                  setSelectedSubGroupData(product)
                }}
                className={`w-full h-10  font-semibold rounded ${
                  !product.sup_group_name
                    ? 'bg-[#7747C0] hover:bg-[#7747C0] text-white'
                    : 'border border-[#7747C0] text-[#7747C0] hover:bg-[#7747C0] hover:text-white'
                } transition duration-300`}>
                {!product.sup_group_name
                  ? ' مدیریت پورسانت‌ دهی'
                  : 'افزودن ذی‌نفع به زیرگروه'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default GroupsDetail
