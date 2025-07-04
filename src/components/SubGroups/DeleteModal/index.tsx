import { getCookieByKey } from '@/actions/cookieToken'
import { getSubGroupData } from '@/actions/setData'
import { useData } from '@/Context/Data'
import { useStates } from '@/Context/States'
import { EditSubGroup } from '@/services/items'
import { CloseSquare, Forbidden2, Trash } from 'iconsax-react'

const DeleteModal = ({
  isActive = false,
  name,
  groupId,
  close,
}: {
  isActive?: boolean
  name: string
  groupId: number
  close: () => void
}) => {
  const { showModal, submitting, setSubmitting } = useStates()
  const { setSubGroupData } = useData()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    const accessToken = (await getCookieByKey('access_token')) || ''
    EditSubGroup({
      accessToken,
      group_id: `${groupId}`,
      code: `${name.split('#$%^@!~')[1]}`,
      name: `${name.split('#$%^@!~')[0]}`,
      status: 9,
    })
      .then(async (value) => {
        if (value && value.status === 1) {
          await getSubGroupData().then((subgp) => {
            if (subgp) setSubGroupData(subgp)
          })
        }
        showModal({
          type: value.status === 1 ? 'success' : 'error',
          main: <p>{value.message}</p>,
          title: value.status === 1 ? 'موفق' : 'خطا',
          autoClose: 2,
        })
      })
      .catch(() =>
        showModal({
          type: 'error',
          main: <p>خطایی پیش آمد</p>,
          title: 'خطا',
          autoClose: 2,
        })
      )
    setSubmitting(false)
      close()
  }

  return (
    <div>
      <div className='absolute bg-slate-600 opacity-50 w-full h-[200vh] z-50 top-0 right-0'></div>
      <div
        className={`fixed p-10 rounded-lg z-50  max-md:w-[100%] w-[40vw]  bg-white border border-gray-300 shadow-lg transition-transform duration-300 ease-in-out delete-box-animate `}>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col bg-white max-md:px-5 max-md:pb-24'>
          <div className='flex justify-between items-center w-full text-xl font-medium text-right text-gray-800 max-md:max-w-full'>
            <div className='flex-1 shrink self-stretch my-auto min-w-[240px] max-md:max-w-full'>
              حذف زیر گروه
            </div>
            <div className=''>
              <CloseSquare
                size={24}
                cursor='pointer'
                color='#50545F'
                onClick={() => close()}
              />
            </div>
          </div>

          {isActive ? (
            <div className='flex gap-3 p-3 my-3 rounded-lg bg-red-100 text-[#D42620]'>
              <Forbidden2 size={24} color='#D42620' />
              <p>این زیر گروه فعال می‌باشد، شما امکان حذف آن‌ را ندارید.</p>
            </div>
          ) : (
            <div className='font-bold my-5'>
              آیا مطمئن به حذف زیر گروه
              <span className='px-3 rounded-lg mx-1 bg-purple-300 text-[#6137A0]'>
                {name.split('#$%^@!~')[0]}
              </span>
              هستید؟
            </div>
          )}
          <div className='flex gap-10'>
            {isActive ? (
              <button
                type='submit'
                className={`fill-button px-10 h-10 rounded-lg  `}>
                بستن
              </button>
            ) : (
              <>
                <button
                  onClick={() => close()}
                  className='w-full mt-4 px-4 py-2 bg-[#7747C0] text-white rounded-lg hover:bg-purple-800'>
                  انصراف
                </button>
                <button
                  type='submit'
                  disabled={submitting}
                  className={`  ${
                    submitting && 'opacity-30 cursor-not-allowed'
                  } flex gap-1 justify-center w-full mt-4 px-4 py-2 border border-red-700 text-red-700 rounded-lg hover:bg-purple-100`}>
                  <Trash size={24} color='#D42620' />
                  حذف زیر گروه
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
