import { useState } from 'react'
import { Trash, Edit2, FolderAdd, MoreSquare, Message } from 'iconsax-react'
import AddModal from './AddModal'
import DeleteModal from './DeleteModal'
import Image from 'next/image'
import { useMenu } from '@/Context/Menu'
import Calendar from '../shared/Calendar'
import { useData } from '@/Context/Data'
import AppointmentModal from './Appointment'
import { ReferrerData } from '@/interfaces'

const Referrer: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState<boolean | string>(false)
  const [showAppointmentModal, setShowAppointmentModal] = useState<
    boolean | ReferrerData
  >(false)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean | string>(
    false
  )
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const { setMenu } = useMenu()
  const { referrerData } = useData()
  const headers = [
    'ردیف',
    'نام',
    'نام خانوادگی',
    'سمت بازاریاب',
    'وضعیت',
    'فعالسازی/انتصاب',
    'جزئیات',
    'عملیات',
  ]
  const initialData = referrerData?.map((referrer) => ({
    pers_name: referrer.pers_name,
    pers_family: referrer.pers_family,
    pers_chart_id: referrer.pers_chart_id,
    pers_status: referrer.pers_status,
    pers_tob: referrer.pers_tob,
  }))

  const handleHeaderCheckboxChange = () => {
    if (selectedItems.length === initialData?.length) {
      setSelectedItems([]) // اگر همه انتخاب شده بودند، پاک کن
    } else {
      initialData && setSelectedItems(initialData?.map((_, index) => index)) // همه را انتخاب کن
    }
  }

  const handleRowCheckboxChange = (index: number) => {
    if (selectedItems.includes(index)) {
      setSelectedItems(selectedItems.filter((item) => item !== index)) // اگر انتخاب شده بود، حذف کن
    } else {
      setSelectedItems([...selectedItems, index]) // اگر انتخاب نشده بود، اضافه کن
    }
  }

  return (
    <>
      {showAppointmentModal && (
        <AppointmentModal
          data={showAppointmentModal as ReferrerData}
          close={setShowAppointmentModal}
        />
      )}
      {showAddModal && (
        <AddModal
          // data={{
          //   name: 'علی',
          //   lastName: 'محمتی',
          //   speciality: '0',
          //   phone: '093329902012',
          //   address: 'دورقوزابارت',
          // }}
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
          {initialData && initialData?.length > 0 && (
            <div className='flex gap-5'>
              <label className='flex justify-center items-center gap-1 h-10 min-w-40 border-button rounded-lg bg-white hover:bg-purple-100 cursor-pointer'>
                <FolderAdd size={20} color='#7747C0' />
                <span>بارگذاری اکسل</span>
                <input
                  type='file'
                  accept='.xlsx, .xls'
                  className='hidden'
                  onChange={(e) => e}
                />
              </label>
              <button
                type='submit'
                onClick={() => setShowAddModal(true)}
                className='h-10 min-w-40 bg-[#7747C0] text-white rounded-lg hover:bg-purple-800'>
                + بازاریاب جدید
              </button>
            </div>
          )}
        </div>
        <div className='p-6 bg-white rounded-lg border border-gray-200'>
          <form
            // onSubmit={handleSubmit}
            className='flex flex-col bg-[#F6F5FD] my-3 p-3 max-md:px-5 max-md:pb-24 rounded-lg'>
            <div className='flex gap-4 items-center'>
              <div className='flex flex-col w-full'>
                <label className='text-base font-medium text-right text-gray-800'>
                  نام
                </label>
                <input type='text' placeholder='نام' />
              </div>
              <div className='flex flex-col w-full'>
                <label className='text-base font-medium text-right text-gray-800'>
                  نام خانوادگی
                </label>
                <input type='text' placeholder='نام خانوادگی' />
              </div>
              <div className='my-4 w-full'>
                <label id='status-label'> نوع بازاریاب</label>
                <select
                  className={`!w-full outline-none border rounded-lg h-10 px-1 cursor-pointer border-[#C9D0D8]`}>
                  <option disabled value=''>
                    مدیر فروش، مدیر منطقه، مدیر شعبه ...
                  </option>
                  <option value=''>نام گروه</option>
                  <option value='0'>ناروه</option>
                </select>
              </div>
            </div>
            <div className='flex gap-4 items-center'>
              <div className='flex flex-col w-full'>
                <label className='text-base font-medium text-right text-gray-800'>
                  شماره همراه
                </label>
                <input type='text' placeholder='شماره همراه' />
              </div>
              <div className='flex flex-col w-full'>
                <label className='text-base font-medium text-right text-gray-800'>
                  تاریخ تولد
                </label>
                <Calendar
                  placeholder='تاریخ تولد'
                  setDate={(value: string) => value}
                />
              </div>
              <div className='my-4 w-full'>
                <label id='status-label'> وضعیت</label>
                <select
                  className={`!w-full outline-none border rounded-lg h-10 px-1 cursor-pointer border-[#C9D0D8]`}>
                  <option disabled value=''>
                    فعال، غیر فعال
                  </option>
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
          {initialData && initialData?.length > 0 ? (
            <div className='p-6 bg-white rounded-lg border border-gray-200 flex flex-col gap-5'>
              <div className='flex justify-end'>
                <button
                  type='submit'
                  onClick={() => setShowAddModal(true)}
                  className='h-10 w-fit border-button px-3 flex items-center gap-2 rounded-lg hover:bg-purple-50'>
                  <Message size={24} color='#7747C0' />
                  <span>ارسال پیامک گروهی</span>
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
                        <div
                          className={`flex justify-center items-center border-y h-10  ${
                            headIndex === 0
                              ? 'border-r rounded-tr-lg'
                              : headIndex === headers.length - 1 &&
                                'border-l rounded-tl-lg'
                          }`}>
                          {headIndex !== 0 ? (
                            head
                          ) : (
                            <div className='flex items-center  justify-center gap-2'>
                              <input
                                onChange={handleHeaderCheckboxChange}
                                checked={
                                  selectedItems.length === initialData.length
                                }
                                type='checkbox'
                                className=' cursor-pointer accent-[#7747C0] w-4'
                              />
                              <span className='mt-1'>{head}</span>
                            </div>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {initialData?.map((personnel, index) => (
                    <tr key={index} className='border-b'>
                      {[index + 1, ...[...Object.values(personnel)]].map(
                        (detail, detailIndex) => (
                          <td key={detailIndex} className={`text-center h-10 `}>
                            {detailIndex === 0 ? (
                              <div className='flex items-center  justify-center gap-7'>
                                <input
                                  checked={selectedItems.includes(index)} // همگام‌سازی وضعیت چک‌باکس با selectedItems
                                  onChange={() =>
                                    handleRowCheckboxChange(index)
                                  }
                                  type='checkbox'
                                  className=' cursor-pointer accent-[#7747C0] w-4'
                                />
                                <p className='mt-1'>{detail}</p>
                              </div>
                            ) : detailIndex === 4 ? (
                              <p className='flex justify-center'>
                                <span
                                  className={`min-w-16 ${
                                    detail === 1
                                      ? 'bg-[#DAFEE5] text-[#0CAD41] rounded-lg'
                                      : 'bg-[#FEE3E2] text-[#D42620] rounded-lg'
                                  }`}>
                                  {detail === 1 ? 'فعال' : 'غیرفعال'}
                                </span>
                              </p>
                            ) : detailIndex === 5 ? (
                              <button
                                className='border-button px-2 rounded-md'
                                onClick={() =>
                                  setShowAppointmentModal(
                                    personnel as ReferrerData
                                  )
                                }>
                                انتصاب دادن
                              </button>
                            ) : (
                              detail
                            )}
                          </td>
                        )
                      )}
                      <td className='text-center'>
                        <p className='flex justify-center cursor-pointer'>
                          <MoreSquare size={25} color='#7747C0' />
                        </p>
                      </td>
                      <td className='text-center h-10 flex justify-center gap-2 border-l'>
                        <Trash
                          size={24}
                          color='#7747C0'
                          className='cursor-pointer'
                          // onClick={() => setShowDeleteModal(account)}
                        />
                        <Edit2
                          size={24}
                          color='#7747C0'
                          className='cursor-pointer'
                          // onClick={() => setShowAddModal(account)}
                        />
                      </td>
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
