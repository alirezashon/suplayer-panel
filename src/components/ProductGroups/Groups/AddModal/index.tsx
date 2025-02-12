import { getCookieByKey } from '@/actions/cookieToken'
import { getProductGroupData } from '@/actions/setData'
import { useData } from '@/Context/Data'
import { CreateProductGroup, EditProductGroup } from '@/services/products'
import { CloseSquare, Grammerly, Trash } from 'iconsax-react'
import { FormEvent, useRef, useState } from 'react'
import { ProductGroupData } from '@/interfaces'
import { errorClass } from '@/app/assets/style'
import { useStates } from '@/Context/States'

const AddModal = ({
  data,
  close,
}: {
  data?: ProductGroupData
  close: (show: boolean) => void
}) => {
  const [errors, setErrors] = useState<Record<string, string | string[]>>({
    group_desc: '',
    brands: [],
  })
  const { setProductGroupData, setBrandsData } = useData()
  const [status, setStatus] = useState<React.ReactElement | null>()
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [groupDesc, setGroupDesc] = useState(data?.group_desc || '')
  const [brands, setBrands] = useState<string[]>([''])
  const { showModal } = useStates()

  const setResult = (state: boolean, text?: string) => {
    if (state) {
      setStatus(
        <p className='text-[#0F973D] flex items-center gap-2'>
          عملیات موفقیت‌آمیز بود! <Grammerly size={24} color='#0F973D' />
        </p>
      )
    } else {
      setStatus(
        <p className='text-[#D42620] flex items-center gap-2'>
          {text} <Grammerly size={24} color='#D42620' />
        </p>
      )
    }
  }

  const handleChangeInput =
    (index?: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      if (name === 'brands' && typeof index === 'number') {
        setBrands((prev) =>
          prev.map((brand, i) => (i === index ? value : brand))
        )
      } else {
        setGroupDesc(value)
      }
    }

  const handleAddInput = () => {
    setBrands((prev) => [...prev, ''])
  }

  const handleRemoveInput = (index: number) => {
    setBrands((prev) => prev.filter((_, i) => i !== index))
  }

  const handleInputChange = (value: string, index: number) => {
    setBrands((prev) => prev.map((item, i) => (i === index ? value : item)))
    const newErrors = { ...errors }
    if (!Array.isArray(newErrors.brands)) {
      newErrors.brands = []
    }
    if (brands.length > 1 && value.trim()) {
      newErrors.brands = newErrors.brands.filter((_, i) => i !== index)
      setErrors(newErrors)
    }
  }

  const rerenderData = async () => {
    await getProductGroupData().then((value) => {
      if (value) {
        setProductGroupData(value.productGroups)
        setBrandsData(value.brands)
      }
    })
  }
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string | string[]> = {}
    if (!groupDesc) newErrors.group_desc = 'این فیلد اجباریست'
    const emptyBrands = brands.filter((brand) => !brand.trim())
    if (emptyBrands.length > 0) newErrors.brands = 'تمام فیلدهای برند اجباریست'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    setIsConfirmed(true)
    const accessToken = (await getCookieByKey('access_token')) || ''
    if (data?.group_desc)
      await EditProductGroup({
        accessToken,
        name: groupDesc,
        group_id: data?.id,
      }).then(async (value) => {
        showModal({
          type: value.status === 1 ? 'success' : 'error',
          main: <p>{value.message}</p>,
          title: value.status === 1 ? 'موفق' : 'خطا',
          autoClose: 2,
        })
        if (value && value.status === 1) setResult(true)
        else setResult(false, value && value.message)
        await rerenderData()
      })
    else {
      await CreateProductGroup({
        accessToken,
        name: groupDesc,
      }).then(async (value) => {
        showModal({
          type: value.status === 1 ? 'success' : 'error',
          main: <p>{value.message}</p>,
          title: value.status === 1 ? 'موفق' : 'خطا',
          autoClose: 2,
        })
        if (value && value.status === 1) setResult(true)
        else setResult(false, value && value.message)
        if (value && value?.data?.regid)
          brands?.length > 0 &&
            (await Promise.all(
              brands.map(async (name) => {
                if (name.length > 0) {
                  const response = await CreateProductGroup({
                    accessToken,
                    name: name,
                    group_pid: value.data.regid,
                  })

                  if (response && response.status === 1) setResult(true)
                  else setResult(false, response && response.message)
                }
              })
            ))
        setBrands([])
        await rerenderData()
      })
    }
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
                name='group_desc'
                value={groupDesc}
                onChange={handleChangeInput()}
                className={`${errors.group_desc && errorClass}`}
                placeholder='نام گروه محصول'
              />
            </div>
          </div>
          <div className='mt-2 w-full max-md:max-w-full'>
            {brands.map((name, index) => (
              <div
                key={index}
                className={`mt-4 ${
                  index === brands.length - 1 && 'add-new-input-animated'
                }`}>
                <label className='text-base font-medium text-right text-gray-800'>
                  نام برند محصول خود را بنویسید
                </label>
                <div className='flex items-center gap-2'>
                  <input
                    name='brands'
                    value={name}
                    onChange={(e) => handleInputChange(e.target.value, index)}
                    type='text'
                    placeholder='مثال: فولیکا'
                    className={`${
                      errors?.brands && errors.brands[index] && errorClass
                    } flex-1 border border-gray-300 rounded-lg px-4 py-2`}
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
