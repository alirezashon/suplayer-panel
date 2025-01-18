import { useState } from 'react'
import { Edit2, People, ProfileCircle, Trash } from 'iconsax-react'
import { useMenu } from '@/Context/Menu'
import AddModal from './AddModal'
import DeleteModal from './DeleteModal'
import { useData } from '@/Context/Data'

const MyGroups: React.FC = () => {
  const { setMenu } = useMenu()
  const { groupData, setGroupData } = useData()
  const [showAddModal, setShowAddModal] = useState<null | string[]>(null)
  const [showDeleteModal, setShowDeleteModal] = useState<null | string[]>(null)

  return (
    <div className='m-4'>
      <div className='flex justify-between items-center mb-7'>
        <p className='cursor-pointer'>
          <span
            className='text-[#98A2B3]'
            onClick={() => {
              setMenu('groupmanagement')
              location.hash = 'groupmanagement'
            }}>
            تعاریف
          </span>
          /
          <span
            className='text-[#7747C0]'
            onClick={() => {
              setMenu('groupgroups')
              location.hash = 'groupgroups'
            }}>
            گروه‌های من
          </span>
        </p>
        <button
          type='submit'
          onClick={() => setShowAddModal([])}
          className='h-10 min-w-40 bg-[#7747C0] text-white rounded-lg hover:bg-purple-800'>
          + گروه جدید
        </button>
      </div>
      {showAddModal && (
        <AddModal
          existName={showAddModal[0]}
          sup_group_code={showAddModal[1]}
          close={setShowAddModal}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          sup_group_code={showDeleteModal[1]}
          name={`${showDeleteModal[0]}`}
          close={setShowDeleteModal}
        />
      )}
      <div className='p-6 bg-white rounded-lg border border-gray-200'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
          {groupData &&
            groupData?.length > 0 &&
            groupData?.map((group, index) => (
              <div
                key={index}
                className='flex flex-col justify-between items-start border rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300'>
                {/* Category Label */}
                <div className='flex items-center justify-between w-full mb-4'>
                  <span className='text-sm bg-[#E1DCF8] text-[#6137A0] px-2 py-1 rounded'>
                    {group.sup_group_name}
                  </span>
                  <div className='flex gap-2'>
                    <Edit2
                      size={20}
                      color='#8455D2'
                      cursor={'pointer'}
                      onClick={() =>
                        setShowAddModal([
                          group.sup_group_name,
                          group.sup_group_code,
                        ])
                      }
                    />
                    <Trash
                      size={20}
                      color='#D42620'
                      cursor={'pointer'}
                      onClick={() => {
                        setShowDeleteModal([
                          group.sup_group_name,
                          group.sup_group_code,
                        ])
                      }}
                    />
                  </div>
                </div>
                <div className='flex'>
                  <ProfileCircle size={24} color='#704CB9' />
                  <p className='text-sm  px-2 py-1 rounded'>
                    {group.visors_count > 0 ? (
                      <>
                        <span className='text-[#757575]'>تعداد بازاریاب:</span>
                        {group.visors_count}
                      </>
                    ) : (
                      'بازاریابی تعریف نشده است'
                    )}
                  </p>
                </div>
                <div className='flex my-5'>
                  <People size={24} color='#704CB9' />
                  <p className='text-sm  px-2 py-1 rounded'>
                    {group.supervisors_count > 0 ? (
                      <>
                        <span className='text-[#757575]'>
                          تعداد زیر‌گروه‌ها:
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
                    location.hash = 'subgroups'
                    setMenu('subgroups')
                  }}
                  className={`w-full h-10  font-semibold rounded ${
                    group.sup_group_code.length === 0
                      ? 'bg-[#7747C0] hover:bg-[#7747C0] text-white'
                      : 'border border-[#7747C0] text-[#7747C0] hover:bg-[#7747C0] hover:text-white'
                  } transition duration-300`}>
                  {group.sup_group_code.length > 0
                    ? 'مشاهده زیر گروه‌ها'
                    : 'تعریف زیر گروه'}
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default MyGroups
