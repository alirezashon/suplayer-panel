"use client"
import { getCookieByKey } from "@/actions/cookieToken"
import { AppointmentTaskInterface, ReferrerData } from "@/interfaces"
import { GetAppointmentTaskList } from "@/services/referrer"
import { CloseSquare } from "iconsax-react"
import { useEffect, useState } from "react"
import Showtasks from "./design"

interface ShowDetailsProps {
  data: ReferrerData
  close: (show: boolean) => void
}

const ShowDetails = ({ data, close }: ShowDetailsProps) => {
  const [taskList, setTaskList] = useState<AppointmentTaskInterface[]>([])
  useEffect(() => {
    const getData = async () => {
      const accessToken = await getCookieByKey("access_token")
      await GetAppointmentTaskList({
        accessToken,
        uid: data.personnel_uid,
      }).then((result) => {
        if (result) setTaskList(result)
      })
    }
    getData()
  }, [data])
  console.log(taskList)
  return (
    <div>
      <div className='absolute bg-slate-600 opacity-50 w-full h-[200vh] z-50 top-0 right-0'></div>
      <div
        style={{ scrollbarWidth: "none" }}
        className={`fixed overflow-auto  z-50 right-0 top-0 max-md:left-[0] max-md:w-[100%] w-[40vw] h-full bg-white border border-gray-300 shadow-lg transition-transform duration-300 ease-in-out right-side-animate px-5 `}
      >
        <div className='sticky top-0  flex justify-between bg-white items-center w-[100%] text-xl font-medium text-right text-gray-800'>
          <div className=' flex-1 shrink py-2 min-w-[240px]'>
            جزئیات بازاریاب
          </div>
          <CloseSquare
            size={24}
            cursor='pointer'
            color='#50545F'
            onClick={() => close(false)}
          />
        </div>
        <div className=''>
          <div className='grid grid-cols-2 gap-6 mt-5'>
            <div className='flex flex-col'>
              <p className='text-[#5F6474]'>نام</p>
              <p className='text-[#8455D2]'>{data.pers_name}</p>
            </div>
            <div className='flex flex-col'>
              <p className='text-[#5F6474]'>نام خانوادگی</p>
              <p className='text-[#8455D2]'>{data.pers_family}</p>
            </div>
            <div className='flex flex-col'>
              <p className='text-[#5F6474]'> نوع بازاریاب</p>
              <p className='text-[#8455D2]'>{data.pers_chart_id}</p>
            </div>
            <div className='flex flex-col'>
              <p className='text-[#5F6474]'>شماره همراه</p>
              <p className='text-[#8455D2]'>{data.pers_tel}</p>
            </div>
            <div className='flex flex-col'>
              <p className='text-[#5F6474]'>تاریخ تولد</p>
              <p className='text-[#8455D2]'>{data.birthdate}</p>
            </div>
            <div className='flex flex-col'>
              <p className='text-[#5F6474]'>تحصیلات</p>
              <p className='text-[#8455D2]'>
                {data.last_educational_degree_title}
              </p>
            </div>
            <div className='flex flex-col'>
              <p className='text-[#5F6474]'>جنسیت</p>
              <p className='text-[#8455D2]'>
                {data.sex_id === 2 ? "مرد" : "زن"}
              </p>
            </div>
            <div className='flex flex-col'>
              <p className='text-[#5F6474]'>وضعیت تاهل</p>
              <p className='text-[#8455D2]'>
                {data.last_educational_major_title}
              </p>
            </div>
            <div className='flex flex-col'>
              <p className='text-[#5F6474]'> استان </p>
              <p className='text-[#8455D2]'>
                {data.sex_id === 2
                  ? "متاهل"
                  : data.sex_id === 1
                  ? "مجرد"
                  : "نامشخص"}
              </p>
            </div>
            <div className='flex flex-col'>
              <p className='text-[#5F6474]'>شهر</p>
              <p className='text-[#8455D2]'>{data.CityDesc}</p>
            </div>
          </div>
          <div className='flex flex-col my-3'>
            <p className='text-[#5F6474]'>آدرس</p>
            <p className='text-[#8455D2]'>{data.pers_address}</p>
          </div>
          <div className='flex flex-col my-3'>
            <p className='text-[#5F6474]'>وضعیت بازاریاب</p>
            <p
              className={`${
                data.pers_status === 1
                  ? " text-[#0F973D] bg-[#DAFEE5]"
                  : "text-[#97130f] bg-[#fedcda]"
              } w-fit min-w-16 mx-3 rounded-lg text-center`}
            >
              {data.pers_status === 1 ? "فعال" : "غیر فعال"}
            </p>
          </div>
          <div className='flex flex-col mt-5'>
            <p className='text-[#5F6474]'> گروه‌ و زیرگروه‌های عضو شده</p>
            <Showtasks task={taskList} type={1} />
          </div>
          <div className='flex flex-col mt-5'>
            <p className='text-[#5F6474]'>گروه و برند محصول عضو شده </p>
            <div className='flex gap-3'>
              <Showtasks task={taskList} type={2} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShowDetails
