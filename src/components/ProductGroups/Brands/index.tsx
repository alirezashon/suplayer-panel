import { useState } from 'react'
import { Trash, Edit2, ProfileCircle, HashtagSquare } from 'iconsax-react'
import AddModal from './AddModal'
import AddProduct from './Products/AddModal'
import DeleteModal from './DeleteModal'
import { useMenu } from '@/Context/Menu'
import Image from 'next/image'
import { useData } from '@/Context/Data'
import { ProductGroupData, ProductsData } from '@/interfaces'
import { useStates } from '@/Context/States'
const Brands: React.FC = () => {
  const { setMenu } = useMenu()
  const { setSelectedProductData, selectedProductBrandData, permissions } =
    useStates()
  const { productData } = useData()
  const [showAddModal, setShowAddModal] = useState<boolean | ProductGroupData>(
    false
  )
  const [showAddProduct, setShowAddProduct] = useState<
    boolean | ProductGroupData
  >(false)
  const [showDeleteModal, setShowDeleteModal] = useState<
    ProductGroupData | boolean
  >(false)
  const changeRoute = (brand: ProductGroupData) => {
    const products = productData?.filter(
      (product) => product.group_id == `${brand.id}`
    ) as ProductsData[]
    setSelectedProductData({
      data: products,
      group: selectedProductBrandData?.group as ProductGroupData,
      brand: brand as ProductGroupData,
    })
    location.hash = 'products'
    setMenu('products')
  }
  return (
    <>
      {selectedProductBrandData?.data &&
      selectedProductBrandData?.data.length > 0 ? (
        <div className='m-4'>
          <div className='flex justify-between items-center mb-7'>
            <p className='cursor-pointer'>
              <span
                className='text-[#98A2B3]'
                onClick={() => {
                  setMenu('productgroups')
                  location.hash = 'productgroups'
                }}>
                تعاریف
              </span>
              /
              <span
                className='text-[#98A2B3]'
                onClick={() => {
                  setMenu('productgroups')
                  location.hash = 'productgroups'
                }}>
                محصولات من
              </span>
              /
              <span className='text-[#7747C0]'>
                {selectedProductBrandData?.group.group_desc}
              </span>
            </p>
            {permissions[1].includes('688') && (
              <button
                type='submit'
                onClick={() => setShowAddModal(true)}
                className='h-10 min-w-40 bg-[#7747C0] text-white rounded-lg hover:bg-purple-800'>
                + برند محصول جدید
              </button>
            )}
          </div>
          {showAddModal && (
            <AddModal
              parent={selectedProductBrandData?.group}
              data={showAddModal as ProductGroupData}
              close={setShowAddModal}
            />
          )}
          {showAddProduct && (
            <AddProduct
              brand={showAddProduct as ProductGroupData}
              groupName={selectedProductBrandData?.group.group_desc}
              close={setShowAddProduct}
            />
          )}
          {showDeleteModal && (
            <DeleteModal
              data={showDeleteModal as ProductGroupData}
              close={() => setShowDeleteModal(false)}
            />
          )}
          {permissions[1].includes('731') && (
            <div className='p-6 bg-white rounded-lg border border-gray-200'>
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
                {selectedProductBrandData?.data?.map((brand) => (
                  <div
                    key={brand.id}
                    className='flex flex-col justify-between items-start border rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300'>
                    <div className='flex items-center justify-between w-full mb-4'>
                      <span className='text-sm bg-[#E1DCF8] text-[#6137A0] px-2 py-1 rounded'>
                        {brand.group_desc}
                      </span>
                      {permissions[1].includes('687') && (
                        <div className='flex gap-2'>
                          <Edit2
                            size={20}
                            color='#8455D2'
                            cursor={'pointer'}
                            onClick={() => setShowAddModal(brand)}
                          />
                          <Trash
                            size={20}
                            color='#D42620'
                            cursor={'pointer'}
                            onClick={() => {
                              setShowDeleteModal(brand)
                            }}
                          />
                        </div>
                      )}
                    </div>
                    <div className='flex'>
                      <ProfileCircle size={24} color='#704CB9' />
                      <p className='text-sm  px-2 py-1 rounded'>
                        {Number(`${'brand.referrers'}`) > 0 ? (
                          <>
                            <span className='text-[#757575]'>
                              تعداد بازاریاب:
                            </span>
                            {'brand.referrers'}
                          </>
                        ) : (
                          'بازاریابی تعریف نشده است'
                        )}
                      </p>
                    </div>
                    <div className='flex my-3'>
                      <HashtagSquare size={24} color='#704CB9' />
                      <p className='text-sm  px-2 py-1 rounded'>
                        {brand.product_count > 0 ? (
                          <>
                            <span className='text-[#757575]'>
                              تعداد محصول :
                            </span>
                            {brand.product_count}
                          </>
                        ) : (
                          ' محصولی تعریف نشده است'
                        )}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        if (brand.product_count > 0) changeRoute(brand)
                        else setShowAddProduct(brand)
                      }}
                      className={`w-full py-2  font-semibold rounded ${
                        brand.product_count > 0
                          ? 'bg-[#7747C0] hover:bg-[#7747C0] text-white'
                          : 'border border-[#7747C0] text-[#7747C0] hover:bg-[#7747C0] hover:text-white'
                      } transition duration-300`}>
                      {brand.product_count > 0
                        ? 'مشاهده محصولات'
                        : 'تعریف محصول'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className='flex flex-col gap-2 justify-center items-center h-[60vh]'>
          <h1 className='text-2xl'>برند محصولی ندارید </h1>
          <Image
            src={'/icons/empty-box.svg'}
            width={444}
            height={333}
            alt=''
            className='w-[10%]'
          />
          <div className='border min-w-[40%] my-5'></div>
          <h1 className='text-2xl'> تعریف برند محصول </h1>
          <div className='flex gap-4'>
            {permissions[1].includes('688') && (
              <button
                type='submit'
                onClick={() => setShowAddModal(true)}
                className='h-10 min-w-40 bg-[#7747C0] text-white rounded-lg hover:bg-purple-800'>
                + برند محصول جدید
              </button>
            )}
          </div>
        </div>
      )}
    </>
  )
}
export default Brands
