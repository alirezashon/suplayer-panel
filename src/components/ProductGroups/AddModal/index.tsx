import { getCookieByKey } from '@/actions/cookieToken'
import { getProductData } from '@/actions/setData'
import { useData } from '@/Context/Data'
import { CreateProductGroup, EditProductGroup } from '@/services/products'
import { CloseSquare, Trash } from 'iconsax-react'
import { FormEvent, useState } from 'react'
const AddModal = ({
  existName,
  close,
}: {
  existName?: string
  close: (show: boolean) => void
}) => {
  const [productGroupName, setProductGroupName] = useState<string>('')
  const [names, setNames] = useState<string[]>([''])
  const { setProductData } = useData()
  const handleAddInput = () => {
    setNames([...names, ''])
  }

  const handleRemoveInput = (index: number) => {
    setNames((prev) => prev.filter((_, i) => i !== index))
  }

  const handleInputChange = (value: string, index: number) => {
    setNames((prev) => prev.map((item, i) => (i === index ? value : item)))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const accessToken = (await getCookieByKey('access_token')) || ''
    if (existName)
      await EditProductGroup({ accessToken, name: productGroupName })
    else {
      await CreateProductGroup({ accessToken, name: productGroupName }).then(
        async (value) => {
          if (value && value?.data?.regid)
            names?.length > 0 &&
              names.map(
                async (name) =>
                  name.length > 0 &&
                  (
                    await CreateProductGroup({
                      accessToken,
                      name: name,
                      group_pid: value.data.regid,
                    })
                  ).then(() => setNames([]))
              )
          await getProductData().then((value) => value && setProductData(value))
        }
      )
    }
  }
  return (
    <div>
      <div className='absolute bg-slate-600 opacity-50 w-full h-[200vh] z-50 top-0 right-0'></div>
      <div
        style={{ scrollbarWidth: 'none' }}
        className={`fixed p-10 z-50 right-0 top-0 max-md:left-[0] max-md:w-[100%] w-[40vw] h-full bg-white border border-gray-300 shadow-lg transition-transform duration-300 ease-in-out right-side-animate overflow-y-auto  
     `}>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col bg-white max-w-[594px] pb-[852px] max-md:px-5 max-md:pb-24 '>
          <div className='flex justify-between items-center w-full text-xl font-medium text-right text-gray-800 max-md:max-w-full'>
            <div className='flex-1 shrink self-stretch my-auto min-w-[240px] max-md:max-w-full'>
              گروه محصول جدید
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
          <div className='mt-10 w-full max-md:max-w-full'>
            <div className='flex flex-col w-full'>
              <label className='text-base font-medium text-right text-gray-800 mb-2'>
                نام گروه محصول
              </label>
              <input
                defaultValue={productGroupName}
                onChange={(e) => setProductGroupName(e.target.value)}
                type='text'
                placeholder='نام گروه محصول'
              />
            </div>
          </div>
          <div className='mt-2 w-full max-md:max-w-full'>
            {names.map((name, index) => (
              <div
                key={index}
                className={`mt-4 ${
                  index === names.length - 1 && 'add-new-input-animated'
                }`}>
                <label className='text-base font-medium text-right text-gray-800'>
                  نام برند محصول خود را بنویسید
                </label>
                <div className='flex items-center gap-2'>
                  <input
                    value={name}
                    onChange={(e) => handleInputChange(e.target.value, index)}
                    type='text'
                    placeholder='مثال: فولیکا'
                    className='flex-1 border border-gray-300 rounded-lg px-4 py-2'
                  />
                  {index > 0 && (
                    <Trash
                      className='cursor-pointer'
                      onClick={() => handleRemoveInput(index)}
                      size={24}
                      color='#D42620'
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className='flex justify-end mt-3'>
            <button
              type='button'
              onClick={handleAddInput}
              className='text-[#7747C0] font-bold hover:text-[#7747C0]'>
              افزودن برند +
            </button>
          </div>
          <button
            type='submit'
            className={`fill-button px-10 h-10 rounded-lg  mt-12`}>
            ثبت
          </button>
        </form>
      </div>
    </div>
  )
}
export default AddModal
