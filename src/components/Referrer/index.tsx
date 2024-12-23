import React, { useState } from 'react'
import { Trash, Edit2 } from 'iconsax-react'
import AddModal from './AddModal'
import DeleteModal from './DeleteModal'
import Image from 'next/image'

interface Group {
  id: number
  name: string
}

interface ReferrerData {
  id: number
  name: string
  type: 'شخص' | 'کسب و کار'
  groups: Group[]
}

const referrerData: ReferrerData[] = [
  {
    id: 1,
    name: 'شرکت احمدی',
    type: 'کسب و کار',
    groups: [
      { id: 1, name: 'گروه پوست و مو' },
      { id: 2, name: 'گروه تغذیه' },
      { id: 3, name: 'گروه زبان و روان' },
      { id: 4, name: 'گروه شامپو' },
      { id: 5, name: 'گروه زنان و زایمان' },
      { id: 6, name: 'گروه پوست' },
      { id: 7, name: 'گروه تغذیه' },
      { id: 8, name: 'گروه زبان و روان' },
      { id: 9, name: 'گروه شامپو' },
      { id: 10, name: 'گروه زنان و زایمان' },
      { id: 11, name: 'گروه پوست' },
    ],
  },
  {
    id: 2,
    name: 'دکتر محمدعالی',
    type: 'شخص',
    groups: [
      { id: 4, name: 'گروه پوست و مو' },
      { id: 5, name: 'گروه زبان و روان' },
    ],
  },
  {
    id: 3,
    name: 'داروخانه محمدی',
    type: 'کسب و کار',
    groups: [
      { id: 6, name: 'گروه پوست و مو' },
      { id: 7, name: 'گروه زبان و روان' },
    ],
  },
]

const tabs = ['همه', 'شخص', 'کسب و کار']
const Referrer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0)
  const [showAddModal, setShowAddModal] = useState<boolean | string>(false)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean | string>(
    false
  )
  const [data, setData] = useState<ReferrerData[]>(referrerData)

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
          <p>
            <span className='text-[#98A2B3]'>تعاریف</span>/
            <span className='text-[#7747C0]'>بازاریاب‌های من</span>
          </p>
          {data.length > 0 && (
            <button
              type='submit'
              onClick={() => setShowAddModal(true)}
              className='h-10 min-w-40 bg-purple-700 text-white rounded-lg hover:bg-purple-800'>
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
                className={` gap-2 px-2 py-2 w-40 text-base text-center text-white bg-purple-700 rounded-lg border border-purple-700 border-solid min-h-10 `}>
                جستجو
              </button>
            </div>
          </form>
            {data.length > 0 ? 
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4'>
{              data.map((referrer) => (
                <div
                  key={referrer.id}
                  className='bg-white rounded-lg shadow border border-gray-200 p-4 relative'>
                  <div className='flex justify-between items-center'>
                    <div className='flex gap-2'>
                      <h3 className='text-gray-800 font-semibold'>
                        {referrer.name}
                      </h3>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          referrer.type === 'شخص'
                            ? 'bg-[#E6DBFB80] text-[#704CB9]'
                            : 'bg-[#CAF7E3] text-[#0E9E7A]'
                        }`}>
                        {referrer.type}
                      </span>
                    </div>
                    <div className='flex gap-2'>
                      <Edit2
                        size={20}
                        color='#8455D2'
                        cursor={'pointer'}
                        onClick={() => setShowAddModal(true)}
                        // onClick={() => setShowAddModal(group.title)}
                      />
                      <Trash
                        size={20}
                        color='#D42620'
                        cursor={'pointer'}
                        onClick={() => {
                          setData((prv) =>
                            prv.filter((ref) => ref.id !== referrer.id)
                          )
                          setShowDeleteModal(referrer.name)
                        }}
                      />
                    </div>
                  </div>

                  <div className='mt-2'>
                    <h4 className='text-sm text-gray-600 mb-2'>
                      گروه‌های عضو شده
                    </h4>
                    <div className='flex flex-wrap gap-2'>
                      {referrer.groups.map((group) => (
                        <span
                          key={group.id}
                          className='text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded'>
                          {group.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className='absolute top-2 right-2 flex gap-2 text-[#704CB9]'>
                    <button className='hover:text-red-500 transition'>
                      <i className='fas fa-trash'></i>
                    </button>
                    <button className='hover:text-blue-500 transition'>
                      <i className='fas fa-pen'></i>
                    </button>
                  </div>
                </div>
              ))}
                </div>
            : (
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
                  className='h-10 min-w-40 bg-purple-700 text-white rounded-lg hover:bg-purple-800'>
                  +  بازاریاب جدید
                </button>
              </div>
            )}
          </div>
        </div>
    </>
  )
}

export default Referrer



