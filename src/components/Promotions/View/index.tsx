import { Chart } from 'chart.js'
import moment from 'moment-jalaali'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const PromotionView = () => {
  const [data, setData] = useState<number[]>([])
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const promotion = {
    id: 2,
    cstatus: 1,
    start_date: '۱۴۰۳-۱۱-۲۱',
    // exp_date: '3027-09-15',
    exp_date: '1403-12-29', // تاریخ شمسی
    ctitle: 'کیفیت برتر',
    cta_link: 'https://test.com',
    distype: 0,
    file_uid: 'che181_04e653edd5f1549aece8.jpg',
  }

  const generateRandomData = () => {
    const data: number[] = []
    let base = 700 // Start with a base value
    for (let i = 0; i < 22; i++) {
      base += Math.floor(Math.random() * 500) - 250 // Add random fluctuation
      data.push(Math.max(base, 0)) // Ensure no negative values
    }
    return data
  }

  useEffect(() => {
    const chartData = generateRandomData() // Generate random data
    setData(chartData) // Update the data state with the generated data

    const ctx = document.getElementById('myChart') as HTMLCanvasElement
    const chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [
          '10:00',
          '10:30',
          '11:00',
          '11:30',
          '12:00',
          '12:30',
          '13:00',
          '13:30',
        ],
        datasets: [
          {
            label: 'کل بازدیدها',
            data: chartData, // Use the data from state
            borderColor: '#704CB9', // Set the line color
            fill: false, // No filling under the line
            tension: 0.6,
            pointRadius: 0,
            borderWidth: 3,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            mode: 'index',
            intersect: false,
          },
          legend: {
            display: false, // Hide the legend button to disable line toggle
          },
        },
        scales: {
          x: {
            grid: {
              display: false, // Remove the grid lines for X axis
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 500,
            },
            grid: {
              display: false, // Remove the grid lines for Y axis
            },
          },
        },
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          },
        },
        elements: {
          line: {
            tension: 0.4, // Slightly adjust line curvature if needed
          },
        },
      },
    })
    return () => {
      chartInstance.destroy()
    }
  }, [])
  useEffect(() => {
    const updateTimer = () => {
      const expireDate = moment(promotion.exp_date, 'jYYYY-jMM-jDD').toDate()
      
      // expireDate.setHours(0, 0, 0, 0)
      const now = new Date() // زمان فعلی
      // const expireDate = new Date(promotion.exp_date) // تاریخ انقضا

      // تنظیم زمان به ۰۰:۰۰ (نیمه شب)
      expireDate.setHours(0, 0, 0, 0)

      const diffMs = expireDate.getTime() - now.getTime() // اختلاف به میلی‌ثانیه

      if (diffMs <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      const days = Math.floor(diffMs / (24 * 60 * 60 * 1000))
      const hours = Math.floor(
        (diffMs % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
      )
      const minutes = Math.floor((diffMs % (60 * 60 * 1000)) / (60 * 1000))
      const seconds = Math.floor((diffMs % (60 * 1000)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })
    }

    updateTimer() // اجرای اولیه
    const interval = setInterval(updateTimer, 1000) // بروزرسانی هر ثانیه

    return () => clearInterval(interval) // پاک کردن تایمر هنگام خروج
  }, [promotion.exp_date])
  return (
    <div>
      <div className='border mb-4 bg-white'>
        <h1 className='text-2xl m-4'>پروموشن محصولات فولیکا</h1>
        <div className='flex justify-around'>
          <div className='flex flex-col gap-5 my-3'>
            <p>وضعیت پروموشن</p>
            <p className='font-bold'> درحال تکمیل</p>
          </div>
          <div className='flex flex-col gap-5 my-3'>
            <p>بودجه</p>
            <p className='font-bold'></p>
          </div>
          <div className='flex flex-col gap-5 my-3'>
            <p> تاریخ شروع</p>
            <p className='font-bold'></p>
          </div>
          <div className='flex flex-col gap-5 my-3'>
            <p>تاریخ پایان</p>
            <p className='font-bold'></p>
          </div>
          <div className='flex flex-col gap-5 my-3'>
            <p>زمان باقی مانده</p>
            <p className='font-bold'></p>
          </div>
          <div className='flex flex-col gap-5 my-3'>
            <p>تعداد کل مخاطبین</p>
            <p className='font-bold'></p>
          </div>
          <div className='flex flex-col gap-5 my-3'>
            <p>تعداد بازدید</p>
            <p className='font-bold'></p>
          </div>
          <div className='flex flex-col gap-5 my-3'>
            <p>تعداد کلیک</p>
            <p className='font-bold'></p>
          </div>
        </div>
      </div>
      <div
        className='w-full h-[169px] rounded-md flex items-center justify-between p-6 px-20'
        style={{
          background: `
              conic-gradient(
                from 99.3deg at 0% 1%, 
                rgba(112, 76, 185, 0.9) 0deg, 
                rgba(56, 10, 148, 0.8) 360deg
              ), conic-gradient(
                from -45deg at 50% 50%, 
                rgba(112, 76, 185, 0.1) 0deg, 
                rgba(56, 10, 148, 0.1) 360deg
              )`,
        }}>
        <div className='flex flex-col items-end text-right text-white'>
          <h2 className='text-lg font-bold'>شعار | جمله برند شما</h2>
          <p>تخفیف شما</p>
          <button className='mt-2 px-4 py-2 bg-white text-purple-800 rounded-md'>
            لینک خرید
          </button>
        </div>
        <div className='flex flex-col items-start text-white'>
          <h1 className='text-2xl font-bold'>تاریخ و زمان پروموشن</h1>
          <p className='text-sm'>
            {timeLeft.days} روز | {timeLeft.hours} ساعت | {timeLeft.minutes}{' '}
            دقیقه | {timeLeft.seconds} ثانیه
          </p>
          <p className='text-sm'>ثانیه | دقیقه | ساعت | روز</p>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <div className='text-white'>
            <h3 className='text-lg font-semibold mb-2'>گرافیک فروش</h3>
            <div className='w-full h-[100px] bg-gray-300 rounded-md'></div>
          </div>
        </div>
      </div>
      <div className='mt-6 bg-white rounded-lg border p-4'>
        <h3 className='text-xl font-semibold text-gray-700'>کل بازدیدها‍</h3>
        <div className='w-full flex max-h-[50vh] justify-center '>
          <canvas id='myChart' style={{ width: '100vw' }}></canvas>
        </div>
      </div>
      <div className='flex w-full my-5 gap-5'>
        <div className='flex-1 p-4 bg-white rounded-lg'>
          <h1 className='text-[#7747c0] text-xl'>
            گروه‌های مخاطب هدف قرار گرفته شده
          </h1>
          <div className='flex flex-col'>
            <div className='flex justify-center bg-[#F5F7F8] border rounded-t py-3 mt-4'>
              گروه‌ها
            </div>
            <div className='flex flex-col p-3 border gap-2'>
              <div className='flex gap-3 '>
                <Image width={24} height={24} alt='' src={'/icons/frame.svg'} />
                <p>گروه hairtamin</p>
              </div>
              <p className='text-slate-400'>زیر گروه ها</p>
              <div className='flex gap-5'>
                {['yak', 'dok', 'sak'].map((name, index) => (
                  <p key={index}>{name}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className='flex-1 p-4 bg-white rounded-lg'>
          <h1 className='text-[#7747c0] text-xl'>
            گروه‌های مخاطب هدف قرار گرفته شده
          </h1>
          <div className='flex flex-col'>
            <div className='flex justify-center bg-[#F5F7F8] border rounded-t py-3 mt-4'>
              گروه‌ها
            </div>
            <div className='flex flex-col p-3 border gap-2'>
              <div className='flex gap-3 '>
                <Image width={24} height={24} alt='' src={'/icons/frame.svg'} />
                <p>گروه hairtamin</p>
              </div>
              <p className='text-slate-400'>زیر گروه ها</p>
              <div className='flex gap-5'>
                {['yak', 'dok', 'sak'].map((name, index) => (
                  <p key={index}>{name}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PromotionView
