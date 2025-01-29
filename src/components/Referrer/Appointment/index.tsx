import { getCookieByKey } from '@/actions/cookieToken'
import { Cities, County, ReferrerData, States } from '@/interfaces'
import { CreateReferrer, DefineAppointmentTask } from '@/services/referrer'
import { GetCity, GetCounty, GetStates } from '@/services/location'
import { ArrowDown2, CloseSquare, Profile } from 'iconsax-react'
import { useState, useRef, useEffect } from 'react'
import { useData } from '@/Context/Data'

interface AppointmentModalProps {
  data?: ReferrerData
  close: (show: boolean) => void
}

const AppointmentModal = ({ data, close }: AppointmentModalProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [step, setStep] = useState<number>(1)
  const { groupData, subGroupData, productGroupData, brandsData, productData } =
    useData()
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
        <div className='flex justify-between px-10 mt-3'>
          <div className='flex'>
            <Profile size={24} color='#000000' />
            <p>{data?.pers_full_name}</p>
          </div>
          <ArrowDown2 size={24} color='#000000' />
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
              <label>محصول را انتخاب کنید</label>
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
