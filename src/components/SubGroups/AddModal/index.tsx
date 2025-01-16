import { getCookieByKey } from '@/actions/cookieToken'
import { useData } from '@/Context/Data'
import { CreateSubGroup, EditSubGroup } from '@/services/items'
import { CloseSquare, Grammerly } from 'iconsax-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

const AddModal = ({
  existName,
  groupId,
  close,
}: {
  existName?: string
  groupId: number
  close: (show: boolean) => void
}) => {
  const [data, setData] = useState<{ name: string; groupId: number }>({
    name: existName?.split('#$%^@!~')[0] || '',
    groupId,
  })
  const [isConfirmed, setIsConfirmed] = useState(false)
  const { groupData } = useData()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsConfirmed(true)
    const accessToken = (await getCookieByKey('access_token')) || ''
    if (!existName)
      CreateSubGroup({ accessToken, groupID: data.groupId, name: data.name })
        .then((value) =>
          value.status === '-1'
            ? toast.error(value.message)
            : toast.success(value.message)
        )
        .catch(() => toast.error('خطایی پیش آمد'))
    else
      EditSubGroup({
        accessToken,
        group_id: `${data.groupId}`,
        code: `${existName.split('#$%^@!~')[1]}`,
        name: data.name,
      })
        .then((value) =>
          value.status === '-1'
            ? toast.error(value.message)
            : toast.success(value.message)
        )
    .catch(() => toast.error('خطایی پیش آمد'))
    setTimeout(() => {
      setIsConfirmed(false)
      close(false)
    }, 2222)
  }

  return (
    <div>
      <div className='absolute bg-slate-600 opacity-50 w-full h-[200vh] z-50 top-0 right-0'></div>
      <div
        className={`fixed p-10 z-50 right-0 top-0 max-md:left-[0] max-md:w-[100%] w-[40vw] h-full bg-white border border-gray-300 shadow-lg transition-transform duration-300 ease-in-out right-side-animate 
     `}>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col bg-white max-w-[594px] pb-[852px] max-md:px-5 max-md:pb-24'>
          <div className='flex justify-between items-center w-full text-xl font-medium text-right text-gray-800 max-md:max-w-full'>
            <div className='flex-1 shrink self-stretch my-auto min-w-[240px] max-md:max-w-full'>
              تعریف زیرگروه جدید
            </div>
            <div className=''>
              <CloseSquare
                size={24}
                cursor='pointer'
                color='#50545F'
                onClick={() => close(false)}
              />
            </div>
          </div>
          <div className='my-4'>
            <label id='status-label'> گروه خود را انتخاب کنید</label>
            <select
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  groupId: Number(e.target.value),
                }))
              }
              defaultValue={groupId}
              className={`!w-full outline-none border rounded-lg h-10 px-1 cursor-pointer border-[#C9D0D8]`}>
              {groupData?.map((gp) => (
                <option key={gp.sup_group_code} value={gp.sup_group_code}>
                  {gp.sup_group_name}
                </option>
              ))}
            </select>
          </div>

          <div className='mt-10 w-full max-md:max-w-full'>
            <div className='flex flex-col w-full'>
              <label className='text-base font-medium text-right text-gray-800'>
                نام زیر گروه خود را بنویسید
              </label>
              <input
                onChange={(e) =>
                  setData({ name: e.target.value, groupId: data.groupId })
                }
                defaultValue={data.name}
                type='text'
                placeholder='مثال: دکترهای پوست، تهران غرب ...'
              />
            </div>
          </div>
          <div className='flex items-center'>
            <button
              type='submit'
              style={{
                animation: `${
                  isConfirmed
                    ? 'hideSubmitAnimate 1s ease-in-out forwards '
                    : 'showSubmitAnimate 1s ease-in-out forwards '
                }`,
              }}
              className={`w-full fill-button px-10 h-10 mt-10 rounded-lg transition-transform duration-200 ease-in-out hover:scale-105`}>
              ثبت
            </button>

            <div
              className={`absolute ${!isConfirmed&& ' opacity-0 '} transform -translate-x-1/2 text-[#0F973D] flex rounded-lg transition-all duration-1000 ease-in-out`}
              style={{
                animation: `${
                  isConfirmed
                    ? 'showSuccessText 1s ease-in-out forwards '
                    : 'hideSuccessText 1s ease-in-out forwards '
                }`,
              }}>
              عملیات موفقیت‌آمیز بود! <Grammerly size={24} color='#0F973D'/>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddModal
