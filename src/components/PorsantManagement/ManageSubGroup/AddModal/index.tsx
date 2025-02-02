import SelectList from '@/components/shared/SelectList'
import { useData } from '@/Context/Data'
import { BeneficiaryData } from '@/interfaces'
import { CloseSquare } from 'iconsax-react'
import { useState } from 'react'
const AddModal = ({
  groupName,
  close,
}: {
  groupName?: string
  close: (show: boolean) => void
}) => {
  const [names, setNames] = useState<(string | number)[]>([''])
  const [selected, setSelected] = useState<BeneficiaryData[]>([])
  const { beneficiaryData } = useData()
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitted Names:', names)
  }
  return (
    <div>
      <div className='absolute bg-slate-600 opacity-50 w-full h-[200vh] z-50 top-0 right-0'></div>
      <div
        className={`fixed p-10 z-50 right-0 top-0 max-md:left-[0] max-md:w-[100%] w-[40vw] h-full bg-white border border-gray-300 shadow-lg transition-transform duration-300 ease-in-out right-side-animate`}>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col bg-white max-w-[594px] pb-[852px] max-md:px-5 max-md:pb-24'>
          <div className='flex justify-between items-center w-full text-xl font-medium text-right text-gray-800 max-md:max-w-full'>
            <div className='flex-1 shrink self-stretch my-auto min-w-[240px] max-md:max-w-full'>
              اضافه کردن ذی‌نفع
            </div>
            <div>
              <CloseSquare
                size={24}
                cursor='pointer'
                color='#50545F'
                onClick={() => close(false)}
              />
            </div>
          </div>
          <div className='mt-5 w-full max-md:max-w-full'>
            <div className='flex mb-5 justify-between'>
              <p className='text-[#7747C0]'>نام گروه</p>
              <p>{groupName}</p>
            </div>
            <div className='flex mb-5 justify-between'>
              <p className='text-[#7747C0]'>نام زیر گروه </p>
              <p>{groupName}</p>
            </div>
            <div className='flex mb-5 justify-between'>
              <p className='text-[#7747C0]'>بازاریاب </p>
              <p>{groupName}</p>
            </div>
            {names.map((name, index) => (
              <div key={index} className='flex flex-col w-full mb-4'>
                <label className='text-base font-medium text-right text-gray-800'>
                  انتخاب ذی‌نفع‌های من
                </label>
                <div className=''>
                  <label className='my-2'> گروه خود را انتخاب کنید </label>
                  <SelectList
                    items={
                      beneficiaryData?.map((bn) => ({
                        id: bn.visitor_name,
                        label: bn.visitor_name,
                      })) || []
                    }
                    setSelectedItems={(value: (string | number)[]) =>
                      setSelected((prv) => [
                        ...prv,
                        ...(beneficiaryData?.filter(
                          (data) => data.visitor_name === `${value}`
                        ) || []),
                      ])
                    }
                    label='نام گروه'
                  />
                </div>
              </div>
            ))}
          </div>
          <button type='submit' className='fill-button px-10 h-10 rounded-lg'>
            ثبت
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddModal
