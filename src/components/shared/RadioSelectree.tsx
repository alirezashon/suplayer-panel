import { useState } from 'react'
interface RadioTreeSelectorProps {
  items: { value: string; id: string | number }[]
  placeholder: string
  onSelect: (selected: string) => void
}
const RadioSelectList: React.FC<RadioTreeSelectorProps> = ({
  items,
  placeholder,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedName, setSelectedName] = useState<string | null>(null)
  return (
    <div className='w-full'>
      <div
        className='border border-gray-300 rounded-md h-10 py-2 px-4 cursor-pointer flex justify-between items-center'
        onClick={() => setIsOpen((prev) => !prev)}>
        <span className='text-gray-700'>{selectedName || placeholder}</span>
        <span className='text-gray-400'>&#x25BC;</span>
      </div>
      <div className='border rounded-lg'>
        {isOpen && (
          <div className='flex flex-col'>
            {items.map((child, index) => (
              <label
                key={index}
                className='flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-purple-100'>
                <input
                  type='radio'
                  name='teamMember'
                  checked={selectedName === `${child.value}`}
                  onChange={() => {
                    setSelectedName(`${child.value}`)
                    onSelect(`${child.id}`)
                    setTimeout(() => setIsOpen(false), 154)
                  }}
                  className='form-radio appearance-none h-5 w-5 border-2 rounded-full bg-white checked:bg-[#7747C0] cursor-pointer'
                />
                <span
                  className={`${
                    selectedName === `${child.value}`
                      ? 'text-[#7747C0]'
                      : 'text-gray-700'
                  }`}>
                  {child.value}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default RadioSelectList
