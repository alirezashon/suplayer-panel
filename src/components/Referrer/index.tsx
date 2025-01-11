import { useState } from 'react'
import { Trash, Edit2, SearchNormal } from 'iconsax-react'
import AddModal from './AddModal'
import DeleteModal from './DeleteModal'
import Image from 'next/image'
import { useMenu } from '@/Context/Menu'
import { ReferrerData } from '@/interfaces'

const sampleData = [
  {
    personnel_code: '001',
    pers_chart_id: 1,
    pers_job_id: 1,
    pers_type: 1,
    pers_tob: 1,
    pers_uid: 'UID001',
    pers_tel: '09123456789',
    pers_full_name: 'الهه محسنی',
    pers_name: 'الهه',
    pers_family: 'محسنی',
    pers_status: 1, // فعال
    CityUID: 'City001',
    pers_address: 'تهران، سعادت آباد',
  },
  {
    personnel_code: '002',
    pers_chart_id: 2,
    pers_job_id: 2,
    pers_type: 1,
    pers_tob: 2,
    pers_uid: 'UID002',
    pers_tel: '09123456780',
    pers_full_name: 'رضا احمدی',
    pers_name: 'رضا',
    pers_family: 'احمدی',
    pers_status: 0, // غیرفعال
    CityUID: 'City002',
    pers_address: 'تهران، ونک',
  },
  {
    personnel_code: '003',
    pers_chart_id: 3,
    pers_job_id: 3,
    pers_type: 2,
    pers_tob: 1,
    pers_uid: 'UID003',
    pers_tel: '09123456781',
    pers_full_name: 'مریم صادقی',
    pers_name: 'مریم',
    pers_family: 'صادقی',
    pers_status: 1, // فعال
    CityUID: 'City003',
    pers_address: 'کرج، جهانشهر',
  },
  {
    personnel_code: '004',
    pers_chart_id: 4,
    pers_job_id: 4,
    pers_type: 2,
    pers_tob: 2,
    pers_uid: 'UID004',
    pers_tel: '09123456782',
    pers_full_name: 'علی اکبری',
    pers_name: 'علی',
    pers_family: 'اکبری',
    pers_status: 0, // غیرفعال
    CityUID: 'City004',
    pers_address: 'شیراز، معالی آباد',
  },
  {
    personnel_code: '005',
    pers_chart_id: 5,
    pers_job_id: 5,
    pers_type: 3,
    pers_tob: 1,
    pers_uid: 'UID005',
    pers_tel: '09123456783',
    pers_full_name: 'زهرا محمدی',
    pers_name: 'زهرا',
    pers_family: 'محمدی',
    pers_status: 1, // فعال
    CityUID: 'City005',
    pers_address: 'اصفهان، چهارباغ',
  },
]

const tabs = ['همه', 'شخص', 'کسب و کار']
const Referrer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0)
  const [showAddModal, setShowAddModal] = useState<boolean | string>(false)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean | string>(
    false
  )
  const [data, setData] = useState<ReferrerData[]>(sampleData)
  const { setMenu } = useMenu()
  const headers = [
    'ردیف',
    'نام',
    'نام خانوادگی',
    'نوع بازاریاب',
    'وضعیت',
    'فعالسازی/انتصاب',
    'جزئیات',
    'عملیات',
  ]
  return (
    <>
      {showAddModal && (
        <AddModal
          data={{
            name: 'علی',
            lastName: 'محمتی',
            speciality: '0',
            phone: '093329902012',
            address: 'دورقوزابارت',
          }}
          close={setShowAddModal}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          name={`${showAddModal}`}
          close={setShowDeleteModal}
          isActive
        />
      )}
      <div className='flex flex-col p-5'>
        <div className='flex justify-between items-center mb-7'>
          <p className='cursor-pointer'>
            <span
              className='text-[#98A2B3]'
              onClick={() => {
                setMenu('groupmanagement')
                location.hash = 'groupmanagement'
              }}>
              تعاریف
            </span>
            /
            <span
              className='text-[#7747C0]'
              onClick={() => {
                setMenu('referrers')
                location.hash = 'referrers'
              }}>
              بازاریاب‌های من
            </span>
          </p>
          {data.length > 0 && (
            <button
              type='submit'
              onClick={() => setShowAddModal(true)}
              className='h-10 min-w-40 bg-[#7747C0] text-white rounded-lg hover:bg-purple-800'>
              + بازاریاب جدید
            </button>
          )}
        </div>
        <div className='p-6 bg-white rounded-lg border border-gray-200'>
          <div className='flex border-b'>
            {tabs.map((tab, index) => (
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
          <form
            // onSubmit={handleSubmit}
            className='flex flex-col bg-[#F6F5FD] my-3 p-3 max-md:px-5 max-md:pb-24 rounded-lg'>
            <div className='flex gap-4 items-center'>
              <div className='flex flex-col w-full'>
                <label className='text-base font-medium text-right text-gray-800'>
                  نام زیر گروه خود را بنویسید
                </label>
                <input
                  type='text'
                  placeholder='مثال: دکترهای پوست، تهران غرب ...'
                />
              </div>
              <div className='flex flex-col w-full'>
                <label className='text-base font-medium text-right text-gray-800'>
                  نام زیر گروه خود را بنویسید
                </label>
                <input
                  type='text'
                  placeholder='مثال: دکترهای پوست، تهران غرب ...'
                />
              </div>
              <div className='my-4 w-full'>
                <label id='status-label'> گروه خود را انتخاب کنید</label>
                <select
                  className={`!w-full outline-none border rounded-lg h-10 px-1 cursor-pointer border-[#C9D0D8]`}>
                  <option value=''>نام گروه</option>
                  <option value='0'>ناروه</option>
                </select>
              </div>
            </div>

            <div className='mt-10 w-full flex justify-end '>
              <button
                type='submit'
                className={` gap-2 px-2 py-2 w-40 text-base text-center text-white bg-[#7747C0] rounded-lg border border-[#7747C0] border-solid min-h-10 `}>
                جستجو
              </button>
            </div>
          </form>
          {data.length > 0 ? (
            <div className='p-6 bg-white rounded-lg border border-gray-200 flex flex-col gap-5'>
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
                <button
                  type='submit'
                  className={`fill-button px-10 h-10 rounded-lg `}>
                  جستجو
                </button>
              </div>
              <table className='my-10 w-full'>
                <thead>
                  <tr>
                    {headers.map((head, headIndex) => (
                      <th
                        className={`bg-[#F3F4F5] border-z h-10 ${
                          headIndex === 0
                            ? 'rounded-tr-lg'
                            : headIndex === headers.length - 1 &&
                              'rounded-tl-lg'
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
                  {data.map((personnel, index) => (
                    <tr key={index} className='border-b'>
                      {[index + 1, ...[...Object.values(personnel), '']].map(
                        (detail, detailIndex) => (
                          <td
                            key={detailIndex}
                            className={`text-center h-10 ${
                              detailIndex === 0
                                ? 'border-r'
                                : detailIndex === 3 && 'border-l'
                            }`}>
                            {detailIndex !== 3 ? (
                              detail
                            ) : (
                              <div className='justify-center flex gap-2'>
                                <Trash
                                  size={20}
                                  color='#D42620'
                                  cursor={'pointer'}
                                  onClick={() => {
                                    setData((prv) =>
                                      prv.filter(
                                        (ref) =>
                                          ref.personnel_code !==
                                          personnel.personnel_code
                                      )
                                    )
                                    setShowDeleteModal(personnel.personnel_code)
                                  }}
                                />
                                <Edit2
                                  size={20}
                                  color='#8455D2'
                                  cursor={'pointer'}
                                  onClick={
                                    () => '' // setShowAddModal({
                                    //   category: personnel.personnel_code,
                                    //   title: personnel.pers_full_name,
                                    // })
                                  }
                                />
                              </div>
                            )}
                          </td>
                        )
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className='w-full bg-white flex flex-col gap-2 justify-center items-center'>
              <h1 className='text-2xl'>بازاریابی ندارید</h1>
              <Image
                src={'/icons/empty-box.svg'}
                width={444}
                height={333}
                alt=''
                className='w-[10%]'
              />
              <div className='border min-w-[40%] my-5'></div>
              <h1 className='text-2xl'> تعریف بازاریاب</h1>
              <button
                type='submit'
                onClick={() => setShowAddModal(true)}
                className='h-10 min-w-40 bg-[#7747C0] text-white rounded-lg hover:bg-purple-800'>
                + بازاریاب جدید
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Referrer
