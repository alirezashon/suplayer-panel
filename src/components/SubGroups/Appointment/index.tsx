import { getCookieByKey } from '@/actions/cookieToken'
import { BeneficiaryData, SubGroup } from '@/interfaces'
import { CloseSquare } from 'iconsax-react'
import { useState, useEffect } from 'react'
import { useData } from '@/Context/Data'
import { useStates } from '@/Context/States'
import SelectList from '@/components/shared/SelectList'
import { EditBeneficiary } from '@/services/items'
import MultiSelectTrees from '@/components/shared/MultiSelectTrees'
import { DefineAppointmentTaskList } from '@/services/referrer'

interface AppointmentModalProps {
  data?: SubGroup
  type: 0 | 1
  close: () => void
}
const AppointmentModal = ({ data, close, type }: AppointmentModalProps) => {
  const { showModal, selectedSubGroupData } = useStates()
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [selectedBeneficiary, setSelectedBeneficiary] = useState<
    BeneficiaryData[]
  >([])
  const [selectedReferrers, setSelectedReferrers] = useState<string[]>([])
  const [referrers, setRefererers] = useState<
    {
      id: number | string
      label: string
      children: { id: number | string; label: string }[]
    }[]
  >([])
  const { beneficiaryData, referrerData } = useData()

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
        acc[curr.pers_chart_id].children.push({
          label: curr.pers_full_name,
          id: curr.personnel_uid,
        })
        return acc
      }, {} as Record<string, { id: number | string; label: string; children: { id: number | string; label: string }[] }>)
    )

    setRefererers(convertedReferrer)
  }, [referrerData])

  const handleSubmit = async () => {
    setErrors({})
    const accessToken = (await getCookieByKey('access_token')) || ''
    if (type === 0) {
      if (selectedBeneficiary.length < 1) {
        showModal({
          type: 'error',
          main: <p>لطفا ذی نفع های خود را انتخاب کنید</p>,
          title: 'خطا',
          autoClose: 1,
        })
        return
      }
      await Promise.all(
        selectedBeneficiary?.map(async (beneficiary) => {
          const result = await EditBeneficiary({
            accessToken,
            ...beneficiary,
            supervisor_id: selectedSubGroupData?.supervisor_id as number,
          })
          if (result.status === 1) {
            showModal({
              type: 'success',
              title: 'موفق',
              main: <p>{result.message}</p>,
              autoClose: 0.9,
            })
          } else {
            showModal({
              type: 'error',
              title: 'ناموفق',
              main: <p>{result.message}</p>,
              autoClose: 0.9,
            })
            close()
          }
        })
      )
    } else {
      if (selectedReferrers.length < 1) {
        showModal({
          type: 'error',
          main: <p>لطفا بازاریاب های خود را انتخاب کنید</p>,
          title: 'خطا',
          autoClose: 1,
        })
        return
      }
      const newSelected = selectedReferrers?.map((value) => ({
        personnel_uid: value,
        supervisor_code: '',
        sup_group_code: '',
        visitor_uid: '',
        task_kpi_uid: '',
        pgroup_id: 0,
        chart_id: 0,
        product_uid: '',
      }))

      const result = await DefineAppointmentTaskList({
        accessToken,
        tasks: newSelected,
      })

      showModal({
        type: result.status === 1 ? 'success' : 'error',
        main: <p>{result.message}</p>,
        title: result.status === 1 ? 'موفق' : 'خطا',
        autoClose: 2,
      })
      close()
    }
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
            onClick={() => close()}
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
                    beneficiaryData?.map((bn) => ({
                      id: bn.visitor_name,
                      label: bn.visitor_full_name,
                    })) || []
                  }
                  setSelectedItems={(selectedIds) =>
                    setSelectedBeneficiary(
                      () =>
                        beneficiaryData?.filter((data) =>
                          selectedIds.includes(data.visitor_name)
                        ) || []
                    )
                  }
                  label='نام گروه'
                />
              </div>
            ) : (
              <div className=''>
                <label htmlFor=''>انتخاب بازاریاب </label>
                <MultiSelectTrees
                  placeholder='بازاریاب مورد نظر را از داخل سطح مربوطه انتخاب کنید'
                  trees={referrers}
                  onSelect={setSelectedReferrers}
                />
              </div>
            )}
          </div>
        </div>
        <button
          className='fill-button w-full my-40 rounded-md h-10'
          onClick={handleSubmit}>
          ثبت
        </button>
      </div>
    </div>
  )
}

export default AppointmentModal
