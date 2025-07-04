'use client'
import { errorClass } from '@/app/assets/style'
import { Clock } from 'iconsax-react'
import { useState, useRef, useEffect } from 'react'

const TimePicker = ({
  placeholder,
  hasError,
  setData,
}: {
  placeholder: string
  hasError: boolean
  setData: (data: string) => void
}) => {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<'hour' | 'minute'>('hour')
  const [hour, setHour] = useState<number>()
  const [minute, setMinute] = useState<number>(0)
  const [fullHour, setFullHour] = useState<number>()

  const wrapperRef = useRef<HTMLDivElement>(null)
  const clockRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = (e: MouseEvent) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
      setOpen(false)
      setStep('hour')
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleHourClick = (h: number) => {
    const resolvedHour = h > 12 ? h : h % 12
    setHour(resolvedHour)
    setFullHour(h)
    setStep('minute')
  }

  const handleMinuteClick = (m: number) => {
    setMinute(m)
    setOpen(false)
    setStep('hour')
  }
  const formattedTime =
    fullHour !== undefined
      ? `${fullHour.toString().padStart(2, '0')}:${minute
          .toString()
          .padStart(2, '0')}:00`
      : ''
  setData(formattedTime)
  const numbers =
    step === 'hour'
      ? Array.from({ length: 12 }, (_, i) => i + 13)
      : Array.from({ length: 12 }, (_, i) => i * 5)

  const handleMouseMove = (e: MouseEvent) => {
    if (!clockRef.current) return
    const rect = clockRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const dx = e.clientX - centerX
    const dy = e.clientY - centerY
    const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90
    const adjustedAngle = (angle + 360) % 360

    // Calculate distance from center to determine which circle
    const distance = Math.sqrt(dx * dx + dy * dy)
    const isOuterCircle = distance > rect.width / 4

    const index =
      Math.round((adjustedAngle / 360) * numbers.length) % numbers.length
    const selected = numbers[index]

    if (step === 'hour') {
      const hour = isOuterCircle ? selected + 12 : selected
      setHour(selected)
      setFullHour(hour)
    } else {
      setMinute(selected)
    }
  }

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
    if (step === 'hour') {
      setStep('minute')
    } else {
      setOpen(false)
      setStep('hour')
    }
  }

  const handleMouseDown = () => {
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const angleValue =
    hour &&
    (360 / numbers.length) *
      (step === 'hour' ? (hour % 12 === 0 ? 12 : hour % 12) : minute / 5)

  return (
    <div className='relative inline-block w-full' ref={wrapperRef}>
      <div className='relative w-full'>
        <input
          placeholder={placeholder}
          readOnly
          onClick={() => setOpen(!open)}
          value={formattedTime ?? ''}
          className={`w-full p-2 border rounded cursor-pointer text-center ${
            hasError && errorClass
          }`}
        />
        <span className='absolute left-2 top-1/2 -translate-y-1/2 text-gray-400'>
          <Clock size={24} color='gray' />
        </span>
      </div>
      {open && (
        <div className='absolute z-10 top-12 left-1/2 -translate-x-1/2 p-2 select-none bg-purple-50 border-purple-400 border shadow-md rounded-full w-64 h-64 flex items-center justify-center'>
          <div className='relative w-56 h-56 flex justify-center items-center'>
            <div
              ref={clockRef}
              onMouseDown={handleMouseDown}
              className='absolute w-full h-full rounded-full cursor-pointer'></div>
            <div
              className='absolute w-1 h-24 bg-purple-600 origin-[50%_100%] top-1/2 transition-transform duration-200 pointer-events-none'
              style={{
                transform: `translate(-50%, -100%) rotate(${angleValue}deg)`,
              }}></div>
            <div className='absolute w-4 h-4 bg-purple-600 rounded-full'></div>

            {numbers.map((num, index) => {
              const turnDegree = step === 'hour' ? 60 : 90
              const angle = (360 / numbers.length) * index - turnDegree
              const rad = (angle * Math.PI) / 180
              const radius = 112
              const x = radius + radius * Math.cos(rad)
              const y = radius + radius * Math.sin(rad)

              const isSelected =
                (step === 'hour' && hour === num) ||
                (step === 'minute' && minute === num)
              return (
                <button
                  key={num}
                  onClick={() =>
                    step === 'hour'
                      ? handleHourClick(num)
                      : handleMinuteClick(num)
                  }
                  className={`absolute w-8 h-8 flex items-center justify-center rounded-full transition duration-200 text-sm ${
                    isSelected
                      ? 'bg-purple-600 text-white'
                      : 'hover:bg-purple-400 hover:text-white'
                  }`}
                  style={{
                    left: x,
                    top: y,
                    transform: 'translate(-50%, -50%)',
                  }}>
                  {num.toString().padStart(2, '0')}
                </button>
              )
            })}
            <div
              className={`${
                step === 'hour' && 'border border-purple-400 '
              }  h-[190px] w-[190px] rounded-full `}>
              {step === 'hour' &&
                Array.from({ length: 12 }, (_, i) => {
                  const num = i + 1
                  const angle = (360 / 12) * i - 60
                  const rad = (angle * Math.PI) / 180
                  const radius = 80
                  const x = radius + radius * Math.cos(rad) + 33
                  const y = radius + radius * Math.sin(rad) + 33
                  const isSelected = fullHour === num

                  return (
                    <button
                      key={`outer-${num}`}
                      onClick={() => handleHourClick(num)}
                      className={`absolute w-8 h-8 flex items-center justify-center rounded-full transition duration-200 text-sm ${
                        isSelected
                          ? 'bg-purple-700 text-white'
                          : 'hover:bg-purple-500 hover:text-white'
                      }`}
                      style={{
                        left: x,
                        top: y,
                        transform: 'translate(-50%, -50%)',
                      }}>
                      {num}
                    </button>
                  )
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TimePicker
