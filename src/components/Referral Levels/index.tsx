import { useState } from 'react'
import {
  AddCircle,
  ArrowLeft2,
  CloseCircle,
  Edit,
  TickCircle,
} from 'iconsax-react'
import { useMenu } from '@/Context/Menu'
import AddModal from './AddModal'
import { useData } from '@/Context/Data'
import { TreeChartInterface } from '@/interfaces'
import { getCookieByKey } from '@/actions/cookieToken'
import { EditReferrerChart } from '@/services/referrer'
import { getReferrerChart } from '@/actions/setData'
export interface TreeNode {
  id: string
  name: string
  level: number
  children?: TreeNode[]
}

const ReferralLevels: React.FC = () => {
  const { setMenu } = useMenu()
  const [addModal, setAddModal] = useState<{
    show: boolean
    data?: TreeChartInterface
  }>()
  const [openTrees, setOpenTrees] = useState<number[]>([])
  const { TreeChartInterface, setTreeChartInterface } = useData()
  const [editableRow, setEditableRow] = useState<TreeChartInterface | null>()
  const colors = [
    'text-purple-800',
    'text-blue-800',
    'text-yellow-600',
    'text-green-800',
    'text-red-700',
  ]
  const labels = [
    'bg-purple-200',
    'bg-blue-200',
    'bg-yellow-200',
    'bg-green-200',
    'bg-red-200',
  ]
  const renderTree = (parentId: number, level = 0) => {
    const nodes =
      Array.isArray(TreeChartInterface) &&
      TreeChartInterface?.filter((node) => node.chpid === parentId)
    const EditChart = async () => {
      const accessToken = await getCookieByKey('access_token')
      const { chpid, chtitle, chstatus, chlabel } =
        editableRow as TreeChartInterface
      await EditReferrerChart({
        accessToken,
        chid: parseInt(`${editableRow?.id}`),
        chpid,
        chtitle,
        chlabel: chlabel || '',
        chstatus,
      }).then(async (result) => {
        if (result)
          await getReferrerChart().then((value) => {
            if (value) {
              setTreeChartInterface(value)
              setEditableRow(null)
            }
          })
      })
    }
    return (
      <ul className='pr-2 border-r-2 border-gray-300 rounded-b-2xl'>
        {Array.isArray(nodes) &&
          nodes?.map((node) => (
            <li key={node.id} className={`mb-4`}>
              <div
                onClick={() =>
                  setOpenTrees((prev) =>
                    prev.includes(node.id)
                      ? prev.filter((nodeId) => nodeId !== node.id)
                      : [...prev, node.id]
                  )
                }
                className={`flex items-center  p-2 ${
                  node.chlevel !== 3 && 'pr-5'
                } rounded-lg ${colors[level % colors.length]}`}>
                {
                  // node.lev1_count > 0 &&
                  <ArrowLeft2
                    size={24}
                    color='#98A2B3'
                    className={`transition-all duration-500 cursor-pointer ${
                      openTrees?.includes(node?.id) && '-rotate-90'
                    }`}
                  />
                }
                <div className='flex-1 flex gap-5 items-center'>
                  {editableRow && editableRow?.id === node.id ? (
                    <div className='flex items-center gap-5'>
                      <input
                        value={editableRow?.chtitle || ''} // مقدار اولیه را خالی نگه می‌داریم
                        onChange={(e) =>
                          setEditableRow(
                            (prv) =>
                              prv && {
                                ...prv,
                                chtitle: e.target.value,
                              }
                          )
                        }
                      />
                    </div>
                  ) : (
                    <span className='cursor-pointer'>{node.chtitle}</span>
                  )}
                  <span
                    className={`${
                      labels[level % labels.length]
                    } min-w-16 px-2 py-[2px] rounded-md text-[12px] text-center min-h-4`}>
                    {editableRow?.id === node.id ? (
                      <input
                        defaultValue={node?.chlabel || ''}
                        onChange={(e) =>
                          setEditableRow(
                            (prv) =>
                              prv && {
                                ...prv,
                                chlabel: e.target.value,
                              }
                          )
                        }
                        className='max-w-32 px-2 rounded-md text-center border-none bg-transparent'
                      />
                    ) : (
                      node?.chlabel
                    )}
                  </span>
                  {editableRow?.id === node.id && (
                    <div className='flex gap-1'>
                      <TickCircle
                        cursor={'pointer'}
                        size={24}
                        color='#0F973D'
                        onClick={EditChart}
                      />
                      <CloseCircle
                        cursor={'pointer'}
                        size={24}
                        color='#D42620'
                        onClick={() => setEditableRow(null)}
                      />
                    </div>
                  )}
                </div>

                <button
                  className='ml-2 text-gray-500 hover:text-gray-700'
                  onClick={() => setEditableRow(node)}>
                  <Edit size={24} color='#7747C0' />
                </button>
                <button className='ml-2 text-gray-500 hover:text-gray-700'>
                  <AddCircle
                    size={24}
                    color='#7747C0'
                    onClick={() => setAddModal({ show: true, data: node })}
                  />
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
              setMenu('mygroups')
              location.hash = 'mygroups'
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
          onClick={() => setAddModal({ show: true })}
          className='h-10 min-w-40 bg-[#7747C0] text-white rounded-lg hover:bg-purple-800'>
          + ایجاد بالاترین سطح
        </button>
      </div>

      {addModal?.show && (
        <AddModal
          close={() => setAddModal({ show: false })}
          data={addModal.data}
        />
      )}
      <div className='bg-white p-6 border rounded-md'>{renderTree(0)}</div>
    </div>
  )
}

export default ReferralLevels
