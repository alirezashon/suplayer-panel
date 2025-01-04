'use client'

import { useState } from 'react'
import DatePicker from 'react-multi-date-picker'
import persian from 'react-date-object/calendars/persian'
import persian_en from 'react-date-object/locales/persian_fa'

interface Props {
  setDate: (date: string) => void
}

const Calendar: React.FC<Props> = ({ setDate }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const handleChange = (date: any) => {
    setSelectedDate(date)
    setDate(date.format('YYYY-MM-DD')) // Format to your desired output
  }

  return (
    <div className='flex justify-center '>
        <DatePicker
          containerClassName={'w-full '}
          value={selectedDate}
          onChange={handleChange}
          calendar={persian}
          locale={persian_en}
          inputClass='w-full border px-3 h-10 rounded-md '
        />
    </div>
  )
}

export default Calendar
