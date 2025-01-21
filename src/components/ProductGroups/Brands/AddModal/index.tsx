import { getCookieByKey } from '@/actions/cookieToken'
import { getProductData, getProductGroupData } from '@/actions/setData'
import { useData } from '@/Context/Data'
import { CreateProductGroup, EditProductGroup } from '@/services/products'
import { CloseSquare, Grammerly, Trash } from 'iconsax-react'
import { FormEvent, useState } from 'react'
import { ProductGroupData } from '@/interfaces'

const AddModal = ({
  data,
  parent,
  setData,
  close,
}: {
  data?: ProductGroupData
  parent: ProductGroupData
  setData: (value: ProductGroupData[]) => void
  close: (show: boolean) => void
}) => {
  const { setBrandsData } = useData()
  const [editName, setEditName] = useState<string>(data?.group_desc || '')
  const [names, setNames] = useState<string[]>([''])
  const [status, setStatus] = useState<React.ReactElement | null>()
  const [isConfirmed, setIsConfirmed] = useState(false)
  const setResult = (state: boolean, text?: string) => {
    state
      ? setStatus(
          <p className='text-[#0F973D] flex items-center gap-2'>
            عملیات موفقیت‌آمیز بود! <Grammerly size={24} color='#0F973D' />
          </p>
        )
      : setStatus(
          <p className='text-[#D42620] flex items-center gap-2'>
            {text} <Grammerly size={24} color='#D42620' />
          </p>
        )
  }
  const handleAddInput = () => {
    setNames([...names, ''])
  }

  const handleRemoveInput = (index: number) => {
    setNames((prev) => prev.filter((_, i) => i !== index))
  }

  const handleInputChange = (value: string, index: number) => {
    setNames((prev) => prev.map((item, i) => (i === index ? value : item)))
  }
  const rerenderData = async () => {
    await getProductGroupData().then((value) => {
      if (value) {
        setBrandsData(value.brands)
        setData(value.brands?.filter((brand) => brand.group_pid === parent.id))
      }
    })
  }
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsConfirmed(true)

    const accessToken = (await getCookieByKey('access_token')) || ''
    if (data?.group_desc)
      await EditProductGroup({
        accessToken,
        name: editName,
        group_id: data.id,
        group_pid: parent.id,
      }).then((value: Record<string, any> | undefined) => {
        if (value && value.status === 1) setResult(true)
        else setResult(false, value && value.message)
        setNames([])
      })
    else {
      if (names?.length > 0) {
        await Promise.all(
          names
            .filter((name) => name.length > 0) // فقط نام‌های معتبر
            .map(
              async (name) =>
                await CreateProductGroup({
                  accessToken,
                  name: name,
                  group_pid: parent.id,
                })
            )
        )
        setNames([])
        setResult(true)
      }
    }

    await rerenderData()
    setTimeout(() => {
      setIsConfirmed(false)
      setStatus(null)
    }, 3333)
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
              برند محصول جدید
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
            <div className='flex justify-between w-full'>
              <label className='text-base font-medium text-right text-[#8455D2] mb-2'>
                نام گروه محصول
              </label>
              {parent.group_desc}
            </div>
          </div>
          <div className='mt-2 w-full max-md:max-w-full'>
            {data?.group_desc ? (
              <div className={`mt-4`}>
                <label className='text-base font-medium text-right text-gray-800'>
                  نام برند محصول خود را بنویسید
                </label>
                <div className='flex items-center gap-2'>
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    type='text'
                    placeholder='مثال: فولیکا'
                    className='flex-1 border border-gray-300 rounded-lg px-4 py-2'
                  />
                </div>
              </div>
            ) : (
              names.map((name, index) => (
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
              ))
            )}
          </div>
          <div className='flex justify-end mt-3'>
            {!data && (
              <button
                type='button'
                onClick={handleAddInput}
                className='text-[#7747C0] font-bold hover:text-[#7747C0]'>
                افزودن برند +
              </button>
            )}
          </div>
          <div className='mt-10 w-full max-md:max-w-full'>
            <div className='flex items-center'>
              <button
                type='submit'
                style={{
                  animation: `${
                    isConfirmed
                      ? 'hideSubmitAnimate 1s ease-in-out forwards '
                      : 'showSubmitAnimate 1s ease-in-out forwards '
                  }`,
                }}
                className={`w-full fill-button px-10 h-10 mt-10 rounded-lg transition-transform duration-200 ease-in-out hover:scale-105`}>
                ثبت
              </button>

              <div
                className={`absolute ${
                  !isConfirmed && ' opacity-0 '
                } transform -translate-x-1/2 transition-all duration-1000 ease-in-out`}
                style={{
                  animation: `${
                    isConfirmed
                      ? 'showSuccessText 1s ease-in-out forwards '
                      : 'hideSuccessText 1s ease-in-out forwards '
                  }`,
                }}>
                {status}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
export default AddModal
