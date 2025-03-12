import { getCookieByKey } from '@/actions/cookieToken'
import { getReleasedList } from '@/actions/setData'
import OtpModal from '@/components/shared/OtpModal'
import { useData } from '@/Context/Data'
import { useMenu } from '@/Context/Menu'
import { useStates } from '@/Context/States'
import { setComma } from '@/hooks/NumberFormat'
import { generateAllocationSignature } from '@/hooks/Signature'
import {
  BeneficiaryData,
  FinalReleaseInterface,
  ReleaseAllocatedInterface,
} from '@/interfaces'
import {
  AddDocFile,
  ChangeReleaseStatus,
  ReleaseAllocatedList,
} from '@/services/allocation'
import { Printer, SearchNormal, TickCircle, Trash } from 'iconsax-react'
import { useCallback, useEffect, useState } from 'react'

const headers = [
  'ردیف',
  'نام ذی‌نفع',
  'نام خانوادگی ذی‌نفع',
  'اعتبار تخصیص داده شده',
  'اعتبار آزادسازی نشده',
  'آزادسازی اعتبار',
  'بارگذاری فایل محاسبه',
]

type TableDataType = Partial<BeneficiaryData> & {
  allocatedAmount: string
  remain_amount: string
  newReleaseAmount: string
  fileId: string
  disable: boolean
}
const Release = () => {
  const { beneficiaryData, allocationList, releasedList, setReleasedList } =
    useData()
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
  const [finalReleaseData, setFinalReleaseData] = useState<
    FinalReleaseInterface[]
  >([])
  const [data, setData] = useState<TableDataType[]>([])
  const [otp, setOtp] = useState<string>()
  const [showOtpModal, setshowOtpModal] = useState<boolean>(false)

  const calculateFinalData = useCallback(() => {
    const finalRelease: FinalReleaseInterface[] = []
    const subGroupAllocatedList = releasedList?.filter(
      (release) =>
        release?.wstatus === 0 &&
        release?.supervisor_code === selectedSubGroupData?.supervisor_code
    )
    subGroupAllocatedList?.forEach((row) => {
      // const matchedRelease = releasedList?.find(
      //   (release) =>
      //     release.visitor_uid === row.visitor_tel && release.wstatus === 0
      // )
      if (row) {
        finalRelease.push({
          commission_allocation_uid: row.commission_release_uid,
          status: 1,
          wamount: row.amount,
          allocation_status_id_file: `${row.allocation_status_id_file}`,
          assignment_otp: '',
          Signature: generateAllocationSignature({
            amount: `${row.amount}`,
            customerMobile: row.visitor_uid,
            sup_group_code: selectedGroupData?.sup_group_code as string,
            supervisor_code: selectedSubGroupData?.supervisor_code as string,
            visitor_uid: row.visitor_uid,
          }),
        })
      }
    })
    setFinalReleaseData(finalRelease)
  }, [])
  const calculateData = useCallback(() => {
    if (allocationList && data.length < 1) {
      const subGroupAllocatedList = allocationList?.filter(
        (allocate) =>
          allocate?.supervisor_code === selectedSubGroupData?.supervisor_code
      )
      const allocated = subGroupAllocatedList
        .filter((allocate) => allocate.wstatus === 1)
        .map((allocate) => ({
          visitor_name: beneficiaryData?.find(
            (beneficiary) => beneficiary.visitor_uid === allocate?.visitor_uid
          )?.visitor_name,
          visitor_family: beneficiaryData?.find(
            (beneficiary) => beneficiary.visitor_uid === allocate?.visitor_uid
          )?.visitor_family,
          visitor_tel: allocate.visitor_uid,
          allocatedAmount: setComma(`${allocate.allocated_amount}`),
          remain_amount: setComma(`${allocate.remain_amount}`),
          newReleaseAmount:
            releasedList
              ?.filter(
                (release) =>
                  release.wstatus === 0 &&
                  release.supervisor_code ===
                    selectedSubGroupData?.supervisor_code
              )
              ?.find((final) => final?.visitor_uid === allocate?.visitor_uid)
              ?.amount.toString() || '',
          fileId: '',
          disable: Boolean(
            releasedList
              ?.filter(
                (release) =>
                  release.wstatus === 0 &&
                  release.supervisor_code ===
                    selectedSubGroupData?.supervisor_code
              )
              ?.find((final) => final?.visitor_uid === allocate?.visitor_uid)
          ),
        }))
      setData(allocated)
    }
  }, [])
  useEffect(() => {
    if (!selectedGroupData) {
      location.hash = 'porsant'
      setMenu('porsant')
    }
    calculateData()
    calculateFinalData()
  }, [setMenu, selectedGroupData, calculateData, calculateFinalData])

  const handleDeleteFile = (visitorTel: string) => {
    setData((prev) =>
      prev.map((item) =>
        item.visitor_tel === visitorTel ? { ...item, fileId: '' } : item
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

    // مقداردهی اولیه
    let progress = 0

    // ایجاد یک اینتروال برای افزایش مقدار progress
    const interval = setInterval(() => {
      setUploadStatuses((prev) => {
        const newProgress = Math.min(prev[visitorTel].progress + 10, 100) // افزایش ۱۰٪ در هر ۳۰۰ms
        return {
          ...prev,
          [visitorTel]: { status: 'uploading', progress: newProgress },
        }
      })
      progress += 10
      if (progress >= 100) {
        clearInterval(interval)
      }
    }, 300)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const accessToken = (await getCookieByKey('access_token')) || ''
      await AddDocFile({ src: formData, accessToken }).then((result) => {
        if (result && result.status !== '-1') {
          setData((prev) =>
            prev.map((last) =>
              last.visitor_tel === visitorTel
                ? { ...last, fileId: result?.rec_id_file }
                : last
            )
          )
          setFinalReleaseData((prev) =>
            prev.map((last) =>
              releasedList?.find(
                (release) =>
                  release.commission_release_uid ===
                  last.commission_allocation_uid
              )?.visitor_uid === visitorTel
                ? { ...last, fileId: result?.rec_id_file }
                : last
            )
          )
          clearInterval(interval) // متوقف کردن اینتروال وقتی آپلود کامل شد

          setUploadStatuses((prev) => ({
            ...prev,
            [visitorTel]: { status: 'success', progress: 100 },
          }))
        }
      })
    } catch (error) {
      clearInterval(interval) // در صورت بروز خطا اینتروال را متوقف کن

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
      autoClose: 1,
    })
  }

  const handleCreditChange = (id: string, value: string) => {
    // حذف کاماهای اضافی
    const cleanValue = value.replace(/,/g, '')
    if (!/^\d*$/.test(cleanValue)) return

    const parsedValue = cleanValue ? parseInt(cleanValue, 10) : ''
    setData((prev) => {
      const updatedData = prev.map((last) =>
        last.visitor_tel === id
          ? {
              ...last,
              newReleaseAmount: parsedValue !== '' ? `${parsedValue}` : '',
            }
          : last
      )
      return updatedData
    })

    setReleaseData((prev) => {
      const existingIndex = prev.findIndex((item) => item.visitor_uid === id)

      if (parsedValue === '') {
        return prev.filter((item) => item.visitor_uid !== id)
      }

      if (existingIndex !== -1) {
        return prev.map((item, index) =>
          index === existingIndex ? { ...item, amount: parsedValue } : item
        )
      }

      const newItem: ReleaseAllocatedInterface = {
        commission_type: 1,
        source_type: 1,
        sup_group_code: selectedGroupData?.sup_group_code as string,
        supervisor_code: selectedSubGroupData?.supervisor_code as string,
        visitor_uid: id,
        amount: parsedValue,
        currency_type: 241,
        ref_allocation_uid:
          allocationList?.find((allocated) => allocated.visitor_uid === id)
            ?.commission_allocation_uid || '',
        allocation_type: 1,
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
  }
  const releasingData = async () => {
    if (releaseData.length < 1) {
      showErrorModal('لیست شما خالی است')
      return
    }
    const accessToken = await getCookieByKey('access_token')
    await ReleaseAllocatedList({ accessToken, data: releaseData }).then(
      async (result) => {
        if (result && result?.status === 1) {
          await getReleasedList().then((result) => {
            if (result) {
              setReleasedList(result)
              calculateData()
              calculateFinalData()
            }
          })
          setReleaseData([])
          setData((prv) =>
            prv.map((last) => ({ ...last, newReleaseAmount: '' }))
          )
          showModal({
            type: 'success',
            title: 'موفق',
            main: result?.message,
            autoClose: 1,
          })
        } else showErrorModal(result?.message || 'خطای ارتباط با سرور')
      }
    )
  }
  const changeReleasedStatus = async () => {
    if (finalReleaseData?.length < 1) return
    if (!otp || otp?.length < 5) {
      showModal({
        main: 'کد صحیح نیست',
        title: 'خطا',
        type: 'error',
        autoClose: 1,
        hideButton: true,
      })
      return
    }

    const accessToken = (await getCookieByKey('access_token')) || ''
    await ChangeReleaseStatus({
      accessToken,
      status_updates: finalReleaseData.map((allocated) => ({
        ...allocated,
        assignment_otp: `${otp}`,
      })),
    }).then(async (result) => {
      showModal({
        title: result?.status === 1 ? 'موفق' : 'ناموفق',
        type: result?.status === 1 ? 'success' : 'error',
        main: result?.message || 'خطایی رخ داد',
        autoClose: 1,
      })
      await getReleasedList().then((result) => {
        if (result) {
          setReleasedList(result)
          setshowOtpModal(false)
        }
      })
    })
  }
  return (
    <div className='m-4'>
      {showOtpModal && (
        <OtpModal
          setOtp={setOtp}
          title='ثبت نهایی آزادسازی اعتبار'
          close={() => setshowOtpModal(false)}
          submit={changeReleasedStatus}
        />
      )}
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
                {data.length > 0 &&
                  data?.map((row, index) => (
                    <tr key={index} className='border-b'>
                      <td className='text-center px-4 py-2 border-r'>
                        {index + 1}
                      </td>
                      <td className='text-center px-4 py-2'>
                        {row.visitor_name}
                      </td>
                      <td className='text-center px-4 py-2'>
                        {row.visitor_family}
                      </td>
                      <td className='text-center px-4 py-2'>
                        {row?.allocatedAmount} ریال
                      </td>
                      <td className='text-center px-4 py-2'>
                        {row?.remain_amount} ریال
                      </td>
                      <td className='text-center px-4 py-2'>
                        <input
                          inputMode='numeric'
                          maxLength={21}
                          value={setComma(row.newReleaseAmount)}
                          disabled={row?.disable}
                          onChange={(e) => {
                            // e.target.value =
                            //   e.target.value.replace(/,/g, '')

                            handleCreditChange(
                              `${row.visitor_tel}`,
                              e.target.value
                            )
                          }}
                          className='border-none rounded px-2 py-1 w-full text-center'
                          placeholder='مبلغ آزادسازی را وارد کنید'
                        />
                      </td>
                      <td className='text-center px-4 py-2 border-l'>
                        {row.fileId.length < 1 ? (
                          <label className='flex flex-col items-center gap-2 cursor-pointer w-full'>
                            <input
                              disabled={!row.disable}
                              type='file'
                              onChange={(e) =>
                                handleUploadFile(e, `${row.visitor_tel}`)
                              }
                              className='hidden'
                            />
                            <div className='w-full flex items-center justify-center border border-[#7747C0] text-[#7747C0] rounded-md px-4 py-2 text-sm hover:bg-[#7747C0] hover:text-white'>
                              {uploadStatuses[`${row.visitor_tel}`]?.status ===
                              'uploading'
                                ? 'در حال بارگذاری...'
                                : 'بارگذاری فایل'}
                            </div>
                            {uploadStatuses[`${row.visitor_tel}`]?.status ===
                              'uploading' && (
                              <div className='w-full bg-gray-200 rounded-full h-2 mt-2'>
                                <div
                                  className='bg-[#7747C0] h-2 rounded-full transition-all duration-500'
                                  style={{
                                    width: `${
                                      uploadStatuses[`${row.visitor_tel}`]
                                        ?.progress
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
                              onClick={() =>
                                handleDeleteFile(`${row.visitor_tel}`)
                              }
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
                  onClick={releasingData}
                  className='border-button px-10 h-10 rounded-lg '>
                  ذخیره پیش نویس آزادسازی
                </button>
                <button
                  onClick={() => {
                    if (finalReleaseData.length > 0) setshowOtpModal(true)
                    else
                      showModal({
                        type: 'error',
                        main: 'ابتدا لیست را در پیش نویس ذخیره کنید',
                        title: 'خطا',
                        autoClose: 1,
                      })
                  }}
                  className='fill-button px-10 h-10 rounded-lg w-56'>
                  ثبت نهایی
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
