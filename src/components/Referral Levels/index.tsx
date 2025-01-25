import { useState } from 'react'
import { AddCircle, ArrowLeft2, Edit } from 'iconsax-react'
import { useMenu } from '@/Context/Menu'
import AddModal from './AddModal'
import DeleteModal from './DeleteModal'
import { useData } from '@/Context/Data'
export interface TreeNode {
  id: string
  name: string
  level: number
  children?: TreeNode[]
}

const ReferralLevels: React.FC = () => {
  const { setMenu } = useMenu()
  const [showAddModal, setShowAddModal] = useState<null | string[]>(null)
  const [showDeleteModal, setShowDeleteModal] = useState<null | string[]>(null)
  const [openTrees, setOpenTrees] = useState<number[]>([])
  const { referrerChartData } = useData()
  const colors = [
    'text-purple-800',
    'text-blue-800',
    'text-yellow-600',
    'text-green-800',
  ]

  const renderTree = (parentId: number, level = 0) => {
    const nodes = referrerChartData?.filter((node) => node.chpid === parentId)
    return (
      <ul className='pr-2 border-r-2 border-gray-300 rounded-b-2xl'>
        {nodes?.map((node) => (
          <li key={node.id} className={`mb-4`}>
            <div
              onClick={() =>
                setOpenTrees((prev) =>
                  prev.includes(node.id)
                    ? prev.filter((nodeId) => nodeId !== node.id)
                    : [...prev, node.id]
                )
              }
              className={`flex items-center cursor-pointer p-2 ${
                node.chlevel !== 3 && 'pr-5'
              } rounded-lg ${colors[level % colors.length]}`}>
              {
                // node.lev1_count > 0 &&
                <ArrowLeft2
                  size={24}
                  color='#98A2B3'
                  className={` transition-all duration-500 ${
                    openTrees?.includes(node?.id) && '-rotate-90'
                  }`}
                />
              }
              <span className='flex-1'>{node.chtitle}</span>
              <button className='ml-2 text-gray-500 hover:text-gray-700'>
                <Edit size={24} color='#7747C0' />
              </button>
              <button className='ml-2 text-gray-500 hover:text-gray-700'>
                <AddCircle size={24} color='#7747C0' />
              </button>
            </div>
            <div className={`pr-9`}>
              {openTrees.includes(node.id) && renderTree(node.id, level + 1)}
            </div>
          </li>
        ))}
      </ul>
    )
  }
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
            تنظیمات
          </span>
          /
          <span
            className='text-[#7747C0]'
            onClick={() => {
              setMenu('productgroups')
              location.hash = 'productgroups'
            }}>
            مدیریت سطوح بازاریابی
          </span>
        </p>
        <button
          type='submit'
          onClick={() => setShowAddModal([])}
          className='h-10 min-w-40 bg-[#7747C0] text-white rounded-lg hover:bg-purple-800'>
          + ایجاد بالاترین سطح
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
      <div className='bg-white p-6 border rounded-md'>{renderTree(0)}</div>
    </div>
  )
}

export default ReferralLevels
