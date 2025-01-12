import { getCookieByKey } from '@/actions/cookieToken'
import { CreateGroup, EditGroup } from '@/services/items'
import { CloseSquare, Grammerly } from 'iconsax-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

const AddModal = ({
  existName,
  close,
  sup_group_code,
}: {
  existName?: string
  close: (show: null) => void
  sup_group_code: string
}) => {
  const [name, setName] = useState<string>(existName || '')
  const [isConfirmed, setIsConfirmed] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsConfirmed(true)
    const accessToken = (await getCookieByKey('access_token')) || ''
    if (!sup_group_code) {
      const response = await CreateGroup({ accessToken, name })
      if (response.status === 1) {
        toast.success(response.message)
      } else if (response.status === '-1') {
        toast.error(response.message)
      } else {
        toast.error('لطفا دوباره امتحان کنید')
      }
    } else {
      const response = await EditGroup({ accessToken, name, sup_group_code })
      if (response.status === 1) {
        toast.success(response.message)
      } else if (response.status === '-1') {
        toast.error(response.message)
      } else {
        toast.error('لطفا دوباره امتحان کنید')
      }
      setTimeout(() => {
        setIsConfirmed(false)
      }, 2222)
    }
  }
  return (
    <div>
      <div className='absolute bg-slate-600 opacity-50 w-full h-[200vh] z-50 top-0 right-0'></div>
      <div
        className={`fixed p-10 z-50 right-0 top-0 max-md:left-[0] max-md:w-[100%] w-[40vw] h-full bg-white border border-gray-300 shadow-lg transition-transform duration-300 ease-in-out right-side-animate 
     `}>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col bg-white max-w-[594px] pb-[852px] max-md:px-5 max-md:pb-24'>
          <div className='flex justify-between items-center w-full text-xl font-medium text-right text-gray-800 max-md:max-w-full'>
            <div className='flex-1 shrink self-stretch my-auto min-w-[240px] max-md:max-w-full'>
              {existName ? 'ویرایش گروه جدید' : 'تعریف گروه جدید'}
            </div>
            <div
              className='
           '>
              <CloseSquare
                size={24}
                cursor='pointer'
                color='#50545F'
                onClick={() => close(null)}
              />
            </div>
          </div>

          <div className='mt-10 w-full max-md:max-w-full'>
            <div className='flex flex-col w-full'>
              <label className='text-base font-medium text-right text-gray-800'>
                نام گروه خود را بنویسید
              </label>
              <input
                defaultValue={name}
                onChange={(e) => setName(e.target.value)}
                type='text'
                placeholder='نام گروه محصول'
              />
            </div>
          </div>

          <div className='mt-10 w-full max-md:max-w-full'>
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
                عملیات موفقیت‌آمیز بود! <Grammerly size={24} color='#0F973D' />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddModal
