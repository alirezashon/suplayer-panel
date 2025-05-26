import { useEffect, useState } from 'react'
import { Trash, Edit2, People, ProfileCircle } from 'iconsax-react'
import AddModal from './AddModal'
import DeleteModal from './DeleteModal'
import { useMenu } from '@/Context/Menu'
import { useData } from '@/Context/Data'
import Image from 'next/image'
import { SubGroup } from '@/interfaces'
import AppointmentModal from './Appointment'
import { useStates } from '@/Context/States'
const SubGroups: React.FC = () => {
  const { setMenu } = useMenu()
  const { groupData, subGroupData } = useData()
  const { selectedGroupData, permissions } = useStates()
  const [activeTab, setActiveTab] = useState<number>(
    selectedGroupData?.sup_group_id as number
  )
  const [showAddModal, setShowAddModal] = useState<boolean | string>(false)
  const [showAppointmentModal, setShowAppointmenModal] = useState<
    boolean | { data: SubGroup; type: 0 | 1 }
  >(false)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean | string>(
    false
  )
  useEffect(() => {
    if (!selectedGroupData && groupData && groupData.length > 0) {
      setActiveTab(groupData[0].sup_group_id)
    }
  }, [groupData, selectedGroupData])
  return (
    <>
      {showAddModal && (
        <AddModal
          groupId={activeTab}
          existName={typeof showAddModal === 'string' ? showAddModal : ''}
          close={() => setShowAddModal(false)}
        />
      )}
      {typeof showAppointmentModal === 'object' && (
        <AppointmentModal
          data={showAppointmentModal?.data}
          type={showAppointmentModal?.type}
          close={() => setShowAppointmenModal(false)}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          name={`${showDeleteModal}`}
          close={() => setShowDeleteModal(false)}
          groupId={activeTab}
        />
      )}
      {permissions[1].includes('740') && (
        <div className='flex flex-col p-2'>
          <div className='flex justify-between items-center'>
            <p className='cursor-pointer'>
              <span
                className='text-[#98A2B3]'
                onClick={() => {
                  setMenu('mygroups')
                  location.hash = 'mygroups'
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
            {permissions[1].includes('700') && (
              <button
                type='submit'
                onClick={() => setShowAddModal(true)}
                className='h-10 min-w-40 bg-[#7747C0] text-white rounded-lg hover:bg-purple-800'>
                + زیرگروه جدید
              </button>
            )}
          </div>
          <div className='p-6 mt-5 bg-white rounded-lg border border-gray-200'>
            <div
              className=' flex border-b overflow-x-auto'
              style={{ scrollbarWidth: 'none' }}>
              {Array.isArray(groupData) &&
                groupData?.map((tab, index) => (
                  <button
                    key={index}
                    className={`px-5 py-3 transition-all duration-500 text-nowrap ${
                      activeTab === tab.sup_group_id
                        ? 'bg-[#E6DBFB80] border-b-2 border-[#704CB9] text-[#704CB9]'
                        : 'text-[#344054]'
                    }`}
                    onClick={() => setActiveTab(tab.sup_group_id)}>
                    {tab.sup_group_name}
                  </button>
                ))}
            </div>
            {Array.isArray(subGroupData) && subGroupData.length > 0 ? (
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
                {subGroupData?.map(
                  (subGroup, subIndex) =>
                    subGroup.sup_group_id === activeTab && (
                      <div
                        key={subIndex}
                        className='flex flex-col justify-between items-start border rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300'>
                        <div className='flex items-center justify-between w-full mb-4'>
                          <span className='text-sm bg-[#E1DCF8] text-[#6137A0] px-2 py-1 rounded'>
                            {subGroup.supervisor_name}
                          </span>
                          {permissions[1].includes('699') && (
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
                          )}
                        </div>
                        <div className='flex'>
                          <ProfileCircle size={24} color='#704CB9' />
                          <p className='text-sm  px-2 py-1 rounded'>
                            {subGroup.personnel_count > 0 ? (
                              <>
                                <span className='text-[#757575]'>
                                  تعداد بازاریاب:
                                </span>
                                {subGroup.personnel_count}
                              </>
                            ) : (
                              'بازاریابی تعریف نشده است'
                            )}
                          </p>
                        </div>
                        <div className='flex my-5'>
                          <People size={24} color='#704CB9' />
                          <p className='text-sm  px-2 py-1 rounded'>
                            {subGroup.visitor_count > 0 ? (
                              <>
                                <span className='text-[#757575]'>
                                  تعداد ذی‌نفع:
                                </span>
                                {subGroup.visitor_count}
                              </>
                            ) : (
                              'ذی‌نفع تعریف نشده است'
                            )}
                          </p>
                        </div>
                        {subGroup.visitor_count > 1 &&
                        subGroup.personnel_count > 1 ? (
                          <button
                            onClick={() => setShowAddModal(true)}
                            className='h-10 w-full border-button  rounded-md hover:bg-purple-800'>
                            مشاهده جزئیات
                          </button>
                        ) : (
                          <div className='flex w-full gap-3'>
                            {permissions[1].includes('698') &&
                              subGroup?.visitor_count < 1 && (
                                <button
                                  onClick={() =>
                                    setShowAppointmenModal({
                                      data: subGroup,
                                      type: 0,
                                    })
                                  }
                                  className='h-10 w-full fill-button  rounded-md hover:bg-purple-800'>
                                  انتصاب ذی‌نفع
                                </button>
                              )}
                            {permissions[1].includes('697') &&
                              subGroup.personnel_count < 1 && (
                                <button
                                  onClick={() =>
                                    setShowAppointmenModal({
                                      data: subGroup,
                                      type: 1,
                                    })
                                  }
                                  className='h-10 w-full border-button  rounded-md hover:bg-purple-100'>
                                  انتصاب بازاریاب
                                </button>
                              )}
                          </div>
                        )}
                      </div>
                    )
                )}
              </div>
            ) : (
              <div className='w-full flex flex-col gap-2 justify-center items-center'>
                <h1 className='text-2xl'>زیر گروهی ندارید</h1>
                <Image
                  src={'/icons/empty-box.svg'}
                  width={444}
                  height={333}
                  alt=''
                  className='w-[10%]'
                />
                <div className='border min-w-[40%] my-5'></div>
                <h1 className='text-2xl'> تعریف زیر گروه</h1>
                {permissions[1].includes('700') && (
                  <button
                    type='submit'
                    onClick={() => setShowAddModal(true)}
                    className='h-10 min-w-40 bg-[#7747C0] text-white rounded-lg hover:bg-purple-800'>
                    + زیر گروه جدید
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
export default SubGroups
