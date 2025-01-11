import { useState } from 'react'
import { People, ProfileCircle } from 'iconsax-react'
import { GroupData } from '@/interfaces'
import { useMenu } from '@/Context/Menu'
import GroupsDetail from '../GroupDetail'
import { useGroupData } from '@/Context/GroupsData'

const ShowGroups: React.FC = () => {
  const { setMenu } = useMenu()
  const [showGroup, setSshowGroup] = useState<string>('')
  const { groupData, setGroupData } = useGroupData()

  return (
    <>
      {!showGroup ? (
        <div className='m-4'>
          <div className='flex justify-between items-center mb-7'>
            <p className='cursor-pointer'>
              <span
                className='text-[#98A2B3]'
                onClick={() => {
                  setMenu('groupmanagement')
                  location.hash = 'groupmanagement'
                }}>
                مدیریت پورسانت‌ دهی
              </span>
            </p>
          </div>
        

          <div className='p-6 bg-white rounded-lg border border-gray-200'>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
              {groupData &&
                groupData.map((product, index) => (
                  <div
                    key={index}
                    className='flex flex-col justify-between items-start border rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300'>
                    {/* Category Label */}
                    <div className='flex items-center justify-between w-full mb-4'>
                      <span className='text-sm bg-[#E1DCF8] text-[#6137A0] px-2 py-1 rounded'>
                        {product.sup_group_name}
                      </span>
                    </div>
                    <div className='flex'>
                      <ProfileCircle size={24} color='#704CB9' />
                      <p className='text-sm  px-2 py-1 rounded'>
                        {Number(`${'product.referrers'}`) > 0 ? (
                          <>
                            <span className='text-[#757575]'>
                              تعداد بازاریاب:
                            </span>
                            {'product.referrers'}
                          </>
                        ) : (
                          'بازاریابی تعریف نشده است'
                        )}
                      </p>
                    </div>
                    <div className='flex my-5'>
                      <People size={24} color='#704CB9' />
                      <p className='text-sm  px-2 py-1 rounded'>
                        {product.supervisors_count > 0 ? (
                          <>
                            <span className='text-[#757575]'>
                              تعداد زیر‌گروه‌ها:
                            </span>
                            {product.supervisors_count}
                          </>
                        ) : (
                          ' زیر گروهی تعریف نشده است'
                        )}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        location.hash =
                          product.sup_group_code.length > 0
                            ? 'groupsdetail'
                            : 'subgroups'
                        setMenu(
                          product.sup_group_code.length > 0
                            ? 'groupsdetail'
                            : 'subgroups'
                        )
                      }}
                      className={`w-full h-10  font-semibold rounded ${
                        product.sup_group_code.length === 0
                          ? 'bg-purple-600 hover:bg-[#7747C0] text-white'
                          : 'border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white'
                      } transition duration-300`}>
                      {product.sup_group_code.length > 0
                        ? 'مشاهده زیر گروه‌ها'
                        : 'تعریف زیر گروه'}
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      ) : (
        <GroupsDetail name={showGroup} />
      )}
    </>
  )
}

export default ShowGroups
