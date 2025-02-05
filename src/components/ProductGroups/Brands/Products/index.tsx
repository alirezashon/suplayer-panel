import { useState } from 'react'
import { Trash, Edit2, SearchNormal } from 'iconsax-react'
import AddModal from './AddModal'
import DeleteModal from './DeleteModal'
import Image from 'next/image'
import { ProductGroupData, ProductsData } from '@/interfaces'
import { useStates } from '@/Context/States'
import { useMenu } from '@/Context/Menu'

const headers = ['ردیف', 'گروه محصول', 'برند محصول', 'نام محصول', 'عملیات']
const Product: React.FC = () => {
  const { selectedProductData } = useStates()
  const { setMenu } = useMenu()
  const [data, setData] = useState<ProductsData[]>()
  const [showAddModal, setShowAddModal] = useState<boolean | ProductsData>(
    false
  )
  const [showDeleteModal, setShowDeleteModal] = useState<
    boolean | ProductsData
  >(false)
  return (
    <div className='m-4'>
      <div className='flex justify-between items-center mb-7'>
        <p>
          <span className='text-[#98A2B3] cursor-pointer'>تعاریف</span>/
          <span
            className='text-[#98A2B3] cursor-pointer'
            onClick={() => {
              location.hash = 'productgroups'
              setMenu('productgroups')
            }}>
            محصولات من
          </span>
          /
          <span
            className='text-[#98A2B3] cursor-pointer'
            onClick={() => {
              location.hash = 'productgroups'
              setMenu('productgroups')
            }}>
            {selectedProductData?.group?.group_desc}
          </span>
          /
          <span
            className='text-[#7747C0]'
            onClick={() => {
              location.hash = 'product-brands'
              setMenu('product-brands')
            }}>
            {selectedProductData?.brand.group_desc}
          </span>
        </p>
        {selectedProductData?.data && selectedProductData?.data.length > 0 && (
          <button
            type='submit'
            onClick={() => setShowAddModal(true)}
            className='h-10 min-w-40 bg-[#7747C0] text-white rounded-lg hover:bg-purple-800'>
            + محصول جدید
          </button>
        )}
      </div>
      {showAddModal && (
        <AddModal
          editData={showAddModal as ProductsData}
          groupName={selectedProductData?.group?.group_desc as string}
          brand={selectedProductData?.brand as ProductGroupData}
          close={setShowAddModal}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          data={showDeleteModal as ProductsData}
          close={setShowDeleteModal}
        />
      )}
      {selectedProductData?.data && selectedProductData?.data.length > 0 ? (
        <div className='p-6 bg-white rounded-lg border border-gray-200 flex flex-col gap-5'>
          <div className='flex gap-5 items-center'>
            <div className='relative w-full flex items-center '>
              <div className='absolute left-3 z-20 cursor-pointer text-[#50545F]'>
                <SearchNormal size={24} color='gray' />
              </div>

              <input
                type='search'
                placeholder='جستجو'
                // value={search}
                // onChange={(e) => handleSearchChange(e.target.value)}
                className='absolute w-full z-10 border border-gray-300 rounded-md px-4 py-2 text-right outline-none focus:border-red-400'
              />
            </div>
            <button
              type='submit'
              className={`fill-button px-10 h-10 rounded-lg `}>
              جستجو
            </button>
          </div>
          <table className='my-10 w-full'>
            <thead>
              <tr>
                {headers.map((head, headIndex) => (
                  <th
                    className={`bg-[#F3F4F5] border-z h-10 ${
                      headIndex === 0
                        ? 'rounded-tr-lg'
                        : headIndex === headers.length - 1 && 'rounded-tl-lg'
                    } `}
                    key={headIndex}>
                    <p
                      className={`flex justify-center items-center border-y h-10  ${
                        headIndex === 0
                          ? 'border-r rounded-tr-lg'
                          : headIndex === headers.length - 1 &&
                            'border-l rounded-tl-lg'
                      }`}>
                      {head}
                    </p>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {selectedProductData?.data?.map((product, index) => (
                <tr key={index} className='border-b'>
                  <td className={`text-center h-10 border-r`}>{index}</td>
                  <td className={`text-center h-10 `}>
                    {selectedProductData?.group?.group_desc}
                  </td>
                  <td className={`text-center h-10 `}>
                    {selectedProductData?.brand?.group_desc}
                  </td>
                  <td className={`text-center h-10 `}>{product?.ini_name}</td>
                  <td className={`text-center h-10 border-l`}>
                    <div className='justify-center flex gap-2'>
                      <Trash
                        size={20}
                        color='#D42620'
                        cursor={'pointer'}
                        onClick={() => {
                          setData((prv) =>
                            prv?.filter((ref) => ref.type !== product.type)
                          )
                          setShowDeleteModal(product)
                        }}
                      />
                      <Edit2
                        size={20}
                        color='#8455D2'
                        cursor={'pointer'}
                        onClick={() => setShowAddModal(product)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className='flex flex-col gap-2 justify-center items-center h-[60vh]'>
          <h1 className='text-2xl'>محصولی ندارید</h1>
          <Image
            src={'/icons/empty-box.svg'}
            width={444}
            height={333}
            alt=''
            className='w-[10%]'
          />
          <div className='border min-w-[40%] my-5'></div>
          <h1 className='text-2xl'> تعریف محصول</h1>
          <button
            type='submit'
            onClick={() => setShowAddModal(true)}
            className='h-10 min-w-40 bg-[#7747C0] text-white rounded-lg hover:bg-purple-800'>
            + محصول جدید
          </button>
        </div>
      )}
    </div>
  )
}

export default Product
