'use client'

import { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'
import { Add, Chart2, InfoCircle, Wallet3 } from 'iconsax-react'
import { useMenu } from '@/Context/Menu'
import { useData } from '@/Context/Data'
import ShowAnimateNumber from '../shared/AnimateNumber'
import { walletBoxStyle } from '@/app/assets/style'
import { useStates } from '@/Context/States'

const Wallet: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstanceRef = useRef<Chart | null>(null)
  const { setMenu } = useMenu()
  const { balance } = useData()
  const { permissions } = useStates()
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
    <>
      {permissions[1].includes('752') && (
        <div className='bg-gray-100 flex flex-col justify-center items-center p-6 min-h-screen gap-20'>
          <div className='flex min-w-[45vw] max-md:w-[100%]'>
            <div
              className='w-full flex flex-col gap-10 p-4 rounded-lg'
              style={walletBoxStyle}>
              <div className='flex justify-center font-bold gap-3'>
                <Wallet3 size={24} color='#704CB9' />
                <p>کیف پول شما</p>
              </div>
              <div className='flex flex-col gap-10 px-10'>
                <div className='flex w-full justify-between'>
                  <div className='flex gap-2 text-[#00000099]'>
                    <p>اعتبار قابل تخصیص</p>
                    <InfoCircle size={16} color='#704CB9' />
                  </div>
                  <b className='flex gap-2'>
                    <ShowAnimateNumber
                      startValue={balance?.Releasable || 0}
                      targetValue={balance?.Releasable || 0}
                      incrementValue={balance?.Releasable || 0}
                    />
                    ریال
                  </b>
                </div>
                <div className='flex w-full justify-between'>
                  <div className='flex gap-2 text-[#00000099]'>
                    <p>تخصیص داده شده</p>
                    <InfoCircle size={16} color='#704CB9' />
                  </div>
                  <b className='flex gap-2'>
                    <ShowAnimateNumber
                      startValue={balance?.Debit || 0}
                      targetValue={balance?.Debit || 0}
                      incrementValue={balance?.Debit || 0}
                    />
                    ریال
                  </b>
                </div>

                <div className='flex w-full justify-between'>
                  <div className='flex gap-2 text-[#00000099]'>
                    <p>مانده اعتبار</p>
                  </div>
                  <b className='flex gap-2'>
                    <ShowAnimateNumber
                      startValue={balance?.SumCredit || 0}
                      targetValue={balance?.SumCredit || 0}
                      incrementValue={balance?.SumCredit || 0}
                    />
                    ریال
                  </b>
                </div>
                <div className='flex w-full justify-between'>
                  <div className='flex gap-2 text-[#00000099]'>
                    <p> مانده نقد </p>
                  </div>
                  <b className='flex gap-2'>
                    <ShowAnimateNumber
                      startValue={balance?.Credit || 0}
                      targetValue={balance?.Credit || 0}
                      incrementValue={balance?.Credit || 0}
                    />
                    ریال
                  </b>
                </div>
              </div>
              <div className='flex gap-[15%]'>
                {permissions[1].includes('732') && (
                  <button
                    className=' min-w-[26%] justify-center flex rounded-lg  px-3 h-10 items-center  bg-[#0F973D] text-white hover:bg-[#0f973ce1]'
                    onClick={() => {
                      location.hash = 'deposite-draft'
                      setMenu('deposite-draft')
                    }}>
                    <Add size={22} color='#ffffff' />
                    <p> افزایش اعتبار</p>
                  </button>
                )}
                {permissions[1].includes('733') && (
                  <button
                    className=' min-w-[26%] justify-center flex rounded-lg  px-3 h-10 items-center border border-[#0F973D] text-[#0F973D] hover:bg-[#0f973c13]'
                    onClick={() => {
                      location.hash = 'deposite'
                      setMenu('deposite')
                    }}>
                    <Add size={22} color='#0F973D' />
                    <p> افزایش نقدی</p>
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className='w-11/12 md:w-4/5 lg:w-2/3 max-md:w-[100%] bg-white shadow-lg rounded-lg p-6'>
            <div className='flex justify-between'>
              <h4 className='text-right text-gray-700 text-lg font-bold mb-4'>
                گزارش کیف پول
              </h4>
              <Chart2 color='#7747C0' size={28} />
            </div>
            <div className='h-80'>
              <canvas ref={chartRef}></canvas>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export default Wallet
