import { getCookieByKey } from '@/actions/cookieToken'
import { getProductGroupData } from '@/actions/setData'
import { useData } from '@/Context/Data'
import { useStates } from '@/Context/States'
import { ProductGroupData } from '@/interfaces'
import { EditProductGroup } from '@/services/products'
import { CloseSquare, Danger, Forbidden2, Trash } from 'iconsax-react'

const DeleteModal = ({
  isActive,
  data,
  close,
}: {
  isActive?: boolean
  data: ProductGroupData
  close: (show: boolean) => void
}) => {
  const { setProductGroupData, setBrandsData } = useData()
  const { showModal } = useStates()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const accessToken = (await getCookieByKey('access_token')) || ''

    await EditProductGroup({
      accessToken,
      status: 9,
      name: data.group_desc,
      group_id: data.id,
    }).then(async (result) => {
      showModal({
        type: result.status === 1 ? 'success' : 'error',
        main: <p>{result.message}</p>,
        title: result.status === 1 ? 'موفق' : 'خطا',
        autoClose: 2,
      })
      await getProductGroupData().then((value) => {
        if (value) {
          setProductGroupData(value.productGroups)
          setBrandsData(value.brands)
        }
      })
      close(false)
    })
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
              حذف گروه محصول
            </div>
            <div className=''>
              <CloseSquare
                size={24}
                cursor='pointer'
                color='#50545F'
                onClick={() => close(false)}
              />
            </div>
          </div>

          {isActive ? (
            <div className='flex gap-3 p-3 my-3 rounded-lg bg-red-100 text-[#D42620]'>
              <Forbidden2 size={24} color='#D42620' />
              <p>این زیر گروه فعال می‌باشد، شما امکان حذف آن‌ را ندارید.</p>
            </div>
          ) : (
            <div className='flex font-bold my-5'>
              آیا مطمئن به حذف گروه محصول
              <p className='px-3 rounded-lg mx-1 bg-purple-300 text-[#6137A0]'>
                {data.group_desc}
              </p>
              هستید؟
            </div>
          )}
          <div className='flex'>
            <Danger color='#CDA125' size={22} />
            <p className='text-[#CDA125]'>
              محصولات مرتبط به این گروه نیز حذف خواهد شد.
            </p>
          </div>
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
                  type='submit'
                  className='w-full mt-4 px-4 py-2 bg-[#7747C0] text-white rounded-lg hover:bg-purple-800'>
                  انصراف
                </button>
                <button
                  type='submit'
                  className='flex gap-1 justify-center w-full mt-4 px-4 py-2 border border-red-700 text-red-700 rounded-lg hover:bg-purple-100'>
                  <Trash size={24} color='#D42620' />
                  حذف گروه محصول
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
