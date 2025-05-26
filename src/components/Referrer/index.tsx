import { useEffect, useState } from 'react'
import { Trash, Edit2, MoreSquare, Message } from 'iconsax-react'
import AddModal from './AddModal'
import DeleteModal from './DeleteModal'
import Image from 'next/image'
import { useMenu } from '@/Context/Menu'
import { useData } from '@/Context/Data'
import AppointmentModal from './Appointment'
import { ReferrerData } from '@/interfaces'
import ShowDetails from './ShowDetails'
import { useStates } from '@/Context/States'

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
const Referrer: React.FC = () => {
  const { permissions } = useStates()
  const { setMenu } = useMenu()
  const { referrerData, TreeChartInterface } = useData()

  const [showAddModal, setShowAddModal] = useState<boolean | ReferrerData>(
    false
  )
  const [showAppointmentModal, setShowAppointmentModal] = useState<
    boolean | ReferrerData
  >(false)
  const [showDeleteModal, setShowDeleteModal] = useState<
    boolean | ReferrerData
  >(false)
  const [showdetailModal, setShowDetailModal] = useState<null | ReferrerData>(
    null
  )
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [initialData, setInitialData] = useState<Partial<ReferrerData>[]>([])
  useEffect(() => {
    setInitialData(
      Array.isArray(referrerData)
        ? referrerData.map((referrer) => ({
            pers_name: referrer.pers_name,
            pers_family: referrer.pers_family,
            pers_chart_title:
              TreeChartInterface?.find(
                (chart) => chart.id === referrer.pers_chart_id
              )?.chtitle || '',
            pers_status: referrer.pers_status,
            pers_tob: referrer.pers_tob,
            pers_uid: referrer.pers_uid,
          }))
        : []
    )
  }, [referrerData, TreeChartInterface])

  const handleHeaderCheckboxChange = () => {
    if (selectedItems.length === initialData?.length) {
      setSelectedItems([]) // اگر همه انتخاب شده بودند، پاک کن
    } else {
      if (initialData) setSelectedItems(initialData?.map((_, index) => index)) // همه را انتخاب کن
    }
  }

  const handleRowCheckboxChange = (index: number) => {
    if (selectedItems.includes(index)) {
      setSelectedItems(selectedItems.filter((item) => item !== index)) // اگر انتخاب شده بود، حذف کن
    } else {
      setSelectedItems([...selectedItems, index]) // اگر انتخاب نشده بود، اضافه کن
    }
  }

  const filterPersonnel = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    const filteredData = referrerData?.filter((person) => {
      const fieldValue = person?.[name as keyof ReferrerData]
      if (typeof fieldValue === 'string') {
        return !value || fieldValue.includes(value)
      }
      return !value
    })

    // فقط فیلدهای خاص را ذخیره می‌کنیم
    const filteredFieldsData = filteredData?.map((person) => ({
      pers_name: person.pers_name,
      pers_family: person.pers_family,
      pers_chart_title: person.pers_chart_title,
      pers_status: person.pers_status,
      task_count: person.task_count,
      pers_tob: person.pers_tob,
    }))

    setInitialData(filteredFieldsData as Partial<ReferrerData>[])
  }
  return (
    <>
      {showdetailModal && (
        <ShowDetails
          data={showdetailModal}
          close={() => setShowDetailModal(null)}
        />
      )}
      {showAppointmentModal && (
        <AppointmentModal
          data={showAppointmentModal as ReferrerData}
          close={setShowAppointmentModal}
        />
      )}
      {showAddModal && (
        <AddModal data={showAddModal as ReferrerData} close={setShowAddModal} />
      )}
      {showDeleteModal && (
        <DeleteModal
          data={showDeleteModal as ReferrerData}
          close={()=>setShowDeleteModal(false)}
        />
      )}
      <div className='flex flex-col p-5 max-md:w-[94vw] max-md:mr-[4vw]'>
        <div className='flex justify-between items-center mb-7'>
          <p className='cursor-pointer'>
            <span
              className='text-[#98A2B3]'
              onClick={() => {
                setMenu('mygroups')
                location.hash = 'mygroups'
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
          {permissions[1].includes('694') &&
            initialData &&
            initialData?.length > 0 && (
              <div className='flex gap-5'>
                <button
                  type='submit'
                  onClick={() => setShowAddModal(true)}
                  className='h-10 min-w-40 bg-[#7747C0] text-white rounded-lg hover:bg-purple-800'>
                  + بازاریاب جدید
                </button>
              </div>
            )}
        </div>
        {permissions[1].includes('739') && (
          <div className='p-6 max-md:w-[99.4%] bg-white rounded-lg border border-gray-200'>
            <form className='flex  flex-col bg-[#F6F5FD] my-3 p-3 max-md:px-5 max-md:pb-24 rounded-lg'>
              <div className='flex max-md:flex-col  gap-4 items-center'>
                <div className='flex flex-col w-full'>
                  <label className='text-base font-medium text-right text-gray-800'>
                    نام
                  </label>
                  <input
                    name='pers_name'
                    onChange={filterPersonnel}
                    placeholder='نام'
                  />
                </div>
                <div className='flex flex-col w-full'>
                  <label className='text-base font-medium text-right text-gray-800'>
                    نام خانوادگی
                  </label>
                  <input
                    name='pers_family'
                    onChange={filterPersonnel}
                    placeholder='نام خانوادگی'
                  />
                </div>

                <div className='flex flex-col w-full'>
                  <label className='text-base font-medium text-right text-gray-800'>
                    شماره همراه
                  </label>
                  <input
                    name='pers_tel'
                    onChange={filterPersonnel}
                    placeholder='شماره همراه'
                  />
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
                <div className='overflow-x-auto'>
                  <table className='my-10 text-nowrap w-full min-w-[800px]'>
                    <thead>
                      <tr>
                        {headers.map((head, headIndex) => (
                          <th
                            className={`bg-[#F3F4F5] h-10 ${
                              headIndex === 0
                                ? 'rounded-tr-lg '
                                : headIndex === headers.length - 1 &&
                                  'rounded-tl-lg'
                            }`}
                            key={headIndex}>
                            <div
                              className={`flex justify-center items-center border-y h-10 ${
                                headIndex === 0
                                  ? 'border-r rounded-tr-lg'
                                  : headIndex === headers.length - 1 &&
                                    'border-l rounded-tl-lg'
                              }`}>
                              {headIndex !== 0 ? (
                                head
                              ) : (
                                <div className='flex items-center justify-center gap-2'>
                                  <input
                                    onChange={handleHeaderCheckboxChange}
                                    checked={
                                      selectedItems.length ===
                                      initialData.length
                                    }
                                    type='checkbox'
                                    className='cursor-pointer accent-[#7747C0] w-4'
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
                          {[index + 1, ...Object.values(personnel)].map(
                            (detail, detailIndex) =>
                              detailIndex !== 6 && (
                                <td
                                  key={detailIndex}
                                  className={`text-center h-10 ${
                                    detailIndex === 0 && 'border-r'
                                  }`}>
                                  {detailIndex === 0 ? (
                                    <div className='flex items-center justify-center gap-7'>
                                      <input
                                        checked={selectedItems.includes(index)}
                                        onChange={() =>
                                          handleRowCheckboxChange(index)
                                        }
                                        type='checkbox'
                                        className='cursor-pointer accent-[#7747C0] w-4'
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
                                    <>
                                      {(detail as number) == 0 ? (
                                        <div
                                          className='flex gap-2 cursor-pointer justify-center text-[#7747C0] items-center '
                                          onClick={() =>
                                            setShowAppointmentModal(
                                              referrerData?.find(
                                                (referrer) =>
                                                  referrer.pers_uid ===
                                                  personnel.pers_uid
                                              ) as ReferrerData
                                            )
                                          }>
                                          <Edit2 size={16} color='#7747C0' />
                                          <p>ویرایش انتصاب</p>
                                        </div>
                                      ) : (
                                        <button
                                          className='border-button px-2 rounded-md'
                                          onClick={() => {
                                            setShowAppointmentModal(
                                              referrerData?.find(
                                                (pers) =>
                                                  pers?.pers_uid ===
                                                  personnel?.pers_uid
                                              ) as ReferrerData
                                            )
                                          }}>
                                          انتصاب دادن
                                        </button>
                                      )}
                                    </>
                                  ) : (
                                    detail
                                  )}
                                </td>
                              )
                          )}
                          <td className='text-center'>
                            <p className='flex justify-center cursor-pointer'>
                              <MoreSquare
                                size={25}
                                color='#7747C0'
                                onClick={() =>
                                  setShowDetailModal(
                                    referrerData?.filter(
                                      (referrer) =>
                                        referrer.pers_name ===
                                        personnel.pers_name
                                    )[0] as ReferrerData
                                  )
                                }
                              />
                            </p>
                          </td>
                          {permissions[1].includes('693') && (
                            <td className='text-center h-10 flex justify-center gap-2 border-l'>
                              <Trash
                                size={24}
                                color='#7747C0'
                                className='cursor-pointer'
                                onClick={() =>
                                  setShowDeleteModal(
                                    referrerData?.filter(
                                      (data) =>
                                        data.pers_name === personnel.pers_name
                                    )[0] as ReferrerData
                                  )
                                }
                              />
                              <Edit2
                                size={24}
                                color='#7747C0'
                                className='cursor-pointer'
                                onClick={() =>
                                  setShowAddModal(
                                    referrerData?.filter(
                                      (data) =>
                                        data.pers_name === personnel.pers_name
                                    )[0] as ReferrerData
                                  )
                                }
                              />
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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
                {permissions[1].includes('694') && (
                  <button
                    type='submit'
                    onClick={() => setShowAddModal(true)}
                    className='h-10 min-w-40 bg-[#7747C0] text-white rounded-lg hover:bg-purple-800'>
                    + بازاریاب جدید
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}
export default Referrer
