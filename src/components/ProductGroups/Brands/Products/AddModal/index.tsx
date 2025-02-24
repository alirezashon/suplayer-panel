import { getCookieByKey } from '@/actions/cookieToken'
import { getProductData } from '@/actions/setData'
import RadioTreeSelector from '@/components/shared/RadioTrees'
import { useData } from '@/Context/Data'
import { useStates } from '@/Context/States'
import { ProductGroupData, ProductsData } from '@/interfaces'
import { CreateProduct, EditProduct } from '@/services/products'
import { CloseSquare, Message, Trash } from 'iconsax-react'
import { useState } from 'react'

// const AddModal = ({
//   editData,
//   groupName,
//   brand,
//   close,
// }: {
//   editData?: ProductsData
//   groupName: string
//   brand: ProductGroupData
//   close: (show: boolean) => void
// }) => {
//   const { setProductData } = useData()
//   const { showModal } = useStates()
//   const [names, setNames] = useState<string[]>([editData?.ini_name || ''])
//   const [errors,setErrors] = useState<string[]>([])
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     const accessToken = (await getCookieByKey('access_token')) || ''

//     names.map(async (name) => {
//       if (!editData?.ini_name) {
//         await CreateProduct({ accessToken, name, id: brand.id }).then(
//           async (result) => {
//             showModal({
//               type: result.status === 1 ? 'success' : 'error',
//               main: <p>{result.message}</p>,
//               title: result.status === 1 ? 'موفق' : 'خطا',
//               autoClose: 2,
//             })
//             if (result.status === 1) {
//               await getProductData().then(
//                 (data) => data && setProductData(data)
//               )
//               close(false)
//             }
//           }
//         )
//       } else {
//         await EditProduct({ accessToken, name, id: editData.id }).then(
//           async (result) => {
//             showModal({
//               type: result.status === 1 ? 'success' : 'error',
//               main: <p>{result.message}</p>,
//               title: result.status === 1 ? 'موفق' : 'خطا',
//               autoClose: 2,
//             })
//             if (result.status === 1) {
//               await getProductData().then(
//                 (data) => data && setProductData(data)
//               )
//             }
//           }
//         )
//       }
//     })
//   }

//   return (
//     <div>
//       <div className='absolute bg-slate-600 opacity-50 w-full h-[200vh] z-50 top-0 right-0'></div>
//       <div
//         style={{ scrollbarWidth: 'none' }}
//         className={`fixed overflow-y-auto p-10 z-50 right-0 top-0 max-md:left-[0] max-md:w-[100%] w-[40vw] h-full bg-white border border-gray-300 shadow-lg transition-transform duration-300 ease-in-out right-side-animate
//      `}>
//         <form
//           onSubmit={handleSubmit}
//           className='flex flex-col bg-white max-w-[594px] pb-[852px] max-md:px-5 max-md:pb-24'>
//           <div className='flex justify-between items-center w-full text-xl font-medium text-right text-gray-800 max-md:max-w-full'>
//             <div className='flex-1 shrink self-stretch my-auto min-w-[240px] max-md:max-w-full'>
//               محصول جدید
//             </div>
//             <div
//               className='
//            '>
//               <CloseSquare
//                 size={24}
//                 cursor='pointer'
//                 color='#50545F'
//                 onClick={() => close(false)}
//               />
//             </div>
//           </div>
//           <div className='flex justify-between mt-5'>
//             <p className='text-[#8455D2]'>گروه محصول</p>
//             <p>{groupName}</p>
//           </div>
//           <div className='flex justify-between mt-3'>
//             <p className='text-[#8455D2]'>برند محصول</p>
//             <p>{brand.group_desc}</p>
//           </div>
//           <div className='flex justify-center mt-5 p-2 rounded-lg gap-2 bg-[#E2F1FC]'>
//             <Message color='#1D91CC' size={22} />
//             <p>محصولات مرتبط به این گروه را در قسمت زیر اضافه کنید.</p>
//           </div>
//           {names.map((name, index) => (
//             <div
//               className={`mt-7 w-full flex gap-5 ${
//                 index === names.length - 1 && 'add-new-input-animated'
//               }`}
//               key={index}>
//               <div className='flex flex-col w-full'>
//                 <label className='text-base font-medium text-right text-gray-800'>
//                   نام محصول
//                 </label>
//                 <div className='flex items-center gap-3'>
//                   <input
//                     className='w-full'
//                     defaultValue={name}
//                     onChange={(e) =>
//                       setNames((prev) =>
//                         prev.map((item, i) =>
//                           i === index ? e.target.value : item
//                         )
//                       )
//                     }
//
//                     placeholder='نام  محصول'
//                   />
//                   {index > 0 && (
//                     <div className='flex items-center h-max'>
//                       <Trash
//                         size={24}
//                         color='#D42620'
//                         cursor={'pointer'}
//                         onClick={() => {
//                           setNames((prv) =>
//                             prv.filter((_, prvIndex) => prvIndex !== index)
//                           )
//                         }}
//                       />
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//           {!editData?.ini_name && (
//             <div className='flex justify-end my-5'>
//               <p
//                 className='text-[#7747C0] cursor-pointer'
//                 onClick={() => setNames((prv) => [...prv, ''])}>
//                 + محصول جدید
//               </p>
//             </div>
//           )}
//           <div className='mt-10 w-full max-md:max-w-full'>
//             <button
//               type='submit'
//               className={`fill-button px-10 h-10 rounded-lg  w-full`}>
//               ثبت
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }
// export default AddModal

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
  const { showModal, selectedProductData, setSelectedProductData } = useStates()
  const { systemTypes } = useData()
  const [names, setNames] = useState<string[]>([editData?.ini_name || ''])
  const [selectedType, setSelectedType] = useState<number>(0)
  const [errors, setErrors] = useState<boolean[]>(
    new Array(names.length).fill(false)
  )
  const handleInputChange = (index: number, value: string) => {
    setNames((prev) => prev.map((item, i) => (i === index ? value : item)))
    setErrors((prev) =>
      prev.map((err, i) => (i === index ? value.trim() === '' : err))
    )
  }
  const callbackData = async () => {
    const data = await getProductData()
    if (data) {
      const filteredData = data.filter(
        (item) => `${item.group_id}` === `${selectedProductData?.brand?.id}`
      ) as ProductsData[]

      if (filteredData.length > 0)
        setSelectedProductData({
          data: filteredData,
          brand: selectedProductData?.brand as ProductGroupData,
          group: selectedProductData?.group as ProductGroupData,
        })
    }
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // بررسی اینکه هیچ فیلدی خالی نباشد
    const newErrors = names.map((name) => name.trim() === '')
    setErrors(newErrors)
    if (newErrors.includes(true)) return // اگر خطا وجود داشت، ارسال متوقف شود

    const accessToken = (await getCookieByKey('access_token')) || ''
    await Promise.all(
      names.map(async (name) => {
        if (!editData?.ini_name) {
          await CreateProduct({
            accessToken,
            name,
            id: brand.id,
            prd_chart_id: selectedType,
          }).then(async (result) => {
            showModal({
              type: result?.status === 1 ? 'success' : 'error',
              main: <p>{result?.message}</p>,
              title: result?.status === 1 ? 'موفق' : 'خطا',
              autoClose: 2,
            })
            if (result?.status === 1) {
              callbackData()
              close(false)
            }
          })
        } else {
          await EditProduct({ accessToken, name, id: editData.id }).then(
            async (result) => {
              showModal({
                type: result.status === 1 ? 'success' : 'error',
                main: <p>{result.message}</p>,
                title: result.status === 1 ? 'موفق' : 'خطا',
                autoClose: 2,
              })
              if (result.status === 1) {
                const data = await getProductData()
                if (data) {
                  callbackData()
                  close(false)
                }
              }
            }
          )
        }
      })
    )
  }

  return (
    <div>
      <div className='absolute bg-slate-600 opacity-50 w-full h-[200vh] z-50 top-0 right-0'></div>
      <div className='fixed overflow-y-auto p-10 z-50 right-0 top-0 max-md:left-[0] max-md:w-[100%] w-[40vw] h-full bg-white border border-gray-300 shadow-lg transition-transform duration-300 ease-in-out right-side-animate'>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col bg-white  max-md:px-5 max-md:pb-24'>
          <div className='flex justify-between items-center w-full text-xl font-medium text-right text-gray-800 max-md:max-w-full'>
            <div className='flex-1 shrink self-stretch my-auto min-w-[240px] max-md:max-w-full'>
              محصول جدید
            </div>
            <div className=' '>
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
          <div className='mt-10'>
            {systemTypes?.groupTypes && (
              <RadioTreeSelector
                trees={systemTypes?.productTypes}
                placeholder='انتخاب دسته بندی سیستمی'
                onSelect={(value: string) =>
                  setSelectedType(parseInt(`${value}`))
                }
              />
            )}
          </div>
          {names.map((name, index) => (
            <div className='mt-7 w-full flex gap-5' key={index}>
              <div className='flex flex-col w-full'>
                <label className='text-base font-medium text-right text-gray-800'>
                  نام محصول
                </label>
                <div className='flex items-center gap-3'>
                  <input
                    className={`w-full border ${
                      errors[index] ? 'border-red-500' : 'border-gray-300'
                    }`}
                    value={name}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    placeholder='نام محصول'
                  />
                  {index > 0 && (
                    <Trash
                      size={24}
                      color='#D42620'
                      cursor={'pointer'}
                      onClick={() => {
                        setNames((prev) => prev.filter((_, i) => i !== index))
                        setErrors((prev) => prev.filter((_, i) => i !== index))
                      }}
                    />
                  )}
                </div>
                {errors[index] && (
                  <p className='text-red-500 text-sm mt-1'>
                    نام محصول نباید خالی باشد
                  </p>
                )}
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
          <button
            type='submit'
            className='fill-button px-10 h-10 rounded-lg w-full mt-10'>
            ثبت
          </button>
        </form>
      </div>
    </div>
  )
}
export default AddModal
