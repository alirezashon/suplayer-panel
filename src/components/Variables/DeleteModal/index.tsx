import { getCookieByKey } from '@/actions/cookieToken'
import { useStates } from '@/Context/States'
import { KPIData } from '@/interfaces'
import { EditKPITask } from '@/services/items'
import { CloseSquare, Trash } from 'iconsax-react'

const DeleteModal = ({ close, data }: { close: () => void; data: KPIData }) => {
  const { showModal } = useStates()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const accessToken = (await getCookieByKey('access_token')) || ''
    const response = await EditKPITask({
      accessToken,
      kpi_title: data.kpi_title,
      kpi_code: data.kpi_code,
      kpi_type: data.kpi_type,
      kpi_time_series: data.kpi_time_series,
      task_kpi_uid: data.task_kpi_uid,
      status: 9,
    })
    showModal({
      type: response.status === 1 ? 'success' : 'error',
      main: <p>{response.message}</p>,
      title: response.status === 1 ? 'موفق' : 'خطا',
      autoClose: 2,
    })
    close()
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
              حذف فرمول
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

          <div className='flex gap-10'>
            <button
              type='button'
              onClick={() => close()}
              className='w-full mt-4 px-4 py-2 bg-[#7747C0] text-white rounded-lg hover:bg-purple-800'>
              انصراف
            </button>
            <button
              type='submit'
              className='flex gap-1 justify-center w-full mt-4 px-4 py-2 border border-red-700 text-red-700 rounded-lg hover:bg-purple-100'>
              <Trash size={24} color='#D42620' />
              حذف زیر گروه
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default DeleteModal
