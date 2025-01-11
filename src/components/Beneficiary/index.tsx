import { useState } from 'react'
import { Trash, Edit2, FolderAdd } from 'iconsax-react'
import AddModal from './AddModal'
import DeleteModal from './DeleteModal'
import { useMenu } from '@/Context/Menu'
import { useGroupData } from '@/Context/GroupsData'
import Image from 'next/image'

const Beneficiary: React.FC = () => {
  const { setMenu } = useMenu()
  const { groupData } = useGroupData()

  const [activeTab, setActiveTab] = useState<number>(
    groupData ? groupData[0].sup_group_id : 0
  )
  const [showAddModal, setShowAddModal] = useState<boolean | string>(false)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean | string>(
    false
  )
  const beneficiaries = []
  return (
    <>
      {showAddModal && (
        <AddModal
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
              ذی‌نفع‌های من
            </span>
          </p>
          {beneficiaries.length > 0 && (
            <button
              type='submit'
              onClick={() => setShowAddModal(true)}
              className='h-10 min-w-40 bg-[#7747C0] text-white rounded-lg hover:bg-purple-800'>
              + ذی‌ نفع جدید
            </button>
          )}
        </div>
        <div className='p-6 mt-5 bg-white rounded-lg border border-gray-200'>
          <div className='flex border-b'>
            {['همه', 'شخص', 'کسب و کار']?.map((tab, index) => (
              <button
                key={index}
                className={`px-5 py-3 transition-all duration-500 ${
                  activeTab === index
                    ? 'bg-[#E6DBFB80] border-b-2 border-[#704CB9] text-[#704CB9]'
                    : 'text-[#344054]'
                }`}
                onClick={() => setActiveTab(index)}>
                {tab}
              </button>
            ))}
          </div>
        </div>
        {beneficiaries.length > 0 ? (
          ''
        ) : (
          <div className='flex flex-col gap-2 justify-center items-center h-[60vh]'>
            <h1 className='text-2xl'>ذی‌ نفعی ندارید</h1>
            <Image
              src={'/icons/empty-box.svg'}
              width={444}
              height={333}
              alt=''
              className='w-[10%]'
            />
            <div className='border min-w-[40%] my-5'></div>
            <h1 className='text-2xl'>ایجاد ذی‌نفع جدید</h1>
            <div className='flex gap-4'>
              <button
                type='submit'
                onClick={() => setShowAddModal(true)}
                className='flex justify-center items-center h-10 min-w-40 text-[#7747C0] border border-[#7747C0] rounded-lg hover:bg-purple-100'>
                <FolderAdd size={20} color='#7747C0' />
                <p>بارگذاری اکسل</p>
              </button>
              <button
                type='submit'
                onClick={() => setShowAddModal(true)}
                className='h-10 min-w-40 bg-[#7747C0] text-white rounded-lg hover:bg-purple-800'>
                + ذی‌ نفع جدید
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Beneficiary
