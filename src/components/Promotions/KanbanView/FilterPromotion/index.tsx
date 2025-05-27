import { CloseSquare, Message } from 'iconsax-react'

const FilterPromotion = ({
  setResult,
  close,
}: {
  setResult: (show: number) => void
  close: () => void
}) => {
  return (
    <div>
      <div className='absolute bg-slate-600 opacity-50 w-full h-[200vh] z-50 top-0 right-0'></div>
      <div
        className={`fixed p-8 z-50 right-0 top-0 max-md:left-[0] max-md:w-[100%] w-[40vw] h-full bg-white border border-gray-300 shadow-lg transition-transform duration-300 ease-in-out right-side-animate 
     `}>
        <div className='flex flex-col bg-white  max-md:px-5 max-md:pb-24'>
          <div className='flex justify-between items-center w-full text-xl font-medium text-right text-gray-800 max-md:max-w-full'>
            <div className='flex-1 shrink self-stretch my-auto min-w-[240px] max-md:max-w-full'>
              تنظیمات نمایش پروموشن
            </div>
            <div
              className='
           '>
              <CloseSquare
                size={24}
                cursor='pointer'
                color='#50545F'
                onClick={() => close()}
              />
            </div>
          </div>
          <div className='flex justify-center mt-7 p-2 rounded-lg gap-2 bg-[#E2F1FC]'>
            <Message color='#1D91CC' size={22} />
            <p>محصولات مرتبط به این گروه را در قسمت زیر اضافه کنید.</p>
          </div>
          <div className='flex flex-col gap-4 mt-10'>
            {[
              'براساس گروه‌های انتخاب شده',
              'بر اساس گروه محصول انتخاب شده',
            ].map((type, index) => (
              <label
                key={index}
                className='flex items-center gap-3 cursor-pointer'>
                <input
                  type='radio'
                  defaultChecked={index === 0}
                  name='beneficiary'
                  value={type}
                  onChange={() => setResult(index)}
                  className='w-5 h-5 cursor-pointer accent-[#7747C0]'
                />
                <span className='text-gray-700'>{type}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterPromotion
