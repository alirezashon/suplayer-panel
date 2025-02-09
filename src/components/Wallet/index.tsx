'use client'

import { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'
import { Add, InfoCircle, Wallet3 } from 'iconsax-react'
import { useMenu } from '@/Context/Menu'
import { useData } from '@/Context/Data'
import ShowAnimateNumber from '../shared/AnimateNumber'

const Wallet: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstanceRef = useRef<Chart | null>(null)
  const { setMenu } = useMenu()
  const { balance } = useData()

  useEffect(() => {
    const ctx = chartRef.current?.getContext('2d')

    if (ctx) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy()
      }
      chartInstanceRef.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور'],
          datasets: [
            {
              label: 'سبز',
              data: [150, 300, 200, 300, 150, 180],
              backgroundColor: '#00B050',
              barPercentage: 0.6,
              borderRadius: 4,
            },
            {
              label: 'قرمز',
              data: [100, 250, 150, 250, 100, 130],
              backgroundColor: '#E74C3C',
              barPercentage: 0.6,
              borderRadius: 4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: { enabled: true },
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: '#666', font: { family: 'IRANSans', size: 12 } },
            },
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 100,
                color: '#666',
                font: { family: 'IRANSans', size: 12 },
              },
              grid: { color: '#EAEAEA' },
            },
          },
        },
      })
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy()
      }
    }
  }, [])

  return (
    <div className='bg-gray-100 flex flex-col justify-center items-center p-6 min-h-screen gap-20'>
      <div
        className='w-full flex flex-col gap-3'
        style={{
          background:
            'linear-gradient(white, white) padding-box, conic-gradient(rgb(246, 230, 255), #ffffff 18%, #644a9e 31% 43%, rgb(228, 228, 255), #ffffff, #7a5fb7, #e7d9d5, #e4e0ed) border-box',
          border: '3px solid transparent',
          borderRadius: '2vh',
          padding: '1vh',
        }}>
        <div className='flex font-bold gap-3'>
          <Wallet3 size={24} color='#704CB9' />
          <p>کیف پول شما</p>
        </div>
        <div className='flex gap-10 px-10'>
          <div className='flex w-full justify-between'>
            <div className='flex gap-2 text-[#00000099]'>
              <p>اعتبار قابل تخصیص</p>
              <InfoCircle size={16} color='#704CB9' />
            </div>
            <b>
              <ShowAnimateNumber
                startValue={balance?.allBalance || 0}
                targetValue={balance?.allBalance || 0}
                incrementValue={balance?.allBalance || 0}
              />
              میلیون ریال
            </b>
          </div>
          <div className='flex w-full justify-between'>
            <div className='flex gap-2 text-[#00000099]'>
              <p>قابل برداشت</p>
              <InfoCircle size={16} color='#704CB9' />
            </div>
            <b>
              <ShowAnimateNumber
                startValue={balance?.allBalance || 0}
                targetValue={balance?.allBalance || 0}
                incrementValue={balance?.allBalance || 0}
              />
              میلیون ریال
            </b>
          </div>
        </div>
        <div className='flex gap-10 px-10 my-3'>
          <div className='flex w-full justify-between'>
            <div className='flex gap-2 text-[#00000099]'>
              <p>تخصیص داده شده</p>
              <InfoCircle size={16} color='#704CB9' />
            </div>
            <b>
              <ShowAnimateNumber
                startValue={balance?.removable || 0}
                targetValue={balance?.removable || 0}
                incrementValue={balance?.removable || 0}
              />
              میلیون ریال
            </b>
          </div>
          <div className='flex w-full justify-between'>
            <div className='flex gap-2 text-[#00000099]'>
              <p> قابل آزادسازی </p>
              <InfoCircle size={16} color='#704CB9' />
            </div>
            <b>
              <ShowAnimateNumber
                startValue={balance?.removable || 0}
                targetValue={balance?.removable || 0}
                incrementValue={balance?.removable || 0}
              />
              میلیون ریال
            </b>
          </div>
        </div>
        <div className='flex gap-[15%]'>
          <button
            className=' min-w-[26%] justify-center flex rounded-lg  px-3 h-10 items-center  bg-[#0F973D] text-white'
            onClick={() => {
              location.hash = 'deposite'
              setMenu('deposite')
            }}>
            <Add size={22} color='#ffffff' />
            <p> افزایش اعتبار</p>
          </button>
        </div>
      </div>
      <div className='w-11/12 md:w-4/5 lg:w-2/3 bg-white shadow-lg rounded-lg p-6'>
        <h4 className='text-right text-gray-700 text-lg font-bold mb-4'>
          گزارش کیف پول 📊
        </h4>
        <div className='h-80'>
          <canvas ref={chartRef}></canvas>
        </div>
      </div>
    </div>
  )
}

export default Wallet
