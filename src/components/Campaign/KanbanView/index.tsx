import Image from 'next/image'
import { useMenu } from '@/Context/Menu'
import { CampaignInterface } from '@/interfaces'
import Done from '../CampaignCard/Done'
import Progress from '../CampaignCard/Progress'
import Wait from '../CampaignCard/Wait'
import { ArrowLeft2 } from 'iconsax-react'
import { useState } from 'react'
import AddCampaign from '../AddCampaign'

const Kanban = ({
  done,
  toDo,
  progress,
  length,
  setListStatus,
}: {
  done: CampaignInterface[]
  toDo: CampaignInterface[]
  progress: CampaignInterface[]
  length: number
  setListStatus: (status: string) => void
}) => {
  const { setMenu } = useMenu()
  const [showAddModal, setShowAddModal] = useState<boolean | CampaignInterface>(
    false
  )

  return (
    <>
      {showAddModal && (
        <AddCampaign
          existData={showAddModal as CampaignInterface}
          close={setShowAddModal}
        />
      )}
      <div className='flex flex-col p-5'>
        <div className='flex justify-between items-center mb-7'>
          <p className='cursor-pointer'>
            <span className='text-[#98A2B3]'> کمپین </span>
          </p>
          {length > 0 && (
            <button
              onClick={() => {
               setShowAddModal(true)
              }}
              className='h-10 min-w-40 bg-purple-700 text-white rounded-lg hover:bg-purple-800'>
              + کمپین جدید
            </button>
          )}
        </div>
        <div className='p-6 bg-white rounded-lg border border-gray-200'>
          {length > 0 ? (
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
                      setMenu('campaign-list')
                    }}>
                    <p>مشاهده بیشتر</p>
                    <ArrowLeft2 color='#7747C0' size={24} />
                  </div>
                </div>
                {toDo.map((campaign, index) => (
                  <Wait key={index} campaign={campaign} />
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
                      setMenu('campaign-list')
                    }}>
                    <p>مشاهده بیشتر</p>
                    <ArrowLeft2 color='#7747C0' size={24} />
                  </div>
                </div>
                {progress.map((campaign, index) => (
                  <Progress key={index} campaign={campaign} />
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
                      setMenu('campaign-list')
                    }}>
                    <p>مشاهده بیشتر</p>
                    <ArrowLeft2 color='#7747C0' size={24} />
                  </div>
                </div>
                {done.map((campaign, index) => (
                  <Done key={index} campaign={campaign} />
                ))}
              </div>
            </div>
          ) : (
            <div className='w-full bg-white flex flex-col gap-2 justify-center items-center'>
              <h1 className='text-2xl'>شما کمپینی تعریف نکرده‌اید </h1>
              <Image
                src={'/icons/empty-box.svg'}
                width={444}
                height={333}
                alt=''
                className='w-[10%]'
              />
              <div className='border min-w-[40%] my-5'></div>
              <h1 className='text-2xl'> تعریف کمپین </h1>
              <button
                type='submit'
                onClick={() => setMenu('new-campaign')}
                className='h-10 min-w-40 bg-purple-700 text-white rounded-lg hover:bg-purple-800'>
                + کمپین جدید
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Kanban
