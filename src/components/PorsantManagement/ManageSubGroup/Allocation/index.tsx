import { getCookieByKey } from '@/actions/cookieToken'
import { useData } from '@/Context/Data'
import { useMenu } from '@/Context/Menu'
import { useStates } from '@/Context/States'
import { generateAllocationSignature } from '@/hooks/Signature'
import { BeneficiaryData } from '@/interfaces'
import { Printer, WalletMoney } from 'iconsax-react'
import { useState } from 'react'

const headers = [
  'ردیف',
  'نام ذی‌نفع',
  'نام خانوادگی ذی‌نفع',
  'شماره موبایل ذی‌نفع',
  'اعتبار قابل تخصیص',
]
const Allocation = () => {
  const [filterType, setFilterType] = useState<number>(0)
  const { beneficiaryData, userInfo } = useData()
  const [editedData, setEditedData] = useState<BeneficiaryData[]>([])
  const { setMenu } = useMenu()
  const { selectedSubGroupData, selectedGroupData, setSelectedGroupData } =
    useStates()
  const walletBoxStyle = {
    background:
      'linear-gradient(white, white) padding-box, conic-gradient(rgb(246, 230, 255), #ffffff 18%, #644a9e 31% 43%, rgb(228, 228, 255), #ffffff, #7a5fb7, #e7d9d5, #e4e0ed) border-box',
    border: '3px solid transparent',
    borderRadius: '1vh',
    padding: '1.5rem',
  }
  const handleCreditChange = (index: number, value: string) => {
    // const updatedData = [...data]
    // updatedData[index].assignableCredit = value
    // setData(updatedData)
    // setEditedData(updatedData)
  }
  const handleSubmit = async () => {
    const accessToken = (await getCookieByKey('access_token')) || ''
    const Signature = generateAllocationSignature({
      amount: '',
      customerMobile: `${userInfo?.mobile}`,
      sup_group_code: '',
      supervisor_code: '',
      visitor_uid: '',
    })
    // await DefineAllocation({ accessToken, Signature, })
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
            {selectedGroupData?.sup_group_name}/
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
                ۴۰۰۰۰۰ میلیون ریال
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
                        type='text'
                        inputMode='numeric'
                        placeholder='مبلغ اعتبار را وارد کنید'
                        onChange={(e) =>
                          handleCreditChange(index, e.target.value)
                        }
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
                  type='submit'
                  className={`fill-button px-10 h-10 rounded-lg  w-56`}>
                  ثبت نهایی
                </button>
                <button
                  type='submit'
                  className={`border-button px-10 h-10 rounded-lg  w-56`}>
                  ذخیره تخصیص
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
