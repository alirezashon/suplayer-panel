import { useState } from 'react'
import {
  Trash,
  Edit2,
  ProfileCircle,
  HashtagSquare,
  StatusUp,
} from 'iconsax-react'
import AddModal from './AddModal'
import DeleteModal from './DeleteModal'
import { useMenu } from '@/Context/Menu'
import Image from 'next/image'
import { useData } from '@/Context/Data'
import { ProductGroupData } from '@/interfaces'
import { useStates } from '@/Context/States'
import AddBrand from '../Brands/AddModal'
const ProductGroups: React.FC = () => {
  const { productGroupData, brandsData } = useData()
  const [showAddModal, setShowAddModal] = useState<boolean | ProductGroupData>(
    false
  )
  const [showAddBrand, setShowAddBrand] = useState<boolean | ProductGroupData>(
    false
  )
  const [showDeleteModal, setShowDeleteModal] = useState<
    ProductGroupData | boolean
  >(false)
  const { setMenu } = useMenu()
  const { setProductGroupStates, setSelectedProductBrandData, permissions } =
    useStates()

  return (
    <>
      {showAddBrand && (
        <AddBrand
          parent={showAddBrand as ProductGroupData}
          close={setShowAddBrand}
        />
      )}
      {showAddModal && (
        <AddModal
          data={showAddModal as ProductGroupData}
          close={setShowAddModal}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          data={showDeleteModal as ProductGroupData}
          close={() => setShowDeleteModal(false)}
        />
      )}
      {productGroupData && productGroupData.length > 0 ? (
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
                className='text-[#7747C0]'
                onClick={() => {
                  setMenu('productgroups')
                  location.hash = 'productgroups'
                }}>
                محصولات من
              </span>
            </p>
            {permissions[1].includes('690') && (
              <button
                onClick={() => setShowAddModal(true)}
                className='h-10 min-w-40 bg-[#7747C0] text-white rounded-lg hover:bg-purple-800'>
                + گروه محصول جدید
              </button>
            )}
          </div>

          {permissions[1].includes('737') && (
            <div className='p-6 bg-white rounded-lg border border-gray-200'>
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
                {productGroupData.map((productGroup) => (
                  <div
                    key={productGroup.id}
                    className='flex flex-col justify-between items-start border rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300'>
                    {/* Category Label */}
                    <div className='flex items-center justify-between w-full mb-4'>
                      <span className='text-sm bg-[#E1DCF8] text-[#6137A0] px-2 py-1 rounded'>
                        {productGroup.group_desc}
                      </span>
                      {permissions[1].includes('689') && (
                        <div className='flex gap-2'>
                          {productGroup.campaign_count > 0 && (
                            <StatusUp
                              size={20}
                              color='#8455D2'
                              cursor={'pointer'}
                              onClick={() => setShowAddModal(productGroup)}
                            />
                          )}
                          <Edit2
                            size={20}
                            color='#8455D2'
                            cursor={'pointer'}
                            onClick={() => setShowAddModal(productGroup)}
                          />
                          <Trash
                            size={20}
                            color='#D42620'
                            cursor={'pointer'}
                            onClick={() => {
                              setShowDeleteModal(productGroup)
                            }}
                          />
                        </div>
                      )}
                    </div>
                    <div className='flex'>
                      <ProfileCircle size={24} color='#704CB9' />
                      <p className='text-sm  px-2 py-1 rounded'>
                        {Number(`${'productGroup.referrers'}`) > 0 ? (
                          <>
                            <span className='text-[#757575]'>
                              تعداد بازاریاب:
                            </span>
                            {'productGroup.referrers'}
                          </>
                        ) : (
                          'بازاریابی تعریف نشده است'
                        )}
                      </p>
                    </div>
                    <div className='flex my-3'>
                      <HashtagSquare size={24} color='#704CB9' />
                      <p className='text-sm  px-2 py-1 rounded'>
                        {productGroup.lev1_count > 0 ? (
                          <>
                            <span className='text-[#757575]'>
                              تعداد برند محصول :
                            </span>
                            {productGroup.lev1_count}
                          </>
                        ) : (
                          'برند محصولی تعریف نشده است'
                        )}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        if (productGroup.lev1_count > 0) {
                          setSelectedProductBrandData({
                            data: brandsData?.filter(
                              (pg) => pg.group_pid === productGroup.id
                            ) as ProductGroupData[],
                            group: productGroup,
                          })
                          setProductGroupStates('product-brands')
                          location.hash = 'product-brands'
                        } else {
                          setShowAddBrand(productGroup)
                        }
                      }}
                      className={`w-full py-2  font-semibold rounded ${
                        productGroup.lev1_count > 0
                          ? 'border-button hover:bg-[rgb(240,231,255)] '
                          : 'fill-button hover:bg-[#aa80e9] text-white'
                      } transition duration-300`}>
                      {productGroup.lev1_count > 0
                        ? 'مشاهده برندهای محصول'
                        : 'تعریف برند محصول'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className='flex flex-col gap-2 justify-center items-center h-[60vh]'>
          <h1 className='text-2xl'>گروه محصولی ندارید </h1>
          <Image
            src={'/icons/empty-box.svg'}
            width={444}
            height={333}
            alt=''
            className='w-[10%]'
          />
          <div className='border min-w-[40%] my-5'></div>
          <h1 className='text-2xl'> تعریف گروه محصول</h1>
          <div className='flex gap-4'>
            {permissions[1].includes('690') && (
              <button
                onClick={() => setShowAddModal(true)}
                className='h-10 min-w-40 bg-[#7747C0] text-white rounded-lg hover:bg-purple-800'>
                + گروه محصول جدید
              </button>
            )}
          </div>
        </div>
      )}
    </>
  )
}
export default ProductGroups
