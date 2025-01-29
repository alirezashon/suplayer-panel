import { useData } from '@/Context/Data'
import { Printer, SearchNormal } from 'iconsax-react'
import { useState } from 'react'

const headers = [
  'ردیف',
  'نام ذی‌نفع',
  'نام خانوادگی ذی‌نفع',
  'اعتبار تخصیص داده شده',
  'اعتبار آزادسازی شده',
  'آزادسازی اعتبار',
  'بارگذاری فایل محاسبه',
]

const Release = () => {
  const { beneficiaryData } = useData()
  const handleFileUpload = (index: number, file: File | null) => {
    // const updatedData = [...data]
    // updatedData[index].uploadedFile = file
    // setData(updatedData)
  }

  return (
    <div className='m-4'>
      <div className='flex justify-between items-center mb-7'>
        <p>
          <span className='text-[#98A2B3]'>مدیریت پورسانت‌دهی </span> /
          <span className='text-[#7747C0]'>
            گروه مو / منطقه ۵ / آزادسازی گروهی
          </span>
        </p>
      </div>
      <div className='flex flex-col bg-white p-3'>
        <div className='flex flex-col'>
          <p className='text-[#8455D2]'>آزادسازی اعتبار تخصیص داده شده</p>

          <div className='flex gap-5 items-center'>
            <div className='relative w-full flex items-center'>
              <div className='absolute left-3 z-20 cursor-pointer text-[#50545F]'>
                <SearchNormal size={24} color='gray' />
              </div>

              <input
                type='search'
                placeholder='جستجو'
                className='absolute w-full z-10 border border-gray-300 rounded-md px-4 py-2 text-right outline-none focus:border-red-400'
              />
            </div>
            <button
              type='submit'
              className='border-button w-56 px-10 h-10 rounded-lg'>
              جستجو
            </button>
          </div>
          <div className='m-4'>
            <table className='my-10 w-full border-collapse border rounded-lg overflow-hidden'>
              <thead>
                <tr>
                  {headers.map((head, headIndex) => (
                    <th
                      className={`bg-[#F5F7F8] border-z h-10 ${
                        headIndex === 0
                          ? 'rounded-tr-lg'
                          : headIndex === headers.length - 1 && 'rounded-tl-lg'
                      } `}
                      key={headIndex}>
                      <p
                        className={`flex justify-center items-center border-y h-10  ${
                          headIndex === 0
                            ? 'border-r rounded-tr-lg'
                            : headIndex === headers.length - 1 &&
                              'border-l rounded-tl-lg'
                        }`}>
                        {head}
                      </p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {beneficiaryData?.map((row, index) => (
                  <tr key={index} className='border-b'>
                    <td className='text-center px-4 py-2 border-r'>
                      {index}
                    </td>
                    <td className='text-center px-4 py-2'>{row.visitor_name}</td>
                    <td className='text-center px-4 py-2'>{row.visitor_family}</td>
                    <td className='text-center px-4 py-2'>
                      {row.visitor_tel}
                    </td>
                    <td className='text-center px-4 py-2'>10,000,000 ریال</td>
                    <td className='text-center px-4 py-2'>
                      <input
                        type='text'
                        placeholder='مبلغ آزادسازی را وارد کنید'
                        className=' rounded px-2 py-1 w-full text-center'
                      />
                    </td>
                    <td className='text-center px-4 py-2'>
                      <label className='flex items-center gap-2 cursor-pointer'>
                        <input
                          type='file'
                          onChange={(e) =>
                            handleFileUpload(index, e.target.files?.[0] || null)
                          }
                          className='hidden'
                        />
                        <div className='w-full flex items-center justify-center border border-[#7747C0] text-[#7747C0] rounded-md px-4 py-2 text-sm'>
                          بارگذاری فایل
                        </div>
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className='flex items-center justify-between'>
              <div className='flex text-[#7747C0] cursor-pointer'>
                <Printer size={22} color='#7747C0' />
                <p>چاپ لیست</p>
              </div>
              <div className='flex mt-4 gap-10 justify-end'>
                <button
                  type='submit'
                  className='fill-button px-10 h-10 rounded-lg w-56'>
                  ثبت نهایی
                </button>
                <button
                  type='submit'
                  className='border-button px-10 h-10 rounded-lg w-56'>
                  ذخیره آزادسازی
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Release
