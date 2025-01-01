import  { useState } from 'react'
import { Edit2, Trash } from 'iconsax-react'
import AddModal from './AddModal'
import DeleteModal from './DeleteModal'
import { GroupData } from '@/interfaces'
import Image from 'next/image'
import { useMenu } from '@/Context/Menu'

const groupsData: GroupData[] = [
  {
    title: 'تهران شرق',
    subGroups: [
      { name: 'زیر گروه اول' },
      { name: 'زیر گروه دوم' },
      { name: 'زیر گروه سوم' },
      { name: 'زیر گروه چهارم' },
    ],
  },
  {
    title: ' تهران شرق',
    subGroups: [
      { name: 'زیر گروه اول' },
      { name: 'زیر گروه دوم' },
      { name: 'زیر گروه سوم' },
      { name: 'زیر گروه چهارم' },
    ],
  },
  {
    title: 'تهران غرب',
    subGroups: [
      { name: 'زیر گروه اول' },
      { name: 'زیر گروه دوم' },
      { name: 'زیر گروه سوم' },
      { name: 'زیر گروه چهارم' },
    ],
  },
  {
    title: 'دکترهای پوست',
    subGroups: [
      { name: 'زیر گروه اول' },
      { name: 'زیر گروه دوم' },
      { name: 'زیر گروه سوم' },
      { name: 'زیر گروه چهارم' },
    ],
  },
]

const Groups: React.FC = () => {
  const [data, setData] = useState<GroupData[]>(groupsData)
  const [showAddModal, setShowAddModal] = useState<boolean | string>(false)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean | string>(
    false
  )
  const { setMenu } = useMenu()

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
                setMenu('groupmanagement')
                location.hash = 'groupmanagement'
              }}>
              گروه
            </span>
          </p>
          <button
            type='submit'
            onClick={() => setShowAddModal(true)}
            className='h-10 min-w-40 bg-purple-700 text-white rounded-lg hover:bg-purple-800'>
            + گروه جدید
          </button>
        </div>
        {data.length > 0 ? (
          <div className=' mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-white rounded-lg border border-gray-200'>
            {data.map((group, groupIndex) => (
              <div
                key={groupIndex}
                className='flex flex-col p-4 bg-white rounded-lg border border-gray-200'>
                <div className='flex justify-between items-center mb-4'>
                  <div className='px-3 py-1.5 text-xs text-purple-800 bg-violet-200 rounded-lg'>
                    {group.title}
                  </div>
                  <div className='flex gap-2 items-center'>
                    <Edit2
                      size={20}
                      color='#8455D2'
                      cursor={'pointer'}
                      onClick={() => setShowAddModal(group.title)}
                    />
                    <Trash
                      size={20}
                      color='#D42620'
                      cursor={'pointer'}
                      onClick={() => {
                        setData((prv) =>
                          prv.filter((gp) => gp.title !== group.title)
                        )
                        setShowDeleteModal(group.title)
                      }}
                    />
                  </div>
                </div>

                {/* SubGroups */}
                <div>
                  <div className='text-xs text-right text-zinc-900 mb-2'>
                    زیر گروه‌ها
                  </div>
                  <div className='flex gap-2 text-xs text-yellow-600'>
                    {group.subGroups.map((subGroup, subGroupIndex) => (
                      <div
                        key={subGroupIndex}
                        className='px-2 py-0.5 bg-amber-100 rounded'>
                        {subGroup.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='flex flex-col gap-2 justify-center items-center h-[60vh]'>
            <h1 className='text-2xl'>گروهی ندارید</h1>
            <Image
              src={'/icons/empty-box.svg'}
              width={444}
              height={333}
              alt=''
              className='w-[10%]'
            />
            <div className='border min-w-[40%] my-5'></div>
            <h1 className='text-2xl'> تعریف گروه</h1>
            <button
              type='submit'
              onClick={() => setShowAddModal(true)}
              className='h-10 min-w-40 bg-purple-700 text-white rounded-lg hover:bg-purple-800'>
              + گروه جدید
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default Groups
