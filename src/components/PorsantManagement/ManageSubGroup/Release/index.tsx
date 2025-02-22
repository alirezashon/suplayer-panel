// import { getCookieByKey } from '@/actions/cookieToken'
// import { useData } from '@/Context/Data'
// import { useStates } from '@/Context/States'
// import { AddDocFile } from '@/services/allocation'
// import { Printer, SearchNormal } from 'iconsax-react'
// import { useState } from 'react'

// const headers = [
//   'ردیف',
//   'نام ذی‌نفع',
//   'نام خانوادگی ذی‌نفع',
//   'اعتبار تخصیص داده شده',
//   'اعتبار آزادسازی شده',
//   'آزادسازی اعتبار',
//   'بارگذاری فایل محاسبه',
// ]

// const Release = () => {
//   const { beneficiaryData } = useData()
//   const { showModal } = useStates()
//   const [uploadStatus, setUploadStatus] = useState<
//     'idle' | 'uploading' | 'success' | 'error' | 'showImage'
//   >('idle')
//   const [progress, setProgress] = useState<number>(0)

//   const handleUploadFile = async (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const file = event.target.files?.[0]
//     if (
//       ![
//         'image/png',
//         'image/jpg',
//         'image/jpeg', // تصاویر
//         'application/vnd.ms-excel',
//         'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // اکسل
//         'application/msword',
//         'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // ورد
//         'application/vnd.ms-access', // اکسس
//         'text/csv', // CSV
//         'application/vnd.ms-powerpoint',
//         'application/vnd.openxmlformats-officedocument.presentationml.presentation', // پاورپوینت
//         'application/pdf', // پی‌دی‌اف
//         'text/html',
//         'application/xhtml+xml', // HTML
//       ].includes(`${file?.type}`)
//     ) {
//       showModal({
//         type: 'error',
//         main: <p>پسوند فایل قابل قبول نمی باشد</p>,
//         title: 'خطا',
//         autoClose: 2,
//       })
//       setUploadStatus('error')
//       return
//     }
//     if (file?.size && file?.size < 50000) {
//       showModal({
//         type: 'error',
//         main: <p>حجم فایل کمتر از حد مجاز است</p>,
//         title: 'خطا',
//         autoClose: 2,
//       })
//       setUploadStatus('error')
//       return
//     }
//     if (file?.size && file?.size > 2200000) {
//       showModal({
//         type: 'error',
//         main: <p>حجم فایل بیشتر از حد مجاز است</p>,
//         title: 'خطا',
//         autoClose: 2,
//       })
//       setUploadStatus('error')
//       return
//     }
//     if (file) {
//       const formData = new FormData()
//       console.log(file)
//       formData.append('file', file)

//       setUploadStatus('uploading')
//       const reader = new FileReader()
//       reader.onloadend = async () => {
//         try {
//           const newAvatarUrl = reader.result as string
//           setUploadStatus('showImage')
//           let progressValue = 0
//           const interval = setInterval(() => {
//             if (progressValue >= 100) {
//               clearInterval(interval)
//               setProgress(100)
//             } else {
//               progressValue += 10
//               setProgress(progressValue)
//             }
//           }, 200)
//           const accessToken = (await getCookieByKey('access_token')) || ''
//           const result = await AddDocFile({
//             src: formData,
//             accessToken,
//           })
//         } catch (error) {
//           setUploadStatus('error')
//           showModal({
//             type: 'error',
//             main: <p>خطا در بارگذاری</p>,
//             title: 'خطا',
//             autoClose: 2,
//           })
//           return error
//         }
//       }
//       reader.readAsDataURL(file)
//     }
//   }
//   return (
//     <div className='m-4'>
//       <div className='flex justify-between items-center mb-7'>
//         <p>
//           <span className='text-[#98A2B3]'>مدیریت پورسانت‌دهی </span> /
//           <span className='text-[#7747C0]'>
//             گروه مو / منطقه ۵ / آزادسازی گروهی
//           </span>
//         </p>
//       </div>
//       <div className='flex flex-col bg-white p-3'>
//         <div className='flex flex-col'>
//           <p className='text-[#8455D2]'>آزادسازی اعتبار تخصیص داده شده</p>

//           <div className='flex gap-5 items-center'>
//             <div className='relative w-full flex items-center'>
//               <div className='absolute left-3 z-20 cursor-pointer text-[#50545F]'>
//                 <SearchNormal size={24} color='gray' />
//               </div>

//               <input
//                 type='search'
//                 placeholder='جستجو'
//                 className='absolute w-full z-10 border border-gray-300 rounded-md px-4 py-2 text-right outline-none focus:border-red-400'
//               />
//             </div>
//             <button
//               type='submit'
//               className='border-button w-56 px-10 h-10 rounded-lg'>
//               جستجو
//             </button>
//           </div>
//           <div className='m-4'>
// <table className='my-10 w-full border-collapse border rounded-lg overflow-hidden'>
//   <thead>
//     <tr>
//       {headers.map((head, headIndex) => (
//         <th
//           className={`bg-[#F5F7F8] border-z h-10 ${
//             headIndex === 0
//               ? 'rounded-tr-lg'
//               : headIndex === headers.length - 1 && 'rounded-tl-lg'
//           } `}
//           key={headIndex}>
//           <p
//             className={`flex justify-center items-center border-y h-10  ${
//               headIndex === 0
//                 ? 'border-r rounded-tr-lg'
//                 : headIndex === headers.length - 1 &&
//                   'border-l rounded-tl-lg'
//             }`}>
//             {head}
//           </p>
//         </th>
//       ))}
//     </tr>
//   </thead>
//               <tbody>
//                 {beneficiaryData?.map((row, index) => (
//                   <tr key={index} className='border-b'>
//                     <td className='text-center px-4 py-2 border-r'>{index}</td>
//                     <td className='text-center px-4 py-2'>
//                       {row.visitor_name}
//                     </td>
//                     <td className='text-center px-4 py-2'>
//                       {row.visitor_family}
//                     </td>
//                     <td className='text-center px-4 py-2'>{row.visitor_tel}</td>
//                     <td className='text-center px-4 py-2'>10,000,000 ریال</td>
//                     <td className='text-center px-4 py-2'>
//                       <input
//                         placeholder='مبلغ آزادسازی را وارد کنید'
//                         className=' rounded px-2 py-1 w-full text-center'
//                       />
//                     </td>
//                     <td className='text-center px-4 py-2'>
//                       <label className='flex flex-col items-center gap-2 cursor-pointer w-full'>
//                         <input
//                           type='file'
//                           onChange={handleUploadFile}
//                           className='hidden'
//                         />

//                         {/* دکمه آپلود فایل */}
//                         <div className='w-full flex items-center justify-center border border-[#7747C0] text-[#7747C0] rounded-md px-4 py-2 text-sm transition-all duration-300 hover:bg-[#7747C0] hover:text-white'>
//                           {uploadStatus === 'uploading'
//                             ? 'در حال بارگذاری...'
//                             : 'بارگذاری فایل'}
//                         </div>

//                         {/* نمایش وضعیت‌های مختلف */}
//                         {uploadStatus === 'uploading' && (
//                           <div className='flex items-center gap-2 text-yellow-500'>
//                             <span className='animate-spin'>🔄</span> در حال
//                             آپلود...
//                           </div>
//                         )}

//                         {uploadStatus === 'success' && (
//                           <div className='flex items-center gap-2 text-green-500'>
//                             ✅ بارگذاری انجام شد
//                           </div>
//                         )}

//                         {uploadStatus === 'error' && (
//                           <div className='flex items-center gap-2 text-red-500'>
//                             ❌ بارگذاری انجام نشد
//                           </div>
//                         )}

//                         {/* نشانگر پیشرفت آپلود */}
//                         {uploadStatus === 'uploading' && (
//                           <div className='w-full bg-gray-200 rounded-full h-2 mt-2'>
//                             <div
//                               className='bg-[#7747C0] h-2 rounded-full transition-all duration-500'
//                               style={{ width: `${progress}%` }}></div>
//                           </div>
//                         )}
//                       </label>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//             <div className='flex items-center justify-between'>
//               <div className='flex text-[#7747C0] cursor-pointer'>
//                 <Printer size={22} color='#7747C0' />
//                 <p>چاپ لیست</p>
//               </div>
//               <div className='flex mt-4 gap-10 justify-end'>
//                 <button
//                   type='submit'
//                   className='fill-button px-10 h-10 rounded-lg w-56'>
//                   ثبت نهایی
//                 </button>
//                 <button
//                   type='submit'
//                   className='border-button px-10 h-10 rounded-lg w-56'>
//                   ذخیره آزادسازی
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Release

import { getCookieByKey } from '@/actions/cookieToken'
import { useData } from '@/Context/Data'
import { useStates } from '@/Context/States'
import { AddDocFile } from '@/services/allocation'
import { Printer, SearchNormal } from 'iconsax-react'
import { useState } from 'react'

const headers = [
  'ردیف',
  'نام ذی‌نفع',
  'نام خانوادگی ذی‌نفع',
  'اعتبار تخصیص داده شده',
  'اعتبار آزادسازی شده',
  'آزادسازی اعتبار',
  'بارگذاری فایل محاسبه',
]

const Release = () => {
  const { beneficiaryData } = useData()
  const { showModal } = useStates()
  const [uploadStatuses, setUploadStatuses] = useState<
    Record<
      string,
      { status: 'idle' | 'uploading' | 'success' | 'error'; progress: number }
    >
  >({})

  const [convertedata, setConvertedData] = useState<
    {
      visitor_tel: string
      visitor_name: string
      visitor_family: string
      source: string
    }[]
  >([])

  const handleDeleteFile = (visitorTel: string) => {
    setConvertedData((prev) =>
      prev.map((item) =>
        item.visitor_tel === visitorTel ? { ...item, source: '' } : item
      )
    )
    setUploadStatuses((prev) => ({
      ...prev,
      [visitorTel]: { status: 'idle', progress: 0 },
    }))
  }

  const handleUploadFile = async (
    event: React.ChangeEvent<HTMLInputElement>,
    visitorTel: string
  ) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    const allowedTypes = [
      'image/png',
      'image/jpg',
      'image/jpeg',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-access',
      'text/csv',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/pdf',
      'text/html',
      'application/xhtml+xml',
    ]

    const file = files[0] // فقط یک فایل را بررسی می‌کنیم

    if (!allowedTypes.includes(file.type)) {
      showErrorModal('پسوند فایل قابل قبول نمی‌باشد')
      setUploadStatuses((prev) => ({
        ...prev,
        [visitorTel]: { status: 'error', progress: 0 },
      }))
      return
    }

    if (file.size < 50000 || file.size > 2200000) {
      showErrorModal('حجم فایل باید بین 50KB و 2MB باشد')
      setUploadStatuses((prev) => ({
        ...prev,
        [visitorTel]: { status: 'error', progress: 0 },
      }))
      return
    }

    setUploadStatuses((prev) => ({
      ...prev,
      [visitorTel]: { status: 'uploading', progress: 0 },
    }))

    try {
      const formData = new FormData()
      formData.append('file', file)

      const accessToken = (await getCookieByKey('access_token')) || ''
      await AddDocFile({ src: formData, accessToken }).then((result) => {
        if (result && result.status !== '-1') {
          setConvertedData((prev) =>
            prev.map((item) =>
              item.visitor_tel === visitorTel
                ? { ...item, source: result?.rec_id_file }
                : item
            )
          )
          setUploadStatuses((prev) => ({
            ...prev,
            [visitorTel]: { status: 'success', progress: 100 },
          }))
        }
      })
    } catch (error) {
      setUploadStatuses((prev) => ({
        ...prev,
        [visitorTel]: { status: 'error', progress: 0 },
      }))
      showErrorModal('خطا در بارگذاری فایل')
    }
  }

  const showErrorModal = (message: string) => {
    showModal({
      type: 'error',
      main: <p>{message}</p>,
      title: 'خطا',
      autoClose: 2,
    })
  }

  const simulateProgress = (fileId: number) => {
    let progressValue = 0
    const interval = setInterval(() => {
      if (progressValue >= 100) {
        clearInterval(interval)
      } else {
        progressValue += 10
        setUploadStatuses((prev) => ({
          ...prev,
          [fileId]: { status: 'uploading', progress: progressValue },
        }))
      }
    }, 200)
  }

  return (
    <div className='m-4'>
      <div className='flex justify-between items-center mb-7'>
        <p>
          <span className='text-[#98A2B3]'>مدیریت پورسانت‌دهی </span> /
          <span className='text-[#7747C0]'>
            گروه مو / منطقه ۵ / آزادسازی گروهی
          </span>
        </p>
      </div>
      <div className='flex flex-col bg-white p-3'>
        <div className='flex flex-col'>
          <p className='text-[#8455D2]'>آزادسازی اعتبار تخصیص داده شده</p>

          <div className='flex gap-5 items-center'>
            <div className='relative w-full flex items-center'>
              <div className='absolute left-3 z-20 cursor-pointer text-[#50545F]'>
                <SearchNormal size={24} color='gray' />
              </div>

              <input
                type='search'
                placeholder='جستجو'
                className='absolute w-full z-10 border border-gray-300 rounded-md px-4 py-2 text-right outline-none focus:border-red-400'
              />
            </div>
            <button
              type='submit'
              className='border-button w-56 px-10 h-10 rounded-lg'>
              جستجو
            </button>
          </div>
          <div className='m-4'>
            <table className='my-10 w-full border-collapse border rounded-lg overflow-hidden'>
              <thead>
                <tr>
                  {headers.map((head, headIndex) => (
                    <th
                      className={`bg-[#F5F7F8] border-z h-10 ${
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
                {beneficiaryData?.map((row, index) => (
                  <tr key={row.visitor_tel} className='border-b'>
                    <td className='text-center px-4 py-2 border-r'>
                      {index + 1}
                    </td>
                    <td className='text-center px-4 py-2'>
                      {row.visitor_name}
                    </td>
                    <td className='text-center px-4 py-2'>
                      {row.visitor_family}
                    </td>
                    <td className='text-center px-4 py-2'>{row.visitor_tel}</td>
                    <td className='text-center px-4 py-2'>10,000,000 ریال</td>
                    <td className='text-center px-4 py-2'>
                      <input
                        placeholder='مبلغ آزادسازی را وارد کنید'
                        className='rounded px-2 py-1 w-full text-center'
                      />
                    </td>
                    <td className='text-center px-4 py-2'>
                      {row.latitude ? (
                        <label className='flex flex-col items-center gap-2 cursor-pointer w-full'>
                          <input
                            type='file'
                            onChange={(e) =>
                              handleUploadFile(e, row.visitor_tel)
                            }
                            className='hidden'
                          />
                          <div className='w-full flex items-center justify-center border border-[#7747C0] text-[#7747C0] rounded-md px-4 py-2 text-sm hover:bg-[#7747C0] hover:text-white'>
                            {uploadStatuses[row.visitor_tel]?.status ===
                            'uploading'
                              ? 'در حال بارگذاری...'
                              : 'بارگذاری فایل'}
                          </div>
                          {uploadStatuses[row.visitor_tel]?.status ===
                            'uploading' && (
                            <div className='w-full bg-gray-200 rounded-full h-2 mt-2'>
                              <div
                                className='bg-[#7747C0] h-2 rounded-full transition-all duration-500'
                                style={{
                                  width: `${
                                    uploadStatuses[row.visitor_tel]?.progress
                                  }%`,
                                }}></div>
                            </div>
                          )}
                        </label>
                      ) : (
                        <div className='flex items-center gap-2 text-green-500'>
                          ✅ بارگذاری انجام شد
                          <button
                            onClick={() => handleDeleteFile(row.visitor_tel)}
                            className='text-red-500'>
                            🗑
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className='flex items-center justify-between'>
              <div className='flex text-[#7747C0] cursor-pointer'>
                <Printer size={22} color='#7747C0' />
                <p>چاپ لیست</p>
              </div>
              <div className='flex mt-4 gap-10 justify-end'>
                <button
                  type='submit'
                  className='fill-button px-10 h-10 rounded-lg w-56'>
                  ثبت نهایی
                </button>
                <button
                  type='submit'
                  className='border-button px-10 h-10 rounded-lg w-56'>
                  ذخیره آزادسازی
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Release
