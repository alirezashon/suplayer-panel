import { getCookieByKey } from '@/actions/cookieToken'
import { getAllocatedList } from '@/actions/setData'
import { walletBoxStyle } from '@/app/assets/style'
import Loading from '@/components/shared/LoadingSpinner'
import OtpModal from '@/components/shared/OtpModal'
import { useData } from '@/Context/Data'
import { useMenu } from '@/Context/Menu'
import { useStates } from '@/Context/States'
import { setComma } from '@/hooks/NumberFormat'
import { generateAllocationSignature } from '@/hooks/Signature'
import {
  DefineAllocationInterface,
  SaveAllocatedDataInterface,
} from '@/interfaces'
import { ChangeAllocationStatus, DefineAllocation } from '@/services/allocation'
import { Printer, WalletMoney } from 'iconsax-react'
import { useEffect, useState } from 'react'

const headers = [
  'ردیف',
  'نام ذی‌نفع',
  'نام خانوادگی ذی‌نفع',
  'شماره موبایل ذی‌نفع',
  'اعتبار قابل تخصیص',
]
const Allocation = () => {
  const [filterType, setFilterType] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>()
  const [allocatedData, setAllocatedData] = useState<
    SaveAllocatedDataInterface[]
  >([])
  const [uneditableIds, setUneditableIds] = useState<string[]>([])
  const [allocationData, setAllocationData] = useState<
    DefineAllocationInterface[]
  >([])
  const [commaAmount, setCommaAmount] = useState<
    { id: string; value: string }[]
  >([])
  const [otp, setOtp] = useState<string>()
  const [showOtpModal, setshowOtpModal] = useState<boolean>(false)
  const { setMenu } = useMenu()
  const { beneficiaryData, balance, allocationList, setAllocationList } =
    useData()
  const {
    selectedSubGroupData,
    selectedGroupData,
    setSelectedGroupData,
    showModal,
    submitting,
    setSubmitting,
    permissions,
  } = useStates()

  useEffect(() => {
    if (!selectedGroupData) {
      location.hash = 'porsant'
      setMenu('porsant')
    }
    if (!allocationList) return

    // ست کردن allocatedData
    const allocated = allocationList
      .filter((allocate) => allocate.wstatus === 0)
      .map((allocate) => ({
        commission_allocation_uid: allocate.commission_allocation_uid,
        status: 1,
        wamount: allocate.remain_amount,
        allocation_status_id_file: allocate.allocation_status_id_file || '',
        assignment_otp: '',
        Signature: '',
      }))

    setAllocatedData(allocated as SaveAllocatedDataInterface[])

    const uneditableIds: string[] = []
    const newCommaAmount: { id: string; value: string }[] = []

    allocationList
      .filter((allocate) => allocate.wstatus === 0)
      .forEach((allocate) => {
        uneditableIds.push(allocate.visitor_uid)
        newCommaAmount.push({
          id: allocate.visitor_uid,
          value: setComma(allocate.allocated_amount.toString()), // مقدار اولیه `commaAmount`
        })
      })

    setUneditableIds(uneditableIds)
    setCommaAmount(newCommaAmount) // مقداردهی مقدار اولیه `commaAmount`
  }, [setMenu, selectedGroupData, allocationList, selectedSubGroupData])

  const handleCreditChange = (id: string, value: string) => {
    // حذف کاماهای اضافی
    const cleanValue = value.replace(/,/g, '')

    // بررسی مقدار جدید که فقط عدد باشد
    if (!/^\d*$/.test(cleanValue)) return

    // به‌روزرسانی مقدار `allocationData`
    setAllocationData((prev) => {
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

      const newItem: DefineAllocationInterface = {
        commission_type: 0,
        allocation_type: 0,
        source_type: 1,
        sup_group_code: selectedGroupData?.sup_group_code as string,
        supervisor_code: selectedSubGroupData?.supervisor_code as string,
        visitor_uid: id,
        amount: parseInt(cleanValue, 10), // مقدار `amount` را به `number` تبدیل کنید
        currency_type: 241,
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

  const allocateData = async () => {
    if (allocationData?.length < 1) {
      showModal({
        title: '',
        main: <p>لیست مبالغ خالی است</p>,
        type: 'error',
        autoClose: 1,
      })
      return
    }
    setLoading(true)
    const accessToken = (await getCookieByKey('access_token')) || ''
    await DefineAllocation({ accessToken, allocations: allocationData }).then(
      async (result) => {
        setLoading(false)
        if (result?.status === 1) {
          setAllocationData([])
          showModal({
            title: 'موفق',
            type: 'success',
            main: <p>درخواست شما ثبت شد.</p>,
            autoClose: 1,
          })
          await getAllocatedList().then(
            (result) => result && setAllocationList(result)
          )
        } else
          showModal({
            title: 'ناموفق',
            type: 'error',
            main: <p>{result?.message || 'خطایی رخ داد.'}</p>,
            autoClose: 1,
          })
      }
    )
  }
  const changeAllocateStatus = async () => {
    setSubmitting(true)
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
    await ChangeAllocationStatus({
      accessToken,
      status_updates: allocatedData.map((allocated) => ({
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
      setSubmitting(false)
      await getAllocatedList().then((result) => {
        if (result) {
          setAllocationList(result)
          setshowOtpModal(false)
        }
      })
    })
  }
  return (
    <>
      {permissions[1].includes('749') && (
        <div className='m-4'>
          {showOtpModal && !submitting && (
            <OtpModal
              setOtp={setOtp}
              title='ثبت نهایی تخصیص اعتبار'
              close={() => setshowOtpModal(false)}
              submit={changeAllocateStatus}
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
              <span className='text-[#7747C0]'> تخصیص گروهی </span>
            </p>
          </div>
          <div className='flex flex-col bg-white p-3'>
            <div className='flex flex-col w-[50%] mx-auto justify-between h-fit mb-6'>
              <h3 className='text-gray-700 text-lg font-bold flex items-center gap-2 mb-2'>
                <WalletMoney size='20' color='#704CB9' />
                کیف پول
              </h3>
              <div style={walletBoxStyle} className='flex-1 shadow-md'>
                <h3 className='text-gray-700 text-lg font-bold flex items-center gap-2 mb-2'>
                  <WalletMoney size='20' color='#704CB9' />
                  کیف پول شما
                </h3>
                <p className='flex justify-between text-gray-500'>
                  اعتبار قابل تخصیص <br />
                  <span className='text-gray-800 font-semibold text-lg'>
                    {balance?.Releasable || 0} ریال
                  </span>
                </p>
              </div>
            </div>
            <div className='flex flex-col'>
              <p className='text-[#8455D2]'>تخصیص اعتبار به صورت</p>
              <div className='flex gap-10 my-5'>
                {['مساوی', 'دستی', 'بر اساس وزن '].map((beneficiary, index) => (
                  <div className='' key={index}>
                    <label className='flex items-center gap-3 cursor-pointer'>
                      <input
                        type='radio'
                        defaultChecked={filterType === index}
                        name='beneficiary'
                        value={beneficiary}
                        onChange={() => setFilterType(index === 0 ? 1 : 2)}
                        className='w-5 h-5 cursor-pointer accent-[#7747C0]'
                      />
                      <span className='text-gray-700'>{beneficiary}</span>
                    </label>
                  </div>
                ))}
              </div>
              <div className='m-4'>
                <table className='my-10 w-full border-collapse border border-gray-200 printable-table '>
                  <thead>
                    <tr>
                      {headers.map((head, headIndex) => (
                        <th
                          key={headIndex}
                          className={`bg-[#F5F7F8] border border-gray-300 px-4 py-2 text-center ${
                            headIndex === 0
                              ? 'rounded-tr-lg'
                              : headIndex === headers.length - 1 &&
                                'rounded-tl-lg'
                          }`}>
                          {head}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {beneficiaryData
                      ?.filter(
                        (item) =>
                          item?.supervisor_id ===
                          selectedSubGroupData?.supervisor_id
                      )
                      ?.map((row, index) => (
                        <tr key={index} className='border-b'>
                          <td className='text-center px-4 py-2 border-r'>
                            {index}
                          </td>
                          <td className='text-center px-4 py-2'>
                            {row.visitor_name}
                          </td>
                          <td className='text-center px-4 py-2'>
                            {row.visitor_family}
                          </td>
                          <td className='text-center px-4 py-2'>
                            {row.visitor_tel}
                          </td>
                          <td className='text-center px-4 py-2'>
                            <input
                              inputMode='numeric'
                              maxLength={21}
                              value={
                                commaAmount.find(
                                  (item) => item.id === row.visitor_uid
                                )?.value || ''
                              }
                              placeholder='مبلغ اعتبار را وارد کنید'
                              onChange={(e) => {
                                handleCreditChange(
                                  row.visitor_uid,
                                  e.target.value
                                )
                              }}
                              disabled={uneditableIds.includes(row.visitor_uid)}
                              className={`border-none rounded px-2 py-1 w-full text-center ${
                                uneditableIds.includes(row.visitor_uid)
                                  ? 'bg-gray-100 cursor-not-allowed'
                                  : ''
                              }`}
                            />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <div className='flex items-center justify-between'>
                  <div
                    className='flex text-[#7747C0] cursor-pointer'
                    onClick={() => print()}>
                    <Printer size={22} color='#7747C0' />
                    <p>چاپ لیست</p>
                  </div>
                  <div className='flex mt-4 gap-10 justify-end'>
                    <button
                      onClick={allocateData}
                      disabled={loading}
                      className={`border-button h-10 rounded-lg  w-56 flex justify-center items-center`}>
                      {loading ? (
                        <Loading size={5} color='#ffffff' />
                      ) : (
                        'ذخیره پیش نویس تخصیص'
                      )}
                    </button>
                    <button
                      onClick={() => setshowOtpModal(true)}
                      disabled={loading}
                      className={`fill-button h-10 rounded-lg  w-56 flex justify-center items-center`}>
                      {loading ? (
                        <Loading size={5} color='#ffffff' />
                      ) : (
                        'ثبت نهایی'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Allocation
