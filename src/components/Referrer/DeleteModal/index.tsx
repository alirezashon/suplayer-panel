import { CloseSquare, Forbidden2, Trash } from 'iconsax-react'
import { useState } from 'react'

const DeleteModal = ({
  isActive,
  name,
  close,
}: {
  isActive?: boolean
  name: string
  close: (show: boolean) => void
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <div>
      <div className='absolute bg-slate-600 opacity-50 w-full h-[200vh] z-50 top-0 right-0'></div>
      <div
        className={`fixed p-10 rounded-lg z-50  max-md:w-[100%] w-[40vw]  bg-white border border-gray-300 shadow-lg transition-transform duration-300 ease-in-out delete-box-animate 
     `}>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col bg-white max-md:px-5 max-md:pb-24'>
          <div className='flex justify-between items-center w-full text-xl font-medium text-right text-gray-800 max-md:max-w-full'>
            <div className='flex-1 shrink self-stretch my-auto min-w-[240px] max-md:max-w-full'>
              حذف بازاریاب
            </div>
            <div
              className='
           '>
              <CloseSquare
                size={24}
                cursor='pointer'
                color='#50545F'
                onClick={() => close(false)}
              />
            </div>
          </div>

          {!isActive ? (
            <div className='flex gap-3 p-3 my-3 rounded-lg bg-red-100 text-[#D42620]'>
              <Forbidden2 size={24} color='#D42620' />
              <p>این زیر گروه فعال می‌باشد، شما امکان حذف آن‌ را ندارید.</p>
            </div>
          ) : (
            <div className='font-bold my-5'>
              آیا مطمئن به حذف
              <span className='px-3 rounded-lg mx-1 bg-purple-300 text-[#6137A0]'>
                {name}
              </span>
              هستید؟
            </div>
          )}
          <div className='flex gap-10'>
            {!isActive ? (
              <button
                type='submit'
                className={`flex-1 shrink gap-2 self-stretch px-3 py-2 w-full text-base text-center text-white whitespace-nowrap bg-purple-700 rounded-lg border border-purple-700 border-solid min-h-[40px] `}>
                بستن
              </button>
            ) : (
              <>
                <button
                  type='submit'
                  className='w-full mt-4 px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800'>
                  انصراف
                </button>
                <button
                  type='submit'
                  className='flex gap-1 justify-center w-full mt-4 px-4 py-2 border border-red-700 text-red-700 rounded-lg hover:bg-purple-100'>
                  <Trash size={24} color='#D42620' />
                  حذف بازاریاب
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default DeleteModal
