import { useEffect, useState } from 'react'
import { Edit2, People, ProfileCircle, Trash } from 'iconsax-react'
import { GroupData } from '@/interfaces'
import { useMenu } from '@/Context/Menu'
import AddModal from './AddModal'
import DeleteModal from './DeleteModal'

const groupsData: GroupData[] = [
  {
    title: 'تهران شرق',
    subGroups: [
      { name: 'زیر گروه اول' },
      { name: 'زیر گروه دوم' },
      { name: 'زیر گروه سوم' },
      { name: 'زیر گروه چهارم' },
    ],
    referrers: 23,
  },
  {
    title: ' تهران شرق',
    subGroups: [],
    referrers: 0,
  },
  {
    title: 'تهران غرب',
    subGroups: [
      { name: 'زیر گروه اول' },
      { name: 'زیر گروه دوم' },
      { name: 'زیر گروه سوم' },
      { name: 'زیر گروه چهارم' },
    ],
    referrers: 22,
  },
  {
    title: 'دکترهای پوست',
    subGroups: [
      { name: 'زیر گروه اول' },
      { name: 'زیر گروه دوم' },
      { name: 'زیر گروه سوم' },
      { name: 'زیر گروه چهارم' },
    ],
    referrers: 243,
  },
]
const PorsantManagement: React.FC = () => {
  const [data, setData] = useState<GroupData[]>([])
  const { setMenu } = useMenu()
  const [showAddModal, setShowAddModal] = useState<boolean | string>(false)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean | string>(
    false
  )
  useEffect(() => {
    setData(groupsData)
  }, [setData])
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
            مدیریت پورسانت‌ دهی
          </span>
        </p>
      </div>
      {showAddModal && (
        <AddModal
          existName={typeof showAddModal === 'string' ? showAddModal : ''}
          close={setShowAddModal}
        />
      )}
      {showDeleteModal && (
        <DeleteModal name={`${showDeleteModal}`} close={setShowDeleteModal} />
      )}
      <div className='p-6 bg-white rounded-lg border border-gray-200'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
          {data.map((product, index) => (
            <div
              key={index}
              className='flex flex-col justify-between items-start border rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300'>
              {/* Category Label */}
              <div className='flex items-center justify-between w-full mb-4'>
                <span className='text-sm bg-[#E1DCF8] text-[#6137A0] px-2 py-1 rounded'>
                  {product.title}
                </span>
             
              </div>
              <div className='flex'>
                <ProfileCircle size={24} color='#704CB9' />
                <p className='text-sm  px-2 py-1 rounded'>
                  {Number(`${product.referrers}`) > 0 ? (
                    <>
                      <span className='text-[#757575]'>تعداد بازاریاب:</span>
                      {product.referrers}
                    </>
                  ) : (
                    'بازاریابی تعریف نشده است'
                  )}
                </p>
              </div>
              <div className='flex my-5'>
                <People size={24} color='#704CB9' />
                <p className='text-sm  px-2 py-1 rounded'>
                  {product.subGroups.length > 0 ? (
                    <>
                      <span className='text-[#757575]'>تعداد زیر‌گروه‌ها:</span>
                      {product.subGroups.length}
                    </>
                  ) : (
                    ' زیر گروهی تعریف نشده است'
                  )}
                </p>
              </div>
              <button
                onClick={() => {
                  location.hash =
                    product.subGroups.length > 0 ? 'groupsdetail' : 'subgroups'
                  setMenu(
                    product.subGroups.length > 0 ? 'groupsdetail' : 'subgroups'
                  )
                }}
                className={`w-full h-10  font-semibold rounded ${
                  product.subGroups.length === 0
                    ? 'bg-purple-600 hover:bg-purple-700 text-white'
                    : 'border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white'
                } transition duration-300`}>
                {product.subGroups.length > 0
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

export default PorsantManagement
