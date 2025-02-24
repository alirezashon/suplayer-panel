import { getCookieByKey } from '@/actions/cookieToken'
import { walletBoxStyle } from '@/app/assets/style'
import Loading from '@/components/shared/LoadingSpinner'
import { useData } from '@/Context/Data'
import { useMenu } from '@/Context/Menu'
import { useStates } from '@/Context/States'
import { generateAllocationSignature } from '@/hooks/Signature'
import { DefineAllocationInterface } from '@/interfaces'
import { DefineAllocation } from '@/services/allocation'
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
  const { beneficiaryData, balance } = useData()
  const [allocationData, setAllocationData] = useState<
    DefineAllocationInterface[]
  >([])
  const { setMenu } = useMenu()
  const {
    selectedSubGroupData,
    selectedGroupData,
    setSelectedGroupData,
    showModal,
  } = useStates()

  useEffect(() => {
    if (!selectedGroupData) {
      location.hash = 'porsant'
      setMenu('porsant')
    }
  }, [setMenu,selectedGroupData])
  const handleCreditChange = async (id: string, value: string) => {
    setAllocationData((prev) => {
      const existingIndex = prev.findIndex((item) => item.visitor_uid === id)
      if (value === '') {
        return prev.filter((item) => item.visitor_uid !== id)
      }
      if (existingIndex !== -1) {
        return prev.map((item, index) =>
          index === existingIndex ? { ...item, amount: Number(value) } : item
        )
      }
      const newItem: DefineAllocationInterface = {
        commission_type: 0,
        allocation_type: 0,
        source_type: 1,
        sup_group_code: selectedGroupData?.sup_group_code as string,
        supervisor_code: selectedSubGroupData?.supervisor_code as string,
        visitor_uid: id,
        amount: Number(value),
        currency_type: 241,
        Signature: generateAllocationSignature({
          amount: value,
          customerMobile: id,
          sup_group_code: selectedGroupData?.sup_group_code as string,
          supervisor_code: selectedSubGroupData?.supervisor_code as string,
          visitor_uid: id,
        }),
      }
      return [...prev, newItem]
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
      (result) => {
        setLoading(false)
        if (result?.status === 1) {
          setAllocationData([])
          showModal({
            title: 'موفق',
            type: 'success',
            main: <p>درخواست شما ثبت شد.</p>,
            autoClose: 1,
          })
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
            <table className='my-10 w-full border-collapse border border-gray-200'>
              <thead>
                <tr>
                  {headers.map((head, headIndex) => (
                    <th
                      key={headIndex}
                      className={`bg-[#F5F7F8] border border-gray-300 px-4 py-2 text-center ${
                        headIndex === 0
                          ? 'rounded-tr-lg'
                          : headIndex === headers.length - 1 && 'rounded-tl-lg'
                      }`}>
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {beneficiaryData?.map((row, index) => (
                  <tr key={index} className='border-b'>
                    <td className='text-center px-4 py-2 border-r'>{index}</td>
                    <td className='text-center px-4 py-2'>
                      {row.visitor_name}
                    </td>
                    <td className='text-center px-4 py-2'>
                      {row.visitor_family}
                    </td>
                    <td className='text-center px-4 py-2'>{row.visitor_tel}</td>
                    <td className='text-center px-4 py-2'>
                      <input
                        inputMode='numeric'
                        value={
                          allocationData.find(
                            (item) => item.visitor_uid === row.visitor_uid
                          )?.amount || ''
                        }
                        placeholder='مبلغ اعتبار را وارد کنید'
                        onChange={(e) => {
                          handleCreditChange(row.visitor_uid, e.target.value)
                        }}
                        className=' border-none rounded px-2 py-1 w-full text-center'
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
                  className={`fill-button h-10 rounded-lg  w-56 flex justify-center items-center`}>
                  {loading ? (
                    <Loading size={5} color='#ffffff' />
                  ) : (
                    '  ثبت نهایی'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Allocation
