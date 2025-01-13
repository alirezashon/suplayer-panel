import { useState } from 'react'
import {
  AddCircle,
  ArrowLeft2,
  Edit,
} from 'iconsax-react'
import { useMenu } from '@/Context/Menu'
import AddModal from './AddModal'
import DeleteModal from './DeleteModal'
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
  const [openTrees, setOpenTrees] = useState<string[]>([])
  // sampleData.ts
  const data = [
    {
      id: '1',
      name: 'محمد رضایی (مدیر فروش کل)',
      level: 1,
      children: [
        {
          id: '2',
          name: 'علی کاظمی (مدیر شعبه تهران)',
          level: 2,
          children: [
            {
              id: '3',
              name: 'سعید مرادی (مدیر منطقه ۱ تهران)',
              level: 3,
              children: [
                { id: '4', name: 'فاطمه حسینی (سوپروایزر تیم ۱)', level: 4 },
              ],
            },
          ],
        },
        {
          id: '5',
          name: 'مریم نوری (مدیر شعبه اصفهان)',
          level: 2,
          children: [
            {
              id: '6',
              name: 'رضا احمدی (مدیر منطقه ۲ اصفهان)',
              level: 3,
              children: [
                { id: '7', name: 'نسترن عباسی (سوپروایزر تیم ۲)', level: 4 },
              ],
            },
          ],
        },
      ],
    },
  ]
  const renderTree = (nodes: TreeNode[]) => {
    return (
      <ul className='pr-2 border-r-2 border-gray-300 rounded-b-2xl'>
        {nodes.map((node) => (
          <li key={node.id} className={`mb-4`}>
            <div
              className={`flex items-center p-2 ${node.level!==3&&'pr-5'} rounded-lg ${
                node.level === 1
                  ? 'text-purple-800'
                  : node.level === 2
                  ? 'text-blue-800'
                  : node.level === 3
                  ? 'text-yellow-800'
                  : 'text-green-800'
              }`}>
              {node.children && (
                <ArrowLeft2
                  size={24}
                  color='#98A2B3'
                  onClick={() =>
                    setOpenTrees((prv) =>
                      prv?.includes(node.id)
                        ? prv.filter((ids) => ids !== node.id)
                        : [...prv, node.id]
                    )
                  }
                  className={`cursor-pointer transition-all duration-500 ${
                    openTrees?.includes(node.id) && '-rotate-90'
                  }`}
                />
              )}
              <span className='flex-1'>{node.name}</span>
              <button className='ml-2 text-gray-500 hover:text-gray-700'>
                <Edit size={24} color='#7747C0' />
              </button>
              <button className='ml-2 text-gray-500 hover:text-gray-700'>
                <AddCircle size={24} color='#7747C0' />
              </button>
            </div>
            {node.children &&
              openTrees.includes(node.id) &&
              renderTree(node.children)}
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
          + سطح جدید بازاریاب
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
      <div className='bg-white p-6 border rounded-md'>{renderTree(data)}</div>
    </div>
  )
}

export default ReferralLevels
