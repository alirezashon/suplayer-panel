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
  const [isOpen, setIsOpen] = useState(false)

  const toggleItem = (id: string | number) => {
    let updatedSelectedItems
    if (names.includes(id)) {
      updatedSelectedItems = names.filter((item) => item !== id)
    } else {
      updatedSelectedItems = [...names, id]
    }
    setNames(updatedSelectedItems)
    setNames(updatedSelectedItems)
  }
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
                <div className='relative w-full'>
                  <div
                    className='border border-gray-300 rounded-md h-10 py-2 px-4 cursor-pointer flex justify-between items-center'
                    onClick={() => setIsOpen((prev) => !prev)}>
                    <span className='text-gray-700'>جستجو</span>
                    <span className='text-gray-400'>&#x25BC;</span>
                  </div>

                  {isOpen && (
                    <div className='absolute w-full border border-gray-300 bg-white rounded-md mt-2 shadow-md z-10'>
                      {Array(10)
                        .fill('دکتر محدثه عالمی')
                        .map((item, index) => (
                          <div
                            key={index}
                            className={`flex items-center gap-2 px-4 py-2 cursor-pointer ${
                              !names.includes(item.id) &&
                              'text-[#7747C0] hover:bg-gray-100 hover:text-[#7747C0]'
                            }`}
                            onClick={() => toggleItem(item.id)}>
                            <input
                              type='checkbox'
                              checked={names.includes(item.id)}
                              readOnly
                              className={`form-checkbox appearance-none 
    h-5 w-5 border-2  rounded-md
    ${names.includes(item.id) ? 'bg-[#7747C0]' : 'bg-white'}
  `}
                            />
                            <span
                              className={`${
                                names.includes(item)
                                  ? 'text-purple-600'
                                  : 'text-gray-700'
                              }`}>
                              {item}
                            </span>
                          </div>
                        ))}
                    </div>
                  )}
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
