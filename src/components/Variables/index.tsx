import { useState } from 'react'
import { Edit2, Trash } from 'iconsax-react'
import { useMenu } from '@/Context/Menu'
import AddModal from './AddModal'
import AddSubGroup from '../SubGroups/AddModal'
import DeleteModal from './DeleteModal'
const Variables: React.FC = () => {
  const { setMenu } = useMenu()
  // const { groupData } = useData()
  const [showAddModal, setShowAddModal] = useState<null | string[]>(null)
  const [addSubGroup, setAddSubGroup] = useState<number | null>()
  const [showDeleteModal, setShowDeleteModal] = useState<null | string[]>(null)
  const [activeTab, setActiveTab] = useState<number>(0)
  const headers = ['ردیف', 'نام متغیر', 'بازه زمانی', 'عملیات']
  const data = Array.from({ length: 5 }, (_, index) => ({
    name: 'متغیر' + index,
    duration: 'روزانه',
    state: index % 2 === 1 ? 0 : 1,
  }))
  return (
    <div className='m-4'>
      <div className='flex justify-between items-center mb-7'>
        <p className='cursor-pointer'>
          <span
            className='text-[#98A2B3]'
            onClick={() => {
              setMenu('')
              location.hash = ''
            }}>
            تنظیمات
          </span>
          / <span className='text-[#98A2B3]'>مدیریت شاخص‌ها</span>/
          <span className='text-[#7747C0]'>تعریف متغیرها</span>
        </p>
        <button
          type='submit'
          onClick={() => setShowAddModal([])}
          className='h-10 min-w-40 bg-[#7747C0] text-white rounded-lg hover:bg-purple-800'>
          + تعریف متغیر خارجی
        </button>
      </div>
      {showAddModal && (
        <AddModal
          existName={showAddModal[0]}
          sup_group_code={showAddModal[1]}
          close={setShowAddModal}
        />
      )}
      {addSubGroup && (
        <AddSubGroup groupId={addSubGroup} close={() => setAddSubGroup(null)} />
      )}
      {showDeleteModal && (
        <DeleteModal
          sup_group_code={showDeleteModal[1]}
          name={`${showDeleteModal[0]}`}
          close={setShowDeleteModal}
        />
      )}
      <div className='p-6 bg-white rounded-lg border border-gray-200'>
          <div className='flex border-b'>
            {['داخلی', 'خارجی']?.map((tab, index) => (
              <button
                key={index}
                className={`w-full px-5 py-3 transition-all duration-500 ${
                  activeTab === index
                    ? 'bg-[#E6DBFB80] border-b-2 border-[#704CB9] text-[#704CB9]'
                    : 'text-[#344054]'
                }`}
                onClick={() => setActiveTab(index)}>
                {tab}
              </button>
            ))}
          </div>
          <table className='my-10 border-collapse border  w-full text-sm text-gray-700'>
            <thead>
              <tr>
                {headers.map((head, headIndex) => (
                  <th
                    className={`bg-[#F5F7F8] h-10 text-center font-bold border-b ${
                      headIndex === 0
                        ? 'rounded-tr-lg'
                        : headIndex === headers.length - 1 && 'rounded-tl-lg'
                    }`}
                    key={headIndex}>
                    {head}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {data
                ?.filter((formula) => formula.state === activeTab)
                .map((formula, index) => (
                  <tr key={index} className='border-b '>
                    <td className='text-center h-10'>{index + 1}</td>
                    <td className='text-center h-10'>{formula.name}</td>

                    <td className='text-center h-10'>{formula.duration}</td>
                    <td className='text-center h-10 flex justify-center gap-2'>
                      <Trash
                        size={24}
                        color='#7747C0'
                        className='cursor-pointer'
                        // onClick={() => setShowDeleteModal(formula)}
                      />
                      <Edit2
                        size={24}
                        color='#7747C0'
                        className='cursor-pointer'
                        // onClick={() => setShowAddModal(formula)}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
      </div>
    </div>
  )
}
export default Variables
