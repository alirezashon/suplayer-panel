import Image from 'next/image'
import { useMenu } from '@/Context/Menu'
import { PromotionInterface } from '@/interfaces'
import Done from '../PromotionCard/Done'
import Progress from '../PromotionCard/Progress'
import Wait from '../PromotionCard/Wait'
import { ArrowLeft2, Danger } from 'iconsax-react'

const Kanban = ({
  done,
  toDo,
  progress,
  length,
  setListStatus,
}: {
  done: PromotionInterface[]
  toDo: PromotionInterface[]
  progress: PromotionInterface[]
  length: number
  setListStatus: (status: string) => void
}) => {
  const { setMenu } = useMenu()

  return (
    <>
      <div className='flex flex-col p-5'>
        <div className='flex justify-between items-center mb-7'>
          <p className='cursor-pointer'>
            <span className='text-[#98A2B3]'>پروموشن</span>
          </p>
          {length > 0 && (
            <button
              onClick={() => {
                location.hash = 'new-promotion'
                setMenu('new-promotion')
              }}
              className='h-10 min-w-40 bg-[#7747C0] text-white rounded-lg hover:bg-purple-800'>
              + پروموشن جدید
            </button>
          )}
        </div>
        <div className='p-6 bg-white rounded-lg border border-gray-200'>
          {length > 0 ? (
            <div>
              <div className='bg-[#F6F2CB] px-7 py-2 m-5'>
                <p className='font-bold'>قوانین و مسئولیت‌ها</p>
                <div className='flex items-center p-2 gap-4'>
                  <Danger color='#A9791C' size={28} />
                  <p className='text-[#8D5C1B] '>
                    سایت امکان تعریف کمپین و پروموشن و نمایش آن در گروه‌های
                    موردنظر را فراهم می‌کند. <br />
                    بااین‌حال، مسئولیت کامل محتوا، شرایط، و پیامدهای این
                    کمپین‌ها بر عهده تعریف‌کننده است.
                    <br />
                    سایت صرفاً بستر ارائه این خدمات را فراهم می‌کند و هیچ
                    مسئولیتی در قبال نتایج، عواقب جانبی، یا مغایرت‌های احتمالی
                    ندارد.
                  </p>
                </div>
              </div>
              <div className='flex gap-5'>
                <div className='flex-1 flex flex-col gap-3'>
                  <div className='flex justify-between border-b-4 border-[#FFCA5E] mb-10 pb-2'>
                    <div className='flex gap-1'>
                      <p>شروع نشده </p>
                      <p className='text-slate-400'>{toDo.length}</p>
                    </div>
                    <div
                      className='cursor-pointer text-[#7747C0] flex gap-1'
                      onClick={() => {
                        setListStatus('1')
                        setMenu('promotion-list')
                      }}>
                      <p>مشاهده بیشتر</p>
                      <ArrowLeft2 color='#7747C0' size={24} />
                    </div>
                  </div>
                  {toDo.map((promotion, index) => (
                    <Wait key={index} promotion={promotion} />
                  ))}
                </div>
                <div className='flex-1 flex flex-col gap-3'>
                  <div className='flex justify-between border-b-4 border-[#B09CE9] mb-10 pb-2'>
                    <div className='flex gap-1'>
                      <p> در حال انجام </p>
                      <p className='text-slate-400'>{progress.length}</p>
                    </div>
                    <div
                      className='cursor-pointer text-[#7747C0] flex gap-1'
                      onClick={() => {
                        setListStatus('2')
                        setMenu('promotion-list')
                      }}>
                      <p>مشاهده بیشتر</p>
                      <ArrowLeft2 color='#7747C0' size={24} />
                    </div>
                  </div>
                  {progress.map((promotion, index) => (
                    <Progress key={index} promotion={promotion} />
                  ))}
                </div>
                <div className='flex-1 flex flex-col gap-3'>
                  <div className='flex justify-between border-b-4 border-[#A1E3CB] mb-10 pb-2'>
                    <div className='flex gap-1'>
                      <p>تمام شده </p>
                      <p className='text-slate-400'>{done.length}</p>
                    </div>
                    <div
                      className='cursor-pointer text-[#7747C0] flex gap-1'
                      onClick={() => {
                        setListStatus('3')
                        setMenu('promotion-list')
                      }}>
                      <p>مشاهده بیشتر</p>
                      <ArrowLeft2 color='#7747C0' size={24} />
                    </div>
                  </div>
                  {done.map((promotion, index) => (
                    <Done key={index} promotion={promotion} />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className='w-full bg-white flex flex-col gap-2 justify-center items-center'>
              <h1 className='text-2xl'>شما پروموشنی تعریف نکرده‌اید </h1>
              <Image
                src={'/icons/empty-box.svg'}
                width={444}
                height={333}
                alt=''
                className='w-[10%]'
              />
              <div className='border min-w-[40%] my-5'></div>
              <h1 className='text-2xl'> تعریف پروموشن</h1>
              <button
                type='submit'
                onClick={() => setMenu('new-promotion')}
                className='h-10 min-w-40 bg-[#7747C0] text-white rounded-lg hover:bg-purple-800'>
                + پروموشن جدید
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Kanban
