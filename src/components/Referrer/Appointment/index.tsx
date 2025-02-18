import { getCookieByKey } from '@/actions/cookieToken'
import { ReferrerData } from '@/interfaces'
import { DefineAppointmentTask } from '@/services/referrer'
import { ArrowDown2, CloseSquare, Profile } from 'iconsax-react'
import { useState, useRef } from 'react'
import { useData } from '@/Context/Data'
import { useStates } from '@/Context/States'
import SelectList from '@/components/shared/SelectList'

interface AppointmentModalProps {
  data?: ReferrerData
  close: (show: boolean) => void
}

const AppointmentModal = ({ data, close }: AppointmentModalProps) => {
  const { showModal } = useStates()
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [step, setStep] = useState<number>(1)
  const [showDetails, setShowDetails] = useState<boolean>(false)
  const {
    groupData,
    subGroupData,
    productGroupData,
    brandsData,
    productData,
    TreeChartInterface,
  } = useData()
  const refs = useRef({
    groupId: '',
    subGroupId: '',
    productGroupId: 0,
    brandId: 1,
    productId: 0,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setErrors({})

    const accessToken = (await getCookieByKey('access_token')) || ''
    await DefineAppointmentTask({
      accessToken,
      personnel_uid: data?.pers_uid || '',
      supervisor_code: refs.current.subGroupId || '',
      sup_group_code: refs.current.groupId || '',
      visitor_uid: '',
      task_kpi_uid: '',
    }).then((result) => {
      showModal({
        type: result.status === 1 ? 'success' : 'error',
        main: <p>{result.message}</p>,
        title: result.status === 1 ? 'موفق' : 'خطا',
        autoClose: 2,
      })
    })
  }

  return (
    <div>
      <div className='absolute bg-slate-600 opacity-50 w-full h-[200vh] z-50 top-0 right-0'></div>
      <div
        style={{ scrollbarWidth: 'none' }}
        className={`fixed overflow-auto  z-50 right-0 top-0 max-md:left-[0] max-md:w-[100%] w-[40vw] h-full bg-white border border-gray-300 shadow-lg transition-transform duration-300 ease-in-out right-side-animate`}>
        <div className='sticky top-0 p-3 z-40 bg-white flex justify-between items-center w-[97%] text-xl font-medium text-right text-gray-800'>
          <div className=' flex-1 shrink my-auto min-w-[240px]'>
            انتصاب دادن بازاریاب
          </div>
          <CloseSquare
            size={24}
            cursor='pointer'
            color='#50545F'
            onClick={() => close(false)}
          />
        </div>
        <div className='flex justify-between  p-2 mx-8 mt-3 border rounded-lg'>
          {!showDetails ? (
            <div className='flex'>
              <Profile size={24} color='#000000' />
              <p>{`${data?.pers_name} ${data?.pers_family}`}</p>
              <p className='bg-[#DAFEE5] text-[#0F973D] min-w-12 rounded-lg'>
                {Array.isArray(TreeChartInterface) &&
                  TreeChartInterface.find(
                    (chart) => `${chart.id}` === `${data?.pers_chart_id}`
                  )?.chtitle}
              </p>
            </div>
          ) : (
            <div className=''>
              <div className='grid grid-cols-2 gap-6 mt-5'>
                <div className='flex flex-col'>
                  <p className='text-[#5F6474]'>نام</p>
                  <p className='text-[#8455D2]'>{data?.pers_name}</p>
                </div>
                <div className='flex flex-col'>
                  <p className='text-[#5F6474]'>نام خانوادگی</p>
                  <p className='text-[#8455D2]'>{data?.pers_family}</p>
                </div>
                <div className='flex flex-col'>
                  <p className='text-[#5F6474]'> نوع بازاریاب</p>
                  <p className='text-[#8455D2]'>{data?.pers_chart_id}</p>
                </div>
                <div className='flex flex-col'>
                  <p className='text-[#5F6474]'>شماره همراه</p>
                  <p className='text-[#8455D2]'>{data?.pers_tel}</p>
                </div>
                <div className='flex flex-col'>
                  <p className='text-[#5F6474]'>تاریخ تولد</p>
                  <p className='text-[#8455D2]'>{'فیلدش تو بک نیست'}</p>
                </div>
                <div className='flex flex-col'>
                  <p className='text-[#5F6474]'>تحصیلات</p>
                  <p className='text-[#8455D2]'>
                    {data?.last_educational_degree_title}
                  </p>
                </div>
                <div className='flex flex-col'>
                  <p className='text-[#5F6474]'>جنسیت</p>
                  <p className='text-[#8455D2]'>{data?.sex_id}</p>
                </div>
                <div className='flex flex-col'>
                  <p className='text-[#5F6474]'>وضعیت تاهل</p>
                  <p className='text-[#8455D2]'>{'فیلدش تو بک نیست'}</p>
                </div>
                <div className='flex flex-col'>
                  <p className='text-[#5F6474]'> استان </p>
                  <p className='text-[#8455D2]'>{data?.StateDesc}</p>
                </div>
                <div className='flex flex-col'>
                  <p className='text-[#5F6474]'>شهر</p>
                  <p className='text-[#8455D2]'>{data?.CityDesc}</p>
                </div>
              </div>
              <div className='flex flex-col my-3'>
                <p className='text-[#5F6474]'>آدرس</p>
                <p className='text-[#8455D2]'>{data?.pers_address}</p>
              </div>
              <div className='flex flex-col my-3'>
                <p className='text-[#5F6474]'>وضعیت بازاریاب</p>
                <p className='text-[#0F973D] bg-[#DAFEE5] w-fit min-w-16 mx-3 rounded-lg text-center'>
                  {data?.pers_status}
                </p>
              </div>
              <div className='flex flex-col mt-5'>
                <p className='text-[#5F6474]'> گروه‌ و زیرگروه‌های عضو شده</p>
                <div className='flex gap-3'>
                  {
                    <p className='text-[#3B5A4F] bg-[#A1E3CB] px-5 py-1 rounded-full w-fit'>
                      {'نیاز به اضافه شدن در بک'}
                    </p>
                  }
                </div>
              </div>
              <div className='flex flex-col mt-5'>
                <p className='text-[#5F6474]'>گروه و برند محصول عضو شده </p>
                <div className='flex gap-3'>
                  {
                    <p className='text-[#3B5A4F] bg-[#A1E3CB] px-5 py-1 rounded-full w-fit'>
                      {'نیاز به اضافه شدن در بک'}
                    </p>
                  }
                </div>
              </div>
            </div>
          )}
          <ArrowDown2
            size={24}
            color='#000000'
            className={`cursor-pointer`}
            onClick={() => setShowDetails(!showDetails)}
          />
        </div>
        <div className='w-full flex justify-around items-center mb-6 '>
          <div className='w-[55%] absolute flex'>
            <div className='border w-full border-[#7747C0]'></div>
            <div
              className={`border w-full ${
                step > 1 ? 'border-[#7747C0]' : 'border-[#C9D0D8]'
              }`}></div>
          </div>
          {['انتصاب به گروه', ' انتصاب به گروه محصول'].map((section, index) => (
            <div className='flex flex-col items-center' key={index}>
              <div
                onClick={() => setStep(index + 1)}
                className={`w-10 h-10 z-30 p-6 flex items-center justify-center rounded-full border-4  border-white mt-5 cursor-pointer text-white ${
                  step >= index + 1
                    ? ' bg-[#7747C0] '
                    : 'bg-[#C9D0D8] text-[#50545F]'
                }`}>
                {index + 1}
              </div>
              <p className=' text-[#7747C0]'>{section}</p>
            </div>
          ))}
        </div>
        {step === 1 ? (
          <div className='flex flex-col m-3 gap-3'>
            <div className='flex flex-col w-full'>
              <label>گروه خود را انتخاب کنید</label>
              <select
                className='w-full border rounded-lg h-10 px-1 outline-none'
                onChange={(e) => (refs.current.groupId = e.target.value)}>
                {groupData?.map((group) => (
                  <option key={group.sup_group_id} value={group.sup_group_id}>
                    {group.sup_group_name}
                  </option>
                ))}
              </select>
              {errors.phone && (
                <span className='text-red-500'>{errors.phone}</span>
              )}
            </div>
            <div className='flex flex-col w-full'>
              <label>زیرگروه خود را انتخاب کنید</label>
              <select
                className='w-full border rounded-lg h-10 px-1 outline-none'
                onChange={(e) => (refs.current.subGroupId = e.target.value)}>
                {subGroupData?.map((subGroupData) => (
                  <option
                    key={subGroupData.supervisor_id}
                    value={subGroupData.supervisor_code}>
                    {subGroupData.supervisor_name}
                  </option>
                ))}
              </select>
              {errors.phone && (
                <span className='text-red-500'>{errors.phone}</span>
              )}
            </div>
            <div className='w-full mt-10 sticky bottom-0 left-0 right-0 bg-white p-2 max-w-[40vw] mx-auto'>
              <button
                onClick={() => setStep(2)}
                className='w-full h-10 text-white bg-[#7747C0] rounded-lg'>
                مرحله بعد
              </button>
            </div>
          </div>
        ) : (
          <div className='flex flex-col m-3 gap-3'>
            <div className='flex flex-col w-full'>
              <label>گروه محصول را انتخاب کنید</label>
              <select
                className='w-full border rounded-lg h-10 px-1 outline-none'
                onChange={(e) =>
                  (refs.current.productGroupId = parseInt(`${e.target.value}`))
                }>
                {productGroupData?.map((pg) => (
                  <option key={pg.id} value={pg.id}>
                    {pg.group_desc}
                  </option>
                ))}
              </select>
              {errors.phone && (
                <span className='text-red-500'>{errors.phone}</span>
              )}
            </div>
            <div className='flex flex-col w-full'>
              <label>برند محصول را انتخاب کنید</label>
              <select
                className='w-full border rounded-lg h-10 px-1 outline-none'
                onChange={(e) => (refs.current.groupId = e.target.value)}>
                {brandsData?.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.group_desc}
                  </option>
                ))}
              </select>
              {errors.phone && (
                <span className='text-red-500'>{errors.phone}</span>
              )}
            </div>
            <div className='flex flex-col w-full'>
              <SelectList
                label='محصول را انتخاب کنید'
                items={
                  productData?.map((gp) => {
                    return {
                      id: gp.id,
                      label: gp.ini_name,
                    }
                  }) || []
                }
                setSelectedItems={(result)=>''}
              />

              <select
                className='w-full border rounded-lg h-10 px-1 outline-none'
                onChange={(e) => (refs.current.groupId = e.target.value)}>
                {productData?.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.ini_name}
                  </option>
                ))}
              </select>
              {errors.phone && (
                <span className='text-red-500'>{errors.phone}</span>
              )}
            </div>
            <div className='w-full mt-10 sticky bottom-0 left-0 right-0 bg-white p-2 max-w-[40vw] mx-auto'>
              <button
                onClick={handleSubmit}
                className='w-full h-10 text-white bg-[#7747C0] rounded-lg'>
                ثبت نهایی
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AppointmentModal
