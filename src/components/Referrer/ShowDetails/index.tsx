'use client'
import { getCookieByKey } from '@/actions/cookieToken'
import { AppointmentTaskInterface, ReferrerData } from '@/interfaces'
import {
  EditAppointmentTask,
  GetAppointmentTaskList,
} from '@/services/referrer'
import { CloseCircle, CloseSquare } from 'iconsax-react'
import { useEffect, useState } from 'react'

interface ShowDetailsProps {
  data: ReferrerData
  close: (show: boolean) => void
}

const ShowDetails = ({ data, close }: ShowDetailsProps) => {
  const [taskList, setTaskList] = useState<AppointmentTaskInterface[]>([])
  useEffect(() => {
    const getData = async () => {
      const accessToken = await getCookieByKey('access_token')
      await GetAppointmentTaskList({
        accessToken,
        uid: data.personnel_uid,
      }).then((result) => {
        if (result) setTaskList(result)
      })
    }
    getData()
  }, [data])
  const bgColors = [
    '#a3d8ff', // آبی خیلی روشن
    '#f58e9d', // صورتی خیلی روشن
    '#78ff82', // سبز نعنایی ملایم
    '#facd87', // نارنجی هلویی روشن
    '#eeadf7', // یاسی خیلی روشن
    '#99fff9', // سبز آبی روشن
    '#f5ea6e', // زرد پاستلی روشن
    '#ff91b6', // صورتی کمرنگ
    '#b07ffa', // بنفش خیلی روشن
    '#f0ff66', // زرد ملایم
  ]

  const textColors = [
    '#1565C0', // آبی تیره
    '#D32F2F', // قرمز تیره
    '#2E7D32', // سبز تیره
    '#E65100', // نارنجی تیره
    '#8E24AA', // بنفش تیره
    '#00897B', // سبزآبی تیره
    '#F9A825', // زرد پررنگ
    '#C2185B', // صورتی تیره
    '#512DA8', // بنفش سلطنتی
    '#827717', // زیتونی تیره
  ]

  const deleteTask = async (data: AppointmentTaskInterface) => {
    await EditAppointmentTask({
      accessToken: await getCookieByKey('access_token'),
      personnel_uid: data.personnel_uid,
      supervisor_code: data.supervisor_code,
      sup_group_code: data.sup_group_code,
      visitor_uid: data.visitor_uid,
      task_kpi_uid: data.task_kpi_uid,
      task_uid: data.task_uid,
      status: 9,
      pgroup_id: parseInt(data.pgroup_id),
      chart_id: parseInt(data.chart_id),
      product_uid: data.product_uid,
    })
  }
  return (
    <div>
      <div className='absolute bg-slate-600 opacity-50 w-full h-[200vh] z-50 top-0 right-0'></div>
      <div
        style={{ scrollbarWidth: 'none' }}
        className={`fixed overflow-auto  z-50 right-0 top-0 max-md:left-[0] max-md:w-[100%] w-[40vw] h-full bg-white border border-gray-300 shadow-lg transition-transform duration-300 ease-in-out right-side-animate px-5 `}>
        <div className='sticky top-0  flex justify-between items-center w-[97%] text-xl font-medium text-right text-gray-800'>
          <div className=' flex-1 shrink py-2 bg-white min-w-[240px]'>
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
              <p className='text-[#8455D2]'>{'فیلدش تو بک نیست'}</p>
            </div>
            <div className='flex flex-col'>
              <p className='text-[#5F6474]'>تحصیلات</p>
              <p className='text-[#8455D2]'>
                {data.last_educational_degree_title}
              </p>
            </div>
            <div className='flex flex-col'>
              <p className='text-[#5F6474]'>جنسیت</p>
              <p className='text-[#8455D2]'>{data.sex_id}</p>
            </div>
            <div className='flex flex-col'>
              <p className='text-[#5F6474]'>وضعیت تاهل</p>
              <p className='text-[#8455D2]'>{'فیلدش تو بک نیست'}</p>
            </div>
            <div className='flex flex-col'>
              <p className='text-[#5F6474]'> استان </p>
              <p className='text-[#8455D2]'>{data.StateDesc}</p>
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
                  ? ' text-[#0F973D] bg-[#DAFEE5]'
                  : 'text-[#97130f] bg-[#fedcda]'
              } w-fit min-w-16 mx-3 rounded-lg text-center`}>
              {data.pers_status === 1 ? 'فعال' : 'غیر فعال'}
            </p>
          </div>
          <div className='flex flex-col mt-5'>
            <p className='text-[#5F6474]'> گروه‌ و زیرگروه‌های عضو شده</p>

            <div className='flex flex-wra gap-3'>
              {taskList?.map((task, index) => {
                const randomIndex = Math.floor(Math.random() * 10)
                return (
                  <div key={index} className='flex gap-3'>
                    <p
                      className='flex gap-3 py-1 px-2 rounded-full w-fit'
                      style={{
                        backgroundColor: bgColors[randomIndex],
                        color: textColors[randomIndex],
                      }}>
                      {task.sup_group_name}
                      <CloseCircle
                      onClick={()=>deleteTask(task)}
                        size={24}
                        color='#fc1c03'
                        className='cursor-pointer'
                      />
                    </p>
                    <p
                      className='flex gap-3 py-1 px-2 rounded-full w-fit'
                      style={{
                        backgroundColor: bgColors[randomIndex + 1],
                        color: textColors[randomIndex + 1],
                      }}>
                      {task.supervisor_name}
                      <CloseCircle
                      onClick={()=>deleteTask(task)}
                        size={24}
                        color='#fc1c03'
                        className='cursor-pointer'
                      />
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
          <div className='flex flex-col mt-5'>
            <p className='text-[#5F6474]'>گروه و برند محصول عضو شده </p>
            <div className='flex gap-3'>
              {
                <p className='text-[#3B5A4F] bg-[#A1E3CB] px-5 py-1 rounded-full w-fit'>
                  {'نیاز به اضافه شدن در بک'}
                </p>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShowDetails
