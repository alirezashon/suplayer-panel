import { getCookieByKey } from '@/actions/cookieToken'
import { getSubGroupData } from '@/actions/setData'
import RadioTreeSelector from '@/components/shared/RadioTrees'
import SelectList from '@/components/shared/SelectList'
import { useData } from '@/Context/Data'
import { CreateSubGroup, EditSubGroup } from '@/services/items'
import { CloseSquare, Grammerly, Trash } from 'iconsax-react'
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
  const { groupData, setSubGroupData } = useData()
  const [data, setData] = useState<{ name: string; groupId: number }>({
    name: existName?.split('#$%^@!~')[0] || '',
    groupId,
  })
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [nestedNames, setNestedNames] = useState<string[]>([])
  const [, setSelectedItems] = useState<Array<string | number>>([])
  const [errors, setErrors] = useState<Record<string, string>>()
  const [status, setStatus] = useState<React.ReactElement>()
  const setResult = (state: boolean, text?: string) => {
    state
      ? setStatus(
          <p className='text-[#0F973D] flex items-center gap-2'>
            عملیات موفقیت‌آمیز بود! <Grammerly size={24} color='#0F973D' />
          </p>
        )
      : setStatus(
          <p className='text-[#D42620] flex items-center gap-2'>
            {text} <Grammerly size={24} color='#D42620' />
          </p>
        )
  }
  const items = [
    { id: 1, label: 'گروه زنان و زایمان' },
    { id: 2, label: 'گروه پوست و مو' },
    { id: 3, label: 'گروه پزشکان عمومی' },
    { id: 4, label: 'گروه قلب و عروق' },
  ]

  const saveData = async (groupID: number, name: string) => {
    const accessToken = (await getCookieByKey('access_token')) || ''
    if (!existName)
      CreateSubGroup({ accessToken, groupID, name })
        .then((value) =>
          value.status === '-1'
            ? setResult(false, value.message)
            : setResult(true)
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
            ? setResult(false, value.message)
            : setResult(true)
        )
        .catch(() => toast.error('خطایی پیش آمد'))
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (data.name.length < 1) {
      setErrors({ name: 'این فیلد اجباریست' })
      return
    }
    setIsConfirmed(true)
    await saveData(data.groupId, data.name)
    await Promise.all(
      nestedNames.map(async (name) => await saveData(data.groupId, name))
    )
    await getSubGroupData().then((value) => value && setSubGroupData(value))

    setTimeout(() => {
      setIsConfirmed(false)
    }, 3333)
  }
  const sampleData = [
    {
      id: 1,
      label: 'مدیران فروش',
      children: ['دکتر صدقه عالی', 'دکتر ناصر احمدی', 'دکتر زهرا کمالی'],
    },
    {
      id: 2,
      label: 'مدیران منطقه',
      children: ['دکتر علی مرادی', 'دکتر فاطمه حسینی', 'دکتر کامران شیری'],
    },
    {
      id: 3,
      label: 'مدیران شعبه',
      children: ['دکتر لیلا صادقی', 'دکتر مجید عباسی', 'دکتر پروین امینی'],
    },
  ]
  return (
    <div>
      <div className='absolute bg-slate-600 opacity-50 w-full h-[200vh] z-50 top-0 right-0'></div>
      <div
        style={{ scrollbarWidth: 'none' }}
        className={` overflow-y-auto fixed p-8 z-50 right-0 top-0 max-md:left-[0] max-md:w-[100%] w-[40vw] h-full bg-white border border-gray-300 shadow-lg transition-transform duration-300 ease-in-out right-side-animate 
     `}>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col bg-white max-w-[594px] pb-[852px] max-md:px-5 max-md:pb-24'>
          <div className='flex justify-between items-center w-full text-xl font-medium text-right text-gray-800 max-md:max-w-full'>
            <div className='flex-1 shrink self-stretch my-auto min-w-[240px] max-md:max-w-full'>
              تعریف زیرگروه جدید
            </div>
            <CloseSquare
              size={24}
              cursor='pointer'
              color='#50545F'
              onClick={() => close(false)}
            />
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

          <div className='mt-10 w-full max-md:max-w-full add-new-input-animated'>
            <div className='flex flex-col w-full'>
              <label className='text-base font-medium text-right text-gray-800'>
                نام زیر گروه خود را بنویسید
              </label>
              <input
                onChange={(e) => {
                  errors?.name && setErrors({})
                  setData({ name: e.target.value, groupId: data.groupId })
                }}
                defaultValue={data.name}
                className={`${
                  errors?.name &&
                  'border-red-300 border-2 shadow-red-200 shadow-md error-input-animated'
                }`}
                placeholder='مثال: دکترهای پوست، تهران غرب ...'
              />
              {errors?.name && (
                <p className='text-red-500 m-1'>{errors?.name}</p>
              )}
            </div>
          </div>
          {nestedNames.map((name, index) => (
            <div
              className={`mt-7 w-full flex gap-5 ${
                index === nestedNames.length - 1 && 'add-new-input-animated'
              }`}
              key={index}>
              <div className='flex flex-col w-full'>
                <label className='text-base font-medium text-right text-gray-800'>
                  نام زیر گروه خود را بنویسید
                </label>
                <div className='flex items-center gap-3'>
                  <input
                    className='w-full'
                    defaultValue={name}
                    placeholder='نام زیر گروه خود را بنویسید'
                  />
                  {
                    <div className='flex items-center h-max'>
                      <Trash
                        size={24}
                        color='#D42620'
                        cursor={'pointer'}
                        onClick={() => {
                          setNestedNames((prv) =>
                            prv.filter((_, prvIndex) => prvIndex !== index)
                          )
                        }}
                      />
                    </div>
                  }
                </div>
              </div>
            </div>
          ))}
          {existName && (
            <div className='flex flex-col gap-5 my-5'>
              <div className=''>
                <label htmlFor=''>انتخاب ذی نفع</label>
                <SelectList
                  items={items}
                  setSelectedItems={setSelectedItems}
                  label='داروخانه مد نظر خود را انتخاب کنید'
                />
              </div>
              <div className=''>
                <label htmlFor=''>انتخاب بازاریاب </label>
                <RadioTreeSelector
                  trees={sampleData}
                  onSelect={(value: string) => value}
                />
              </div>
            </div>
          )}
          <div className='flex justify-end my-5'>
            <p
              className='text-[#7747C0] cursor-pointer'
              onClick={() => setNestedNames((prv) => [...prv, ''])}>
              + زیر گروه جدید
            </p>
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
              className={`absolute ${
                !isConfirmed && ' opacity-0 '
              } transform -translate-x-1/2 text-[#0F973D] flex rounded-lg transition-all duration-1000 ease-in-out`}
              style={{
                animation: `${
                  isConfirmed
                    ? 'showSuccessText 1s ease-in-out forwards '
                    : 'hideSuccessText 1s ease-in-out forwards '
                }`,
              }}>
              {status}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddModal
