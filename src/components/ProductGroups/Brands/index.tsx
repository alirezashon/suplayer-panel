import { useEffect, useState } from 'react'
import { Trash, Edit2, ProfileCircle, HashtagSquare } from 'iconsax-react'
import AddModal from './AddModal'
import DeleteModal from './DeleteModal'
import { useMenu } from '@/Context/Menu'
import Image from 'next/image'
import { useData } from '@/Context/Data'
import { ProductGroupData } from '@/interfaces'
const Brands: React.FC<{ data: ProductGroupData }> = ({ data }) => {
  const { setMenu } = useMenu()
  const { brandsData } = useData()
  const [showAddModal, setShowAddModal] = useState<boolean | ProductGroupData>(
    false
  )
  const [brand, setBrand] = useState<ProductGroupData[]>()
  const [showDeleteModal, setShowDeleteModal] = useState<
    ProductGroupData | boolean
  >(false)

  useEffect(() => {
    setBrand(brandsData?.filter((value) => value.group_pid === data.id))
  }, [])

  return (
    <>
      {brand && brand.length > 0 ? (
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
              /<span className='text-[#7747C0]'>{data.group_desc}</span>
            </p>
            <button
              type='submit'
              onClick={() => setShowAddModal(true)}
              className='h-10 min-w-40 bg-[#7747C0] text-white rounded-lg hover:bg-purple-800'>
              + برند محصول جدید
            </button>
          </div>
          {showAddModal && (
            <AddModal
              setData={setBrand}
              parent={data}
              data={showAddModal as ProductGroupData}
              close={setShowAddModal}
            />
          )}
          {showDeleteModal && (
            <DeleteModal
              setData={setBrand}
              data={showDeleteModal as ProductGroupData}
              close={() => setShowDeleteModal(false)}
            />
          )}
          <div className='p-6 bg-white rounded-lg border border-gray-200'>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
              {brand.map((productGroup) => (
                <div
                  key={productGroup.id}
                  className='flex flex-col justify-between items-start border rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300'>
                  {/* Category Label */}
                  <div className='flex items-center justify-between w-full mb-4'>
                    <span className='text-sm bg-[#E1DCF8] text-[#6137A0] px-2 py-1 rounded'>
                      {productGroup.group_desc}
                    </span>
                    <div className='flex gap-2'>
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
                      location.hash = 'productGroups'
                      setMenu('productGroups')
                    }}
                    className={`w-full py-2  font-semibold rounded ${
                      productGroup.group_desc === 'add'
                        ? 'bg-[#7747C0] hover:bg-[#7747C0] text-white'
                        : 'border border-[#7747C0] text-[#7747C0] hover:bg-[#7747C0] hover:text-white'
                    } transition duration-300`}>
                    {productGroup.group_desc}
                  </button>
                </div>
              ))}
            </div>
          </div>
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
            <button
              type='submit'
              onClick={() => setShowAddModal(true)}
              className='h-10 min-w-40 bg-[#7747C0] text-white rounded-lg hover:bg-purple-800'>
              + برند محصول جدید
            </button>
          </div>
        </div>
      )}
    </>
  )
}
export default Brands
