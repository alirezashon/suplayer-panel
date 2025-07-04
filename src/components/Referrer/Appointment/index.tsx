import { getCookieByKey } from "@/actions/cookieToken"
import { AppointmentTaskInterface, ReferrerData } from "@/interfaces"
import {
  DefineAppointmentTaskList,
  GetAppointmentTaskList,
} from "@/services/referrer"
import { ArrowDown2, CloseSquare, Profile } from "iconsax-react"
import { useEffect, useRef, useState } from "react"
import { useData } from "@/Context/Data"
import { useStates } from "@/Context/States"
import SelectList from "@/components/shared/SelectList"
import Showtasks from "../ShowDetails/design"

interface AppointmentModalProps {
  data?: ReferrerData
  isEditMode?: boolean
  close: () => void
}

const AppointmentModal = ({
  data,
  close,
  isEditMode = false,
}: AppointmentModalProps) => {
  const {
    groupData,
    subGroupData,
    productGroupData,
    brandsData,
    productData,
    TreeChartInterface,
  } = useData()
  const { showModal } = useStates()
  const [step, setStep] = useState<number>(1)
  const [showDetails, setShowDetails] = useState<boolean>(false)
  const [taskList, setTaskList] = useState<AppointmentTaskInterface[]>([])
  const [selectedParent, setSelectedParent] = useState<{
    groups: string[]
    productGroups: number[]
    brands: number[]
  }>({ groups: [], productGroups: [], brands: [] })

  const refs = useRef({
    personnel_uid: `${data?.personnel_uid}`,
    visitor_uid: "",
    task_kpi_uid: "",
    sup_group_code: [] as string[],
    supervisor_code: [] as string[],
    pgroup_id: [] as number[],
    chart_id: [] as number[],
    product_uid: [] as string[],
  })

  useEffect(() => {
    const getData = async () => {
      const accessToken = await getCookieByKey("access_token")
      if (data)
        await GetAppointmentTaskList({
          accessToken,
          uid: data.personnel_uid,
        }).then((result) => {
          if (result) setTaskList(result)
        })
    }
    getData()
  }, [data])
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const accessToken = (await getCookieByKey("access_token")) || ""
    await DefineAppointmentTaskList({
      accessToken,
      personnel_uid: refs.current.personnel_uid,
      supervisor_code: refs.current.supervisor_code,
      sup_group_code: refs.current.sup_group_code,
      visitor_uid: refs.current.visitor_uid,
      task_kpi_uid: refs.current.task_kpi_uid,
      pgroup_id: refs.current.pgroup_id,
      chart_id: refs.current.chart_id,
      product_uid: refs.current.product_uid,
    }).then((result) => {
      showModal({
        type: result.status === 1 ? "success" : "error",
        main: <p>{result.message}</p>,
        title: result.status === 1 ? "موفق" : "خطا",
        autoClose: 2,
      })
    })
  }

  return (
    <div>
      <div className='absolute bg-slate-600 opacity-50 w-full h-[200vh] z-50 top-0 right-0'></div>
      <div
        style={{ scrollbarWidth: "none" }}
        className={`fixed overflow-auto  z-50 right-0 top-0 max-md:left-[0] max-md:w-[100%] w-[40vw] h-full bg-white border border-gray-300 shadow-lg transition-transform duration-300 ease-in-out right-side-animate`}
      >
        <div className='sticky top-0 p-3 z-40 bg-white flex justify-between items-center w-[97%] text-xl font-medium text-right text-gray-800'>
          <div className=' flex-1 shrink my-auto min-w-[240px]'>
            انتصاب دادن بازاریاب
          </div>
          <CloseSquare
            size={24}
            cursor='pointer'
            color='#50545F'
            onClick={() => close()}
          />
        </div>
        <div className='flex justify-between  p-2 mx-8 mt-3 border rounded-lg'>
          {!showDetails ? (
            <div className='flex'>
              <Profile size={24} color='#000000' />
              <p>{`${data?.pers_name} ${data?.pers_family}`}</p>
              <p className='bg-[#DAFEE5] text-[#0F973D] min-w-12 rounded-lg'>
                {Array.isArray(TreeChartInterface) &&
                  TreeChartInterface.find(
                    (chart) => `${chart.id}` === `${data?.pers_chart_id}`
                  )?.chtitle}
              </p>
            </div>
          ) : (
            <div className=''>
              <div className='grid grid-cols-2 gap-6 mt-5'>
                <div className='flex flex-col'>
                  <p className='text-[#5F6474]'>نام</p>
                  <p className='text-[#8455D2]'>{data?.pers_name}</p>
                </div>
                <div className='flex flex-col'>
                  <p className='text-[#5F6474]'>نام خانوادگی</p>
                  <p className='text-[#8455D2]'>{data?.pers_family}</p>
                </div>
                <div className='flex flex-col'>
                  <p className='text-[#5F6474]'> نوع بازاریاب</p>
                  <p className='text-[#8455D2]'>{data?.pers_chart_id}</p>
                </div>
                <div className='flex flex-col'>
                  <p className='text-[#5F6474]'>شماره همراه</p>
                  <p className='text-[#8455D2]'>{data?.pers_tel}</p>
                </div>
                <div className='flex flex-col'>
                  <p className='text-[#5F6474]'>تاریخ تولد</p>
                  <p className='text-[#8455D2]'>{data?.birthdate}</p>
                </div>
                <div className='flex flex-col'>
                  <p className='text-[#5F6474]'>تحصیلات</p>
                  <p className='text-[#8455D2]'>
                    {data?.last_educational_degree_title}
                  </p>
                </div>
                <div className='flex flex-col'>
                  <p className='text-[#5F6474]'>جنسیت</p>
                  <p className='text-[#8455D2]'>{data?.sex_id}</p>
                </div>
                <div className='flex flex-col'>
                  <p className='text-[#5F6474]'>وضعیت تاهل</p>
                  <p className='text-[#8455D2]'>{"فیلدش تو بک نیست"}</p>
                </div>
                <div className='flex flex-col'>
                  <p className='text-[#5F6474]'> استان </p>
                  <p className='text-[#8455D2]'>{data?.StateDesc}</p>
                </div>
                <div className='flex flex-col'>
                  <p className='text-[#5F6474]'>شهر</p>
                  <p className='text-[#8455D2]'>{data?.CityDesc}</p>
                </div>
              </div>
              <div className='flex flex-col my-3'>
                <p className='text-[#5F6474]'>آدرس</p>
                <p className='text-[#8455D2]'>{data?.pers_address}</p>
              </div>
              <div className='flex flex-col my-3'>
                <p className='text-[#5F6474]'>وضعیت بازاریاب</p>
                <p className='text-[#0F973D] bg-[#DAFEE5] w-fit min-w-16 mx-3 rounded-lg text-center'>
                  {data?.pers_status === 1 ? "فعال" : "غیرفعال"}
                </p>
              </div>
              <div className='flex flex-col mt-5'>
                <p className='text-[#5F6474]'> گروه‌ و زیرگروه‌های عضو شده</p>
                <div className='flex gap-3'>
                  <Showtasks task={taskList} type={1} />
                </div>
              </div>
              <div className='flex flex-col mt-5'>
                <p className='text-[#5F6474]'>گروه و برند محصول عضو شده </p>
                <div className='flex gap-3'>
                  <Showtasks task={taskList} type={2} />
                </div>
              </div>
            </div>
          )}
          <ArrowDown2
            size={24}
            color='#000000'
            className={`cursor-pointer`}
            onClick={() => setShowDetails(!showDetails)}
          />
        </div>
        <div className='w-full flex justify-around items-center mb-6 '>
          <div className='w-[55%] absolute flex'>
            <div className='border w-full border-[#7747C0]'></div>
            <div
              className={`border w-full ${
                step > 1 ? "border-[#7747C0]" : "border-[#C9D0D8]"
              }`}
            ></div>
          </div>
          {["انتصاب به ذینفع", " انتصاب به گروه محصول"].map(
            (section, index) => (
              <div className='flex flex-col items-center' key={index}>
                <div
                  onClick={() => setStep(index + 1)}
                  className={`w-10 h-10 z-30 p-6 flex items-center justify-center rounded-full border-4  border-white mt-5 cursor-pointer text-white ${
                    step >= index + 1
                      ? " bg-[#7747C0] "
                      : "bg-[#C9D0D8] text-[#50545F]"
                  }`}
                >
                  {index + 1}
                </div>
                <p className=' text-[#7747C0]'>{section}</p>
              </div>
            )
          )}
        </div>
        {step === 1 ? (
          <div className='flex flex-col m-3 gap-3'>
            <div className='flex flex-col w-full'>
              <SelectList
                key={1}
                label='گروه خود را انتخاب کنید'
                items={
                  groupData?.map((gp) => {
                    return {
                      id: gp.sup_group_code,
                      label: gp.sup_group_name,
                    }
                  }) || []
                }
                setSelectedItems={(result) => {
                  setSelectedParent({
                    brands: selectedParent.brands,
                    groups: result as string[],
                    productGroups: selectedParent.productGroups,
                  })
                  refs.current.sup_group_code = result as string[]
                }}
              />
              {isEditMode && (
                <div className='flex flex-col mb-5 mt-2'>
                  <Showtasks task={taskList} type={3} />
                </div>
              )}
            </div>
            <div className='flex flex-col w-full'>
              <SelectList
                key={2}
                defaultSelectAll={true}
                label='زیرگروه خود را انتخاب کنید'
                items={
                  subGroupData
                    ?.filter(
                      (subGp) =>
                        selectedParent.groups.includes(
                          `${subGp.sup_group_id}`
                        ) && subGp
                    )
                    ?.map((gp) => {
                      return {
                        id: gp.supervisor_id,
                        label: gp.supervisor_name,
                      }
                    }) || []
                }
                setSelectedItems={(result) =>
                  (refs.current.supervisor_code = result as string[])
                }
              />
              {isEditMode && (
                <div className='flex flex-col mt-2 '>
                  <Showtasks task={taskList} type={4} />
                </div>
              )}
            </div>
            <div className='w-full mt-10 sticky bottom-0 left-0 right-0 bg-white p-2 max-w-[40vw] mx-auto'>
              <button
                onClick={() => setStep(2)}
                className='w-full h-10 text-white bg-[#7747C0] rounded-lg'
              >
                مرحله بعد
              </button>
            </div>
          </div>
        ) : (
          <div className='flex flex-col m-3 gap-3'>
            <div className='flex flex-col w-full'>
              <SelectList
                key={3}
                label='گروه محصول را انتخاب کنید'
                items={
                  productGroupData?.map((gp) => {
                    return {
                      id: gp.id,
                      label: gp.group_desc,
                    }
                  }) || []
                }
                setSelectedItems={(result) => {
                  refs.current.pgroup_id = result as number[]
                  setSelectedParent({
                    brands: selectedParent.brands,
                    groups: selectedParent.groups,
                    productGroups: result as number[],
                  })
                }}
              />
              {isEditMode && (
                <div className='flex flex-col mt-2 mb-5'>
                  <Showtasks task={taskList} type={5} />
                </div>
              )}
            </div>
            <div className='flex flex-col w-full'>
              <SelectList
                key={4}
                label='برند محصول را انتخاب کنید'
                defaultSelectAll={true}
                items={
                  brandsData
                    ?.filter(
                      (brnad) =>
                        selectedParent.productGroups.includes(
                          brnad.group_pid
                        ) && brnad
                    )
                    ?.map((brandName) => {
                      return {
                        id: brandName.id,
                        label: brandName.group_desc,
                      }
                    }) || []
                }
                setSelectedItems={(result) => {
                  refs.current.chart_id = result as number[]
                  setSelectedParent({
                    brands: result as number[],
                    groups: selectedParent.groups,
                    productGroups: selectedParent.productGroups,
                  })
                }}
              />
              {isEditMode && (
                <div className='flex flex-col mt-2 mb-5'>
                  <Showtasks task={taskList} type={5} />
                </div>
              )}
            </div>
            <div className='flex flex-col w-full'>
              <SelectList
                label='محصول را انتخاب کنید'
                defaultSelectAll={true}
                items={
                  productData
                    ?.filter(
                      (product) =>
                        selectedParent.brands.includes(
                          parseInt(product.group_id)
                        ) && product
                    )
                    ?.map((gp) => {
                      return {
                        id: gp.id,
                        label: gp.ini_name,
                      }
                    }) || []
                }
                setSelectedItems={(result) =>
                  (refs.current.product_uid = result as string[])
                }
              />
              {isEditMode && (
                <div className='flex flex-col mt-2 mb-5'>
                  <Showtasks task={taskList} type={6} />
                </div>
              )}
            </div>
            <div className='w-full mt-10 sticky bottom-0 left-0 right-0 bg-white p-2 max-w-[40vw] mx-auto'>
              <button
                onClick={handleSubmit}
                className='w-full h-10 text-white bg-[#7747C0] rounded-lg'
              >
                ثبت نهایی
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AppointmentModal
