import { useState } from 'react'
import { Edit2, FolderAdd, SearchNormal, Trash } from 'iconsax-react'
import AddModal from './AddModal'
import DeleteModal from './DeleteModal'
import { useMenu } from '@/Context/Menu'
import Image from 'next/image'
import { useData } from '@/Context/Data'
import SelectList from '../shared/SelectList'
import { BeneficiaryData } from '@/interfaces'
const Beneficiary: React.FC = () => {
  const { setMenu } = useMenu()
  const { beneficiaryData } = useData()

  const [activeTab, setActiveTab] = useState<number>(0)
  const [showAddModal, setShowAddModal] = useState<boolean | BeneficiaryData>(
    false
  )
  const [showDeleteModal, setShowDeleteModal] = useState<
    boolean | BeneficiaryData
  >(false)
  const [, setSelectedItems] = useState<Array<string | number>>([])
  const items = [
    { id: 1, label: 'گروه زنان و زایمان' },
    { id: 2, label: 'گروه پوست و مو' },
    { id: 3, label: 'گروه پزشکان عمومی' },
    { id: 4, label: 'گروه قلب و عروق' },
  ]
  const headers = [
    'ردیف',
    'نام',
    'نوع ذی‌نفع',
    'وضعیت ذی‌نفع',
    'بازاریاب',
    'عملیات',
  ]
  return (
    <>
      {showAddModal && (
        <AddModal
          close={setShowAddModal}
          data={showAddModal as BeneficiaryData}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          data={showDeleteModal as BeneficiaryData}
          close={setShowDeleteModal}
        />
      )}
      <div className='flex flex-col p-2'>
        <div className='flex justify-between items-center'>
          <p className='cursor-pointer'>
            <span
              className='text-[#98A2B3]'
              onClick={() => {
                setMenu('mygroups')
                location.hash = 'mygroups'
              }}>
              تعاریف
            </span>
            /<span className='text-[#7747C0]'>ذی‌نفع‌های من</span>
          </p>
          {beneficiaryData && beneficiaryData.length > 0 && (
            <div className='flex gap-5'>
              <button
                onClick={() => setShowAddModal(true)}
                className='h-10 min-w-40 fill-button  rounded-lg hover:bg-purple-800'>
                + ذی‌ نفع جدید
              </button>
            </div>
          )}
        </div>
        <div className='p-6 mt-5 bg-white rounded-lg border border-gray-200'>
          <div className='flex border-b'>
            {['همه', 'شخص', 'کسب و کار']?.map((tab, index) => (
              <button
                key={index}
                className={`px-5 py-3 transition-all duration-500 ${
                  activeTab === index
                    ? 'bg-[#E6DBFB80] border-b-2 border-[#704CB9] text-[#704CB9]'
                    : 'text-[#344054]'
                }`}
                onClick={() => setActiveTab(index)}>
                {tab}
              </button>
            ))}
          </div>
          <div className=' bg-[#F6F5FD] py-7 px-3'>
            <div className='flex gap-5 items-center'>
              <div className='relative w-full flex items-center '>
                <div className='absolute left-3 z-20 cursor-pointer text-[#50545F]'>
                  <SearchNormal size={24} color='gray' />
                </div>

                <input
                  type='search'
                  placeholder='جستجو'
                  // value={search}
                  // onChange={(e) => handleSearchChange(e.target.value)}
                  className='absolute w-full z-10 border border-gray-300 rounded-md px-4 py-2 text-right outline-none focus:border-red-400'
                />
              </div>
              <div className='bg-white w-full'>
                <SelectList
                  items={items}
                  setSelectedItems={setSelectedItems}
                  label='تبلیغات'
                />
              </div>
              <button
                type='submit'
                className={`fill-button px-10 h-10 rounded-lg `}>
                جستجو
              </button>
            </div>
          </div>

          {beneficiaryData && beneficiaryData.length > 0 ? (
            <table className='my-10 border-collapse border  w-full text-sm text-gray-700'>
              <thead>
                <tr>
                  {headers.map((head, headIndex) => (
                    <th
                      className={`bg-[#F5F7F8] h-10 text-center font-bold border-b ${
                        headIndex === 0
                          ? 'rounded-tr-lg'
                          : headIndex === headers.length - 1 && 'rounded-tl-lg'
                      }`}
                      key={headIndex}>
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {beneficiaryData
                  ?.filter(
                    (account) =>
                      activeTab === 0 || account.visitor_tob === activeTab
                  )
                  .map((account, index) => (
                    <tr key={index} className='border-b '>
                      <td className='text-center h-10'>{index + 1}</td>
                      <td className='text-center h-10'>
                        {account.visitor_name} {account.visitor_family}
                      </td>
                      <td className={`text-center h-10 `}>
                        <p className={`flex justify-center `}>
                          <span
                            className={`py-1 rounded-lg min-w-16 ${
                              account.visitor_tob === 1
                                ? 'bg-[#DEE3E7] text-[#1b0c36]'
                                : 'bg-[#FAF3CB] text-[#DF9E1A]'
                            }`}>
                            {account.visitor_tob === 1 ? 'شخص' : 'کسب‌و‌کار'}
                          </span>
                        </p>
                      </td>
                      <td className='flex justify-center'>
                        <p
                          className={`flex justify-center items-center w-20 ${
                            account.visitor_status === 1
                              ? 'bg-[#DAFEE5] text-[#0CAD41] rounded-lg py-1'
                              : 'bg-[#FEE3E2] text-[#D42620] rounded-lg py-1'
                          }`}>
                          {account.visitor_status === 1 ? 'فعال' : 'غیرفعال'}
                        </p>
                      </td>
                      <td className='text-center h-10'>
                        {account.visitor_full_name}
                      </td>
                      <td className='text-center h-10 flex justify-center gap-2'>
                        <Trash
                          size={24}
                          color='#7747C0'
                          className='cursor-pointer'
                          onClick={() => setShowDeleteModal(account)}
                        />
                        <Edit2
                          size={24}
                          color='#7747C0'
                          className='cursor-pointer'
                          onClick={() => setShowAddModal(account)}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            <div className='flex flex-col gap-2 justify-center items-center h-[60vh]'>
              <h1 className='text-2xl'>ذی‌ نفعی ندارید</h1>
              <Image
                src={'/icons/empty-box.svg'}
                width={444}
                height={333}
                alt=''
                className='w-[10%]'
              />
              <div className='border min-w-[40%] my-5'></div>
              <h1 className='text-2xl'>ایجاد ذی‌نفع جدید</h1>
              <div className='flex gap-4'>
                <button
                  type='submit'
                  onClick={() => setShowAddModal(true)}
                  className='flex justify-center items-center h-10 min-w-40 text-[#7747C0] border border-[#7747C0] rounded-lg hover:bg-purple-100'>
                  <FolderAdd size={20} color='#7747C0' />
                  <p>بارگذاری اکسل</p>
                </button>
                <button
                  type='submit'
                  onClick={() => setShowAddModal(true)}
                  className='h-10 min-w-40 bg-[#7747C0] text-white rounded-lg hover:bg-purple-800'>
                  + ذی‌ نفع جدید
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Beneficiary
