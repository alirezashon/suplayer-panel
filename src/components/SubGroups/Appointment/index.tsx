import { getCookieByKey } from '@/actions/cookieToken'
import { SubGroup } from '@/interfaces'
import { CloseSquare } from 'iconsax-react'
import { useState, useRef, useEffect } from 'react'
import { useData } from '@/Context/Data'
import { useStates } from '@/Context/States'
import SelectList from '@/components/shared/SelectList'
import RadioTreeSelector from '@/components/shared/RadioTrees'

interface AppointmentModalProps {
  data?: SubGroup
  type: 0 | 1
  close: (show: boolean) => void
}

const AppointmentModal = ({ data, close, type }: AppointmentModalProps) => {
  const { showModal } = useStates()
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [referrers, setRefererers] = useState<
    {
      id: number | string
      label: string
      children: string[]
    }[]
  >([])
  const { beneficiaryData, referrerData } = useData()
  const refs = useRef({
    groupId: '',
    subGroupId: '',
    productGroupId: 0,
    personnel_uid: '',
    visitor_uid: [] as Array<string | number>,
    brandId: 1,
    productId: 0,
  })

  useEffect(() => {
    if (!referrerData) return

    const convertedReferrer = Object.values(
      referrerData.reduce((acc, curr) => {
        if (!acc[curr.pers_chart_id]) {
          acc[curr.pers_chart_id] = {
            id: curr.pers_chart_id,
            label: curr.pers_chart_title,
            children: [],
          }
        }
        acc[curr.pers_chart_id].children.push(curr.pers_full_name)
        return acc
      }, {} as Record<string, { id: number | string; label: string; children: string[] }>)
    )

    setRefererers(convertedReferrer)
  }, [referrerData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setErrors({})

    const accessToken = (await getCookieByKey('access_token')) || ''
    // await DefineAppointmentTask({
    //   accessToken,
    //   personnel_uid: data?.pers_uid || '',
    //   supervisor_code: refs.current.subGroupId || '',
    //   sup_group_code: refs.current.groupId || '',
    //   visitor_uid: '',
    //   task_kpi_uid: '',
    // }).then((result) => {
    //   showModal({
    //     type: result.status === 1 ? 'success' : 'error',
    //     main: <p>{result.message}</p>,
    //     title: result.status === 1 ? 'موفق' : 'خطا',
    //     autoClose: 2,
    //   })
    // })
  }

  return (
    <div>
      <div className='absolute bg-slate-600 opacity-50 w-full h-[200vh] z-50 top-0 right-0'></div>
      <div
        style={{ scrollbarWidth: 'none' }}
        className={`fixed overflow-auto  z-50 right-0 px-4 top-0 max-md:left-[0] max-md:w-[100%] w-[40vw] h-full bg-white border border-gray-300 shadow-lg transition-transform duration-300 ease-in-out right-side-animate`}>
        <div className='sticky top-0 my-5 z-40 bg-white flex justify-between items-center w-[97%] text-xl font-medium text-right text-gray-800'>
          <div className=' flex-1 shrink my-auto min-w-[240px]'>
            {type === 0 ? 'انتصاب ذی نفع' : ' انتصاب دادن بازاریاب'}
          </div>
          <CloseSquare
            size={24}
            cursor='pointer'
            color='#50545F'
            onClick={() => close(false)}
          />
        </div>
        <div className='flex justify-between mt-5'>
          <p className='text-[#8455D2]'>گروه </p>
          <p>{data?.sup_group_name}</p>
        </div>
        <div className='flex justify-between mt-3'>
          <p className='text-[#8455D2]'>زیر گروه </p>
          <p>{data?.supervisor_name}</p>
        </div>
        <div className='flex flex-col w-full'>
          <div className='flex flex-col gap-5 my-3'>
            {type == 0 ? (
              <div className=''>
                <label htmlFor=''>انتخاب ذی نفع</label>
                <SelectList
                  items={
                    beneficiaryData?.map((ben) => {
                      return {
                        id: ben?.visitor_id,
                        label: ben?.visitor_full_name,
                      }
                    }) || []
                  }
                  setSelectedItems={(result: Array<string | number>) =>
                    (refs.current.visitor_uid = result)
                  }
                  label='داروخانه مد نظر خود را انتخاب کنید'
                />
              </div>
            ) : (
              <div className=''>
                <label htmlFor=''>انتخاب بازاریاب </label>
                <RadioTreeSelector
                  placeholder='بازاریاب مورد نظر را از داخل سطح مربوطه انتخاب کنید'
                  trees={referrers}
                  onSelect={(value: string) => value}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppointmentModal
