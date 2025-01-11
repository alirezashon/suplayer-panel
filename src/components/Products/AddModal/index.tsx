import { getCookieByKey } from '@/actions/cookieToken'
import { CreateProduct, EditProduct } from '@/services/items'
import { CloseSquare, Message, Trash } from 'iconsax-react'
import { useState } from 'react'

const AddModal = ({
  existName,
  category,
  close,
}: {
  existName?: string
  category: string
  close: (show: boolean) => void
}) => {
  const [names, setNames] = useState<string[]>([existName || ''])
  const handleSubmit = async () => {
    const accessToken = (await getCookieByKey('access_token')) || ''

    names.map(async (name) => {
      if (!existName) {
        await CreateProduct({ accessToken, name })
      } else {
        await EditProduct({ accessToken, name })
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
          <div className='flex justify-between '>
            <p className='text-[#8455D2]'>گروه محصول</p>
            <p>{category}</p>
          </div>
          <div className='flex justify-center mt-5 p-2 rounded-lg gap-2 bg-[#E2F1FC]'>
            <Message color='#1D91CC' size={22} />
            <p>محصولات مرتبط به این گروه را در قسمت زیر اضافه کنید.</p>
          </div>
          {names.map((name, index) => (
            <div className='mt-10 w-full flex gap-5 ' key={index}>
              <div className='flex flex-col w-full'>
                <label className='text-base font-medium text-right text-gray-800'>
                  نام محصول
                </label>
                <div className='flex items-center gap-3'>
                  <input
                    className='w-full'
                    defaultValue={name}
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
          <div className='flex justify-end my-5'>
            <p
              className='text-[#7747C0] cursor-pointer'
              onClick={() => setNames((prv) => [...prv, ''])}>
              + محصول جدید
            </p>
          </div>
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
