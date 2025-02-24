import { getCookieByKey } from '@/actions/cookieToken'
import { getSubGroupData } from '@/actions/setData'
import { errorClass } from '@/app/assets/style'
import RadioTreeSelector from '@/components/shared/RadioTrees'
import { useData } from '@/Context/Data'
import { useStates } from '@/Context/States'
import { CreateSubGroup, EditSubGroup } from '@/services/items'
import { CloseSquare, Grammerly, Trash } from 'iconsax-react'
import { useState } from 'react'

const AddModal = ({
  existName,
  groupId,
  close,
}: {
  existName?: string
  groupId: number
  close: () => void
}) => {
  const { groupData, setSubGroupData, systemTypes } = useData()
  const { showModal } = useStates()
  const [data, setData] = useState<{ name: string; groupId: number }>({
    name: existName?.split('#$%^@!~')[0] || '',
    groupId,
  })
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [nestedNames, setNestedNames] = useState<string[]>([])
  const [selectedType, setSelectedType] = useState<number>(0)
  const [errors, setErrors] = useState<{ index: number; message: string }[]>([])
  const [status, setStatus] = useState<React.ReactElement>()
  const setResult = (state: boolean, text?: string) => {
    if (state) {
      setStatus(
        <p className='text-[#0F973D] flex items-center gap-2'>
          عملیات موفقیت‌آمیز بود! <Grammerly size={24} color='#0F973D' />
        </p>
      )
    } else {
      setStatus(
        <p className='text-[#D42620] flex items-center gap-2'>
          {text} <Grammerly size={24} color='#D42620' />
        </p>
      )
    }
  }

  const saveData = async (groupID: number, name: string) => {
    const accessToken = (await getCookieByKey('access_token')) || ''
    if (!existName)
      CreateSubGroup({
        accessToken,
        groupID,
        name,
        syschart_id: selectedType,
      }).then((value) => {
        showModal({
          type: value.status === 1 ? 'success' : 'error',
          main: <p>{value.message}</p>,
          title: value.status === 1 ? 'موفق' : 'خطا',
          autoClose: 2,
        })

        if (value.status === '-1') setResult(false, value.message)
        else setResult(true)
      })
    else
      EditSubGroup({
        accessToken,
        group_id: `${data.groupId}`,
        code: `${existName.split('#$%^@!~')[1]}`,
        name: data.name,
      })
        .then(async (value) => {
          showModal({
            type: value.status === 1 ? 'success' : 'error',
            main: <p>{value.message}</p>,
            title: value.status === 1 ? 'موفق' : 'خطا',
            autoClose: 2,
          })
          if (value.status === '-1') setResult(false, value.message)
          else setResult(true)
          await getSubGroupData().then(
            (value) => value && setSubGroupData(value)
          )
        })
        .catch(() =>
          showModal({
            type: 'error',
            main: <p>خطایی پیش آمد</p>,
            title: 'خطا',
            autoClose: 2,
          })
        )
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors = []
    if (data.name.length < 1) {
      newErrors.push({ index: 0, message: 'این فیلد اجباریست' })
    }

    nestedNames.forEach((name, i) => {
      if (name.trim() === '') {
        newErrors.push({ index: i + 1, message: 'این فیلد نباید خالی باشد' })
      }
    })

    if (newErrors.length > 0) {
      setErrors(newErrors)
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
      close()
    }, 4444)
  }

  const handleAddInput = () => {
    if (!data.name.trim()) {
      setErrors((prev) => [...prev, { index: 0, message: 'این فیلد اجباریست' }])
      return
    }

    const emptyIndex = nestedNames.findIndex((name) => name.trim() === '')
    if (emptyIndex !== -1) {
      setErrors((prev) => [
        ...prev.filter((err) => err.index !== emptyIndex + 1),
        {
          index: emptyIndex + 1,
          message: 'بعد از پر شدن می‌توان فیلد جدید اضافه کرد',
        },
      ])
      return
    }

    setNestedNames((prev) => [...prev, ''])
    setErrors((prev) => [
      ...prev,
      { index: nestedNames.length + 1, message: '' },
    ])
  }

  const handleInputChange = (index: number, value: string) => {
    setErrors((prev) => prev.filter((error) => error.index !== index + 1))
    const updatedNames = [...nestedNames]
    updatedNames[index] = value
    setNestedNames(updatedNames)

    setErrors((prev) => prev.filter((error) => error.index !== index + 1))
  }

  return (
    <div>
      <div className='absolute bg-slate-600 opacity-50 w-full h-[200vh] z-50 top-0 right-0'></div>
      <div
        style={{ scrollbarWidth: 'none' }}
        className={` overflow-y-auto fixed p-8 z-50 right-0 top-0 max-md:left-[0] max-md:w-[100%] w-[40vw] h-full bg-white border border-gray-300 shadow-lg transition-transform duration-300 ease-in-out right-side-animate 
     `}>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col bg-white  max-md:px-5 max-md:pb-24'>
          <div className='flex justify-between items-center w-full text-xl font-medium text-right text-gray-800 max-md:max-w-full'>
            <div className='flex-1 shrink self-stretch my-auto min-w-[240px] max-md:max-w-full'>
              تعریف زیرگروه جدید
            </div>
            <CloseSquare
              size={24}
              cursor='pointer'
              color='#50545F'
              onClick={() => close()}
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
          {systemTypes?.groupTypes && (
            <div className='mt-10'>
              <RadioTreeSelector
                trees={systemTypes?.groupTypes}
                placeholder='دسته بندی سیستمی خود را انتخاب کنید'
                onSelect={(value: string) => setSelectedType(parseInt(value))}
              />
            </div>
          )}
          <div className='mt-10 w-full max-md:max-w-full add-new-input-animated'>
            <div className='flex flex-col w-full'>
              <label className='text-base font-medium text-right text-gray-800'>
                نام زیر گروه خود را بنویسید
              </label>
              <input
                onChange={(e) => {
                  setData((prev) => ({ ...prev, name: e.target.value }))
                  setErrors((prev) => prev.filter((error) => error.index !== 0)) // حذف ارور مربوط به این فیلد
                }}
                value={data.name}
                className={`border ${
                  errors.some((err) => err.index === 0) ? errorClass : ''
                }`}
              />
              {errors.some((err) => err.index === 0) && (
                <p className='text-red-500 text-sm'>این فیلد اجباریست</p>
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
                    className={`w-full ${
                      errors.some((err) => err.index === index + 1)
                        ? errorClass
                        : ''
                    }`}
                    onChange={(e) => handleInputChange(index, e.target.value)}
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
                {errors.some((err) => err.index === index + 1) && (
                  <p className='text-red-500 text-sm'>
                    {errors.find((err) => err.index === index + 1)?.message}
                  </p>
                )}
              </div>
            </div>
          ))}
          <div className='flex justify-end my-5'>
            <p
              className='text-[#7747C0] cursor-pointer'
              onClick={handleAddInput}>
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
