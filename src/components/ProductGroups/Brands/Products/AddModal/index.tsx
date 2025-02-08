import { getCookieByKey } from '@/actions/cookieToken'
import { getProductData } from '@/actions/setData'
import { useData } from '@/Context/Data'
import { useStates } from '@/Context/States'
import { ProductGroupData, ProductsData } from '@/interfaces'
import { CreateProduct, EditProduct } from '@/services/products'
import { CloseSquare, Message, Trash } from 'iconsax-react'
import { useState } from 'react'

const AddModal = ({
  editData,
  groupName,
  brand,
  close,
}: {
  editData?: ProductsData
  groupName: string
  brand: ProductGroupData
  close: (show: boolean) => void
}) => {
  const { setProductData } = useData()
  const { showModal } = useStates()
  const [names, setNames] = useState<string[]>([editData?.ini_name || ''])
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const accessToken = (await getCookieByKey('access_token')) || ''

    names.map(async (name) => {
      if (!editData?.ini_name) {
        await CreateProduct({ accessToken, name, id: brand.id }).then(
          async (result) => {
            showModal({
              type: result.status === 1 ? 'success' : 'error',
              main: <p>{result.message}</p>,
              title: result.status === 1 ? 'موفق' : 'خطا',
              autoClose: 3,
            })
            if (result.status === 1) {
              await getProductData().then(
                (data) => data && setProductData(data)
              )
              close(false)
            }
          }
        )
      } else {
        await EditProduct({ accessToken, name, id: editData.id }).then(
          async (result) => {
            showModal({
              type: result.status === 1 ? 'success' : 'error',
              main: <p>{result.message}</p>,
              title: result.status === 1 ? 'موفق' : 'خطا',
              autoClose: 3,
            })
            if (result.status === 1) {
              await getProductData().then(
                (data) => data && setProductData(data)
              )
            }
          }
        )
      }
    })
  }

  return (
    <div>
      <div className='absolute bg-slate-600 opacity-50 w-full h-[200vh] z-50 top-0 right-0'></div>
      <div
        style={{ scrollbarWidth: 'none' }}
        className={`fixed overflow-y-auto p-10 z-50 right-0 top-0 max-md:left-[0] max-md:w-[100%] w-[40vw] h-full bg-white border border-gray-300 shadow-lg transition-transform duration-300 ease-in-out right-side-animate 
     `}>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col bg-white max-w-[594px] pb-[852px] max-md:px-5 max-md:pb-24'>
          <div className='flex justify-between items-center w-full text-xl font-medium text-right text-gray-800 max-md:max-w-full'>
            <div className='flex-1 shrink self-stretch my-auto min-w-[240px] max-md:max-w-full'>
              محصول جدید
            </div>
            <div
              className='
           '>
              <CloseSquare
                size={24}
                cursor='pointer'
                color='#50545F'
                onClick={() => close(false)}
              />
            </div>
          </div>
          <div className='flex justify-between mt-5'>
            <p className='text-[#8455D2]'>گروه محصول</p>
            <p>{groupName}</p>
          </div>
          <div className='flex justify-between mt-3'>
            <p className='text-[#8455D2]'>برند محصول</p>
            <p>{brand.group_desc}</p>
          </div>
          <div className='flex justify-center mt-5 p-2 rounded-lg gap-2 bg-[#E2F1FC]'>
            <Message color='#1D91CC' size={22} />
            <p>محصولات مرتبط به این گروه را در قسمت زیر اضافه کنید.</p>
          </div>
          {names.map((name, index) => (
            <div
              className={`mt-7 w-full flex gap-5 ${
                index === names.length - 1 && 'add-new-input-animated'
              }`}
              key={index}>
              <div className='flex flex-col w-full'>
                <label className='text-base font-medium text-right text-gray-800'>
                  نام محصول
                </label>
                <div className='flex items-center gap-3'>
                  <input
                    className='w-full'
                    defaultValue={name}
                    onChange={(e) =>
                      setNames((prev) =>
                        prev.map((item, i) =>
                          i === index ? e.target.value : item
                        )
                      )
                    }
                    type='text'
                    placeholder='نام  محصول'
                  />
                  {index > 0 && (
                    <div className='flex items-center h-max'>
                      <Trash
                        size={24}
                        color='#D42620'
                        cursor={'pointer'}
                        onClick={() => {
                          setNames((prv) =>
                            prv.filter((_, prvIndex) => prvIndex !== index)
                          )
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          {!editData?.ini_name && (
            <div className='flex justify-end my-5'>
              <p
                className='text-[#7747C0] cursor-pointer'
                onClick={() => setNames((prv) => [...prv, ''])}>
                + محصول جدید
              </p>
            </div>
          )}
          <div className='mt-10 w-full max-md:max-w-full'>
            <button
              type='submit'
              className={`fill-button px-10 h-10 rounded-lg  w-full`}>
              ثبت
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default AddModal
