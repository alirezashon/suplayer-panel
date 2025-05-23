import  { useState } from 'react';

// Define months and days for Jalali (Persian) calendar
const months = [
  'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 
  'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
];

const days = Array.from({ length: 31 }, (_, i) => String(i + 1));

// Create a scrollable date selector component
const DateSelector: React.FC = () => {
  // Default date as 1403-08-02
  const [selectedYear, setSelectedYear] = useState<number>(1403);
  const [selectedMonth, setSelectedMonth] = useState<number>(8);
  const [selectedDay, setSelectedDay] = useState<number>(2);

  // Create an array for the years (from 1403 to 1443)
  const years = Array.from({ length: 41 }, (_, i) => 1403 + i);

  // Helper function to generate full date string (Jalali format)
  const formattedDate = `${selectedYear}-${String(selectedMonth).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`;

  // Function to handle scroll and set new date after scrolling stops
  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>, type: string) => {
    const target = e.target as HTMLDivElement;
    const scrollTop = target.scrollTop;
    const itemHeight = 40; // Adjust this based on item height (e.g., 40px per item)
    const selectedIndex = Math.round(scrollTop / itemHeight);

    if (type === 'year') {
      setSelectedYear(years[selectedIndex]);
    } else if (type === 'month') {
      setSelectedMonth(selectedIndex + 1);
    } else if (type === 'day') {
      setSelectedDay(selectedIndex + 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-4">
      {/* Show the formatted selected date */}
      <div className="text-lg bg-gray-200 px-4 py-2 rounded-md">
        <span className="text-gray-700">انتخاب شده: </span>
        <span className="font-bold">{formattedDate}</span>
      </div>

      {/* Scrollable columns for day, month, and year */}
      <div className="flex space-x-6">
        <div className="relative w-20 h-40 overflow-hidden border rounded-md">
          <div className="overflow-y-scroll overflow-hidden no-scrollbar h-full" onScroll={(e) => handleScroll(e, 'day')}>
            {days.map((day, index) => (
              <div key={index} className={`h-10 flex items-center justify-center ${selectedDay === index + 1 ? 'bg-blue-100 font-bold' : ''}`}>
                {day}
              </div>
            ))}
          </div>
        </div>

        <div className="relative w-20 h-40 overflow-hidden border rounded-md">
          <div className="overflow-y-scroll no-scrollbar h-full" onScroll={(e) => handleScroll(e, 'month')}>
            {months.map((month, index) => (
              <div key={index} className={`h-10 flex items-center justify-center ${selectedMonth === index + 1 ? 'bg-blue-100 font-bold' : ''}`}>
                {month}
              </div>
            ))}
          </div>
        </div>

        <div className="relative w-20 h-40 overflow-hidden border rounded-md">
          <div className="overflow-y-scroll no-scrollbar h-full" onScroll={(e) => handleScroll(e, 'year')}>
            {years.map((year, index) => (
              <div key={index} className={`h-10 flex items-center justify-center ${selectedYear === year ? 'bg-blue-100 font-bold' : ''}`}>
                {year}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex space-x-4 mt-4">
        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">انصراف</button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">انتخاب</button>
      </div>
    </div>
  );
};

export default DateSelector;
