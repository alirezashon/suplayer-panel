import { getCookieByKey } from '@/actions/cookieToken'
import { useData } from '@/Context/Data'
import { useMenu } from '@/Context/Menu'
import { useStates } from '@/Context/States'
import { setComma } from '@/hooks/NumberFormat'
import { generateAllocationSignature } from '@/hooks/Signature'
import { ReleaseAllocatedInterface } from '@/interfaces'
import { AddDocFile } from '@/services/allocation'
import { Printer, SearchNormal, TickCircle, Trash } from 'iconsax-react'
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
  const {
    showModal,
    selectedSubGroupData,
    selectedGroupData,
    setSelectedGroupData,
  } = useStates()
  const { setMenu } = useMenu()
  const [uploadStatuses, setUploadStatuses] = useState<
    Record<
      string,
      { status: 'idle' | 'uploading' | 'success' | 'error'; progress: number }
    >
  >({})
  const [releaseData, setReleaseData] = useState<ReleaseAllocatedInterface[]>(
    []
  )
  const [commaAmount, setCommaAmount] = useState<
    { id: string; value: string }[]
  >([])
  const [, setConvertedData] = useState<
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
      return error
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

  const handleCreditChange = (id: string, value: string) => {
    // حذف کاماهای اضافی
    const cleanValue = value.replace(/,/g, '')

    // بررسی مقدار جدید که فقط عدد باشد
    if (!/^\d*$/.test(cleanValue)) return

    // به‌روزرسانی مقدار `releaseData`
    setReleaseData((prev) => {
      const existingIndex = prev.findIndex((item) => item.visitor_uid === id)

      if (cleanValue === '') {
        return prev.filter((item) => item.visitor_uid !== id)
      }

      if (existingIndex !== -1) {
        return prev.map((item, index) =>
          index === existingIndex
            ? { ...item, amount: parseInt(cleanValue, 10) }
            : item
        )
      }

      const newItem: ReleaseAllocatedInterface = {
        commission_type: 0,
        source_type: 1,
        sup_group_code: selectedGroupData?.sup_group_code as string,
        supervisor_code: selectedSubGroupData?.supervisor_code as string,
        visitor_uid: id,
        amount: parseInt(cleanValue, 10), // مقدار `amount` را به `number` تبدیل کنید
        currency_type: 241,
        ref_allocation_uid: '',
        allocation_type: NaN,
        Signature: generateAllocationSignature({
          amount: cleanValue,
          customerMobile: id,
          sup_group_code: selectedGroupData?.sup_group_code as string,
          supervisor_code: selectedSubGroupData?.supervisor_code as string,
          visitor_uid: id,
        }),
      }
      return [...prev, newItem]
    })

    // به‌روزرسانی مقدار `commaAmount`
    setCommaAmount((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === id)
      const formattedValue = setComma(cleanValue)

      if (existingIndex !== -1) {
        return prev.map((item, index) =>
          index === existingIndex ? { ...item, value: formattedValue } : item
        )
      }
      return [...prev, { id, value: formattedValue }]
    })
  }

  return (
    <div className='m-4'>
      <div className='flex justify-between items-center mb-7'>
        <p>
          <span
            className='text-[#98A2B3] cursor-pointer'
            onClick={() => {
              setMenu('porsant')
              location.hash = 'porsant'
              setSelectedGroupData(null)
            }}>
            مدیریت پورسانت‌دهی/
          </span>
          <span
            className='text-[#98A2B3] cursor-pointer'
            onClick={() => {
              setMenu('porsant')
              location.hash = 'porsant'
            }}>
            {selectedGroupData?.sup_group_name}/
          </span>
          <span
            className='text-[#98A2B3] cursor-pointer'
            onClick={() => {
              setMenu('porsantmanagement')
              location.hash = 'porsantmanagement'
            }}>
            {selectedSubGroupData?.supervisor_name}/
          </span>
          <span className='text-[#7747C0]'> آزادسازی گروهی </span>
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
                      {row.visitor_family ? (
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
                        <div className='flex items-center gap-2 '>
                          <TickCircle size={24} color='#0F973D' />
                          بارگذاری انجام شد
                          <Trash
                            size={24}
                            onClick={() => handleDeleteFile(row.visitor_tel)}
                            color='#B2BBC7'
                            className='cursor-pointer'
                          />
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
