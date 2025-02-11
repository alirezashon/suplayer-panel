import { CloseSquare, Trash } from 'iconsax-react'
import { useState } from 'react'
const AddModal = ({
  groupName,
  close,
}: {
  groupName?: string
  close: (show: boolean) => void
}) => {
  const [names, setNames] = useState<string[]>([''])

  const handleAddInput = () => {
    setNames([...names, ''])
  }

  const handleRemoveInput = (index: number) => {
    setNames((prev) => prev.filter((_, i) => i !== index))
  }

  const handleInputChange = (value: string, index: number) => {
    setNames((prev) => prev.map((item, i) => (i === index ? value : item)))
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
          className='flex flex-col bg-white  max-md:px-5 max-md:pb-24'>          <div className='flex justify-between items-center w-full text-xl font-medium text-right text-gray-800 max-md:max-w-full'>
            <div className='flex-1 shrink self-stretch my-auto min-w-[240px] max-md:max-w-full'>
              تعریف زیر گروه جدید
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
            {names.map((name, index) => (
              <div key={index} className='flex flex-col w-full mb-4'>
                <label className='text-base font-medium text-right text-gray-800'>
                  نام زیر گروه خود را بنویسید
                </label>
                <div className='flex items-center gap-2'>
                  <input
                    value={name}
                    onChange={(e) => handleInputChange(e.target.value, index)}
                    type='text'
                    placeholder='نام زیر گروه محصول'
                    className='flex-1 border border-gray-300 rounded-lg px-4 py-2'
                  />
                  {index > 0 && (
                    <Trash
                      onClick={() => handleRemoveInput(index)}
                      size={24}
                      color='#D42620'
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className='flex justify-end mt-3'>
            <button
              type='button'
              onClick={handleAddInput}
              className='text-[#7747C0] font-bold hover:text-[#7747C0]'>
              + افزودن زیر گروه جدید
            </button>
          </div>
          <div className='mt-10 w-full max-md:max-w-full'>
            <button type='submit' className='fill-button px-10 h-10 rounded-lg'>
              ثبت
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddModal
