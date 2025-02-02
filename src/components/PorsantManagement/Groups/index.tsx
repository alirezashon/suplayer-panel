import { useState } from 'react'
import { People, ProfileCircle } from 'iconsax-react'
import GroupsDetail from '../GroupDetail'
import { useData } from '@/Context/Data'
import AddSubGroup from '../../SubGroups/AddModal'
import { useStates } from '@/Context/States'
const ShowGroups: React.FC = () => {
  const { groupData } = useData()
  const [addSubGroup, setAddSubGroup] = useState<number | null>()
  const { selectedGroupData, setSelectedGroupData } = useStates()
  return (
    <>
      {!selectedGroupData ? (
        <div className='m-4'>
          <div className='flex justify-between items-center mb-7'>
            <p className='cursor-pointer'>
              <span className='text-[#98A2B3]'>مدیریت پورسانت‌ دهی</span>
            </p>
          </div>
          {addSubGroup && (
            <AddSubGroup
              groupId={addSubGroup}
              close={() => setAddSubGroup(null)}
            />
          )}
          <div className='p-6 bg-white rounded-lg border border-gray-200'>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
              {groupData &&
                groupData.map((group, index) => (
                  <div
                    key={index}
                    className='flex flex-col justify-between items-start border rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300'>
                    {/* Category Label */}
                    <div className='flex items-center justify-between w-full mb-4'>
                      <span className='text-sm bg-[#E1DCF8] text-[#6137A0] px-2 py-1 rounded'>
                        {group.sup_group_name}
                      </span>
                    </div>
                    <div className='flex'>
                      <ProfileCircle size={24} color='#704CB9' />
                      <p className='text-sm  px-2 py-1 rounded'>
                        {group?.visors_count ? (
                          <>
                            <span className='text-[#757575]'>تعداد ذی‌نفع</span>
                            {group.visors_count}
                          </>
                        ) : (
                          ' ذی‌نفعی تعریف نشده است'
                        )}
                      </p>
                    </div>
                    <div className='flex my-5'>
                      <People size={24} color='#704CB9' />
                      <p className='text-sm  px-2 py-1 rounded'>
                        {group.supervisors_count > 0 ? (
                          <>
                            <span className='text-[#757575]'>
                              تعداد زیر‌گروه‌ها
                            </span>
                            {group.supervisors_count}
                          </>
                        ) : (
                          ' زیر گروهی تعریف نشده است'
                        )}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        group.supervisors_count > 0
                          ? setSelectedGroupData(group)
                          : setAddSubGroup(group.sup_group_id)
                      }}
                      className={`w-full h-10  font-semibold rounded ${
                        group.supervisors_count === 0
                          ? 'bg-[#7747C0] hover:bg-[#7747C0] text-white'
                          : 'border border-[#7747C0] text-[#7747C0] hover:bg-[#7747C0] hover:text-white'
                      } transition duration-300`}>
                      {group.supervisors_count > 0
                        ? 'مشاهده زیر گروه‌ها'
                        : 'تعریف زیر گروه'}
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      ) : (
        <GroupsDetail />
      )}
    </>
  )
}

export default ShowGroups
