import React, { useState } from 'react'
import { ShieldSearch, Trash, Edit, Edit2 } from 'iconsax-react'
import AddModal from './AddModal'
import DeleteModal from './DeleteModal'
import { useMenu } from '@/Context/Menu'

interface ProductCard {
  id: number
  category: string
  actionText: string
  buttonType: 'view' | 'add'
}

const productData: ProductCard[] = [
  {
    id: 1,
    category: 'محصولات پوستی',
    actionText: 'مشاهده محصولات',
    buttonType: 'view',
  },
  {
    id: 2,
    category: 'محصولات شامپو',
    actionText: 'مشاهده محصولات',
    buttonType: 'view',
  },
  {
    id: 3,
    category: 'محصولات آرایشی',
    actionText: 'تعریف محصول',
    buttonType: 'add',
  },
  {
    id: 4,
    category: 'محصولات پوستی',
    actionText: 'مشاهده محصولات',
    buttonType: 'view',
  },
  {
    id: 5,
    category: 'محصولات آرایشی',
    actionText: 'تعریف محصول',
    buttonType: 'add',
  },
  {
    id: 6,
    category: 'محصولات شامپو',
    actionText: 'مشاهده محصولات',
    buttonType: 'view',
  },
]
const ProductGroups: React.FC = () => {
  const [data, setData] = useState<ProductCard[]>(productData)
  const [showAddModal, setShowAddModal] = useState<boolean | string>(false)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean | string>(
    false
  )
  const { setMenu } = useMenu()

  return (
    <div className='m-4'>
      <div className='flex justify-between items-center mb-7'>
        <p>
          <span className='text-[#98A2B3]'>تعاریف</span>/
          <span className='text-[#7747C0]'> محصولات من</span>
        </p>
        <button
          type='submit'
          onClick={() => setShowAddModal(true)}
          className='h-10 min-w-40 bg-purple-700 text-white rounded-lg hover:bg-purple-800'>
          + گروه محصول جدید
        </button>
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
          {data.map((product) => (
            <div
              key={product.id}
              className='flex flex-col justify-between items-start border rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300'>
              {/* Category Label */}
              <div className='flex items-center justify-between w-full mb-4'>
                <span className='text-sm bg-[#E1DCF8] text-[#6137A0] px-2 py-1 rounded'>
                  {product.category}
                </span>
                <div className='flex gap-2'>
                  <Edit2
                    size={20}
                    color='#8455D2'
                    cursor={'pointer'}
                    onClick={() => setShowAddModal(product.category)}
                  />
                  <Trash
                    size={20}
                    color='#D42620'
                    cursor={'pointer'}
                    onClick={() => {
                      setData((prv) =>
                        prv.filter((ref) => ref.id !== product.id)
                      )
                      setShowDeleteModal(product.category)
                    }}
                  />
                </div>
              </div>

              <button
                onClick={() => {
                  location.hash = 'products'
                  setMenu('products')
                }}
                className={`w-full py-2  font-semibold rounded ${
                  product.buttonType === 'add'
                    ? 'bg-purple-600 hover:bg-purple-700 text-white'
                    : 'border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white'
                } transition duration-300`}>
                {product.actionText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductGroups
