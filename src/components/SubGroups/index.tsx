import { useState } from 'react'
import { Trash, Edit2 } from 'iconsax-react'
import AddModal from './AddModal'
import DeleteModal from './DeleteModal'
import { useMenu } from '@/Context/Menu'
import { useGroupData } from '@/Context/GroupsData'
import { useSubGroupData } from '@/Context/SubGroupsData'

const SubGroups: React.FC = () => {
  const { setMenu } = useMenu()
  const { groupData } = useGroupData()
  const { subGroupData } = useSubGroupData()
  const [activeTab, setActiveTab] = useState<number>(
    groupData ? groupData[0].sup_group_id : 0
  )
  const [showAddModal, setShowAddModal] = useState<boolean | string>(false)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean | string>(
    false
  )

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
          <div className='flex border-b'>
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
                      className='flex justify-between items-center p-4 bg-white rounded-lg border border-gray-200 shadow'>
                      <div className='text-gray-600'>
                        {subGroup.supervisor_name}
                      </div>
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
                  )
              )}
          </div>
        </div>
      </div>
    </>
  )
}

export default SubGroups
