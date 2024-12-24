import React, { useState } from 'react'
import { Trash, Edit2 } from 'iconsax-react'
import AddModal from './AddModal'
import DeleteModal from './DeleteModal'

interface SubGroup {
  name: string
}

interface TabData {
  title: string
  subGroups: SubGroup[]
}

const tabData: TabData[] = [
  {
    title: 'تهران شرق',
    subGroups: [
      { name: 'منطقه ۲' },
      { name: 'منطقه 4  ' },
      { name: 'منطقه 13' },
      { name: 'منطقه ۷' },
    ],
  },
  {
    title: 'تهران غرب',
    subGroups: [
      { name: 'منطقه 8' },
      { name: 'منطقه ۲' },
      { name: 'منطقه 22' },
      { name: 'منطقه ۷' },
    ],
  },
  {
    title: 'دکترهای پوست',
    subGroups: [
      { name: 'منطقه 9' },
      { name: 'منطقه 23' },
      { name: 'منطقه ۲' },
      { name: 'منطقه ۷' },
    ],
  },
  {
    title: 'خدمات زیبایی و درمان',
    subGroups: [
      { name: 'منطقه ۲' },
      { name: 'منطقه 4' },
      { name: 'منطقه 24' },
      { name: 'منطقه ۷' },
    ],
  },
]

const SubGroups: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0)
  const [showAddModal, setShowAddModal] = useState<boolean | string>(false)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean | string>(
    false
  )
  return (
    <>
      {showAddModal && (
        <AddModal
          existName={typeof showAddModal === 'string' ? showAddModal : ''}
          close={setShowAddModal}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          name={`${showAddModal}`}
          close={setShowDeleteModal}
          isActive
        />
      )}
      <div className='flex flex-col p-2'>
        <div className='flex justify-between items-center'>
          <p>
            <span className='text-[#98A2B3]'>تعاریف</span>/
            <span className='text-[#7747C0]'>زیرگروه</span>
          </p>
          <button
            type='submit'
            onClick={() => setShowAddModal(true)}
            className='h-10 min-w-40 bg-purple-700 text-white rounded-lg hover:bg-purple-800'>
            + زیرگروه جدید
          </button>
        </div>
        <div className='p-6 mt-5 bg-white rounded-lg border border-gray-200'>
          <div className='flex border-b'>
            {tabData.map((tab, index) => (
              <button
                key={index}
                className={`px-5 py-3 transition-all duration-500 ${
                  activeTab === index
                    ? 'bg-[#E6DBFB80] border-b-2 border-[#704CB9] text-[#704CB9]'
                    : 'text-[#344054]'
                }`}
                onClick={() => setActiveTab(index)}>
                {tab.title}
              </button>
            ))}
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6'>
            {tabData[activeTab].subGroups.map((subGroup, subIndex) => (
              <div
                key={subIndex}
                className='flex justify-between items-center p-4 bg-white rounded-lg border border-gray-200 shadow'>
                <div className='text-gray-600'>{subGroup.name}</div>
                <div className='flex gap-2'>
                  <Edit2
                    size={18}
                    color='#8455D2'
                    className='cursor-pointer'
                    onClick={() => setShowAddModal(subGroup.name)}
                  />
                  <Trash
                    size={18}
                    color='#D42620'
                    className='cursor-pointer'
                    onClick={() => setShowDeleteModal(subGroup.name)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default SubGroups
