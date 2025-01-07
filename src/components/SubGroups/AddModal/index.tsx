import { getCookieByKey } from '@/actions/cookieToken'
import { useGroupData } from '@/Context/GroupsData'
import { CreateSubGroup, EditSubGroup } from '@/services/items'
import { CloseSquare } from 'iconsax-react'
import { useState } from 'react'

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
    name: '',
    groupId: 0,
  })
  const { groupData } = useGroupData()
  const handleSubmit = async () => {
    const accessToken = (await getCookieByKey('access_token')) || ''
    if (existName)
      CreateSubGroup({ accessToken, groupID: data.groupId, name: data.name })
    else EditSubGroup({ accessToken, mobile: '', name: data.name })
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
              className={`!w-full outline-none border rounded-lg h-10 px-1 cursor-pointer border-[#C9D0D8]`}>
              {groupData?.map((gp) => (
                <option key={gp.sup_group_code} value={gp.sup_group_code} defaultChecked={groupId?gp.sup_group_id===groupId:false}>
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

          <div className='mt-10 w-full max-md:max-w-full'>
            <button
              type='submit'
              className={`fill-button px-10 h-10 rounded-lg  `}>
              ثبت
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddModal
