import { useEffect, useState } from 'react'
import { Trash, Edit2, People, ProfileCircle } from 'iconsax-react'
import AddModal from './AddModal'
import DeleteModal from './DeleteModal'
import { useMenu } from '@/Context/Menu'
import { useData } from '@/Context/Data'
const SubGroups: React.FC = () => {
  const { setMenu } = useMenu()
  const { groupData, subGroupData } = useData()
  const [activeTab, setActiveTab] = useState<number>(0)
  const [showAddModal, setShowAddModal] = useState<boolean | string>(false)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean | string>(
    false
  )
  useEffect(() => {
    if (groupData && groupData.length > 0) {
      setActiveTab(groupData[0].sup_group_id)
    }
  }, [groupData])
  return (
    <>
      {showAddModal && (
        <AddModal
          groupId={activeTab}
          existName={typeof showAddModal === 'string' ? showAddModal : ''}
          close={setShowAddModal}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          name={`${showDeleteModal}`}
          close={setShowDeleteModal}
          groupId={activeTab}
        />
      )}
      <div className='flex flex-col p-2'>
        <div className='flex justify-between items-center'>
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
                setMenu('subgroups')
                location.hash = 'subgroups'
              }}>
              زیرگروه
            </span>
          </p>
          <button
            type='submit'
            onClick={() => setShowAddModal(true)}
            className='h-10 min-w-40 bg-[#7747C0] text-white rounded-lg hover:bg-purple-800'>
            + زیرگروه جدید
          </button>
        </div>
        <div className='p-6 mt-5 bg-white rounded-lg border border-gray-200'>
          <div
            className='max-w-[67%] flex border-b overflow-x-auto'
            style={{ scrollbarWidth: 'none' }}>
            {groupData?.map((tab, index) => (
              <button
                key={index}
                className={`px-5 py-3 transition-all duration-500 ${
                  activeTab === tab.sup_group_id
                    ? 'bg-[#E6DBFB80] border-b-2 border-[#704CB9] text-[#704CB9]'
                    : 'text-[#344054]'
                }`}
                onClick={() => setActiveTab(tab.sup_group_id)}>
                {tab.sup_group_name}
              </button>
            ))}
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6'>
            {subGroupData &&
              subGroupData?.map(
                (subGroup, subIndex) =>
                  subGroup.sup_group_id === activeTab && (
                    <div
                      key={subIndex}
                      className='flex flex-col justify-between items-start border rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300'>
                      <div className='flex items-center justify-between w-full mb-4'>
                        <span className='text-sm bg-[#E1DCF8] text-[#6137A0] px-2 py-1 rounded'>
                          {subGroup.supervisor_name}
                        </span>
                        <div className='flex gap-2'>
                          <Edit2
                            size={18}
                            color='#8455D2'
                            className='cursor-pointer'
                            onClick={() =>
                              setShowAddModal(
                                subGroup.supervisor_name +
                                  '#$%^@!~' +
                                  subGroup.supervisor_code
                              )
                            }
                          />
                          <Trash
                            size={18}
                            color='#D42620'
                            className='cursor-pointer'
                            onClick={() =>
                              setShowDeleteModal(
                                subGroup.supervisor_name +
                                  '#$%^@!~' +
                                  subGroup.supervisor_code
                              )
                            }
                          />
                        </div>
                      </div>
                      <div className='flex'>
                        <ProfileCircle size={24} color='#704CB9' />
                        <p className='text-sm  px-2 py-1 rounded'>
                          {subGroup.sup_group_id > 0 ? (
                            <>
                              <span className='text-[#757575]'>
                                تعداد بازاریاب:
                              </span>
                              {subGroup.sup_group_id}
                            </>
                          ) : (
                            'بازاریابی تعریف نشده است'
                          )}
                        </p>
                      </div>
                      <div className='flex my-5'>
                        <People size={24} color='#704CB9' />
                        <p className='text-sm  px-2 py-1 rounded'>
                          {subGroup.sup_group_id > 0 ? (
                            <>
                              <span className='text-[#757575]'>
                                تعداد زیر‌گروه‌ها:
                              </span>
                              {subGroup.sup_group_name}
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
                          subGroup.sup_group_name.length === 0
                            ? 'bg-[#7747C0] hover:bg-[#7747C0] text-white'
                            : 'border border-[#7747C0] text-[#7747C0] hover:bg-[#7747C0] hover:text-white'
                        } transition duration-300`}>
                        {subGroup.sup_group_name.length > 0
                          ? 'مشاهده زیر گروه‌ها'
                          : 'تعریف زیر گروه'}
                      </button>
                    </div>
                  )
              )}
          </div>
        </div>
      </div>
    </>
  )
}
export default SubGroups